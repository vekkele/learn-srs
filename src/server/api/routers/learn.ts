import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const learnRouter = createTRPCRouter({
  getWords: protectedProcedure.query(async ({ ctx }) => {
    const words = await ctx.prisma.word.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        stage: {
          select: {
            level: true,
          }
        },
        translations: {
          select: {
            translation: true,
          }
        },
      }
    });

    return words;
  }),

  addWord: protectedProcedure
    .input(z.object({
      word: z.string(),
      translation: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { word, translation } = input;

      return ctx.prisma.$transaction(async (tx) => {
        const stage = await tx.stage.findUnique({ where: { level: 1 } });

        if (!stage) {
          throw new Error("could not find first stage in database");
        }

        const nextLearn = new Date(Date.now() + stage.hoursToNext * 60 * 60 * 1000);
        nextLearn.setMinutes(0, 0, 0);

        return tx.word.create({
          data: {
            word,
            stage: {
              connect: {
                id: stage.id,
              }
            },
            nextLearn,
            translations: {
              create: {
                translation,
              }
            },
            user: {
              connect: {
                id: ctx.session.user.id
              }
            },
          }
        });
      });
    })
})