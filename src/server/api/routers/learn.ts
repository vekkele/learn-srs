import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const learnRouter = createTRPCRouter({
  addWord: protectedProcedure
    .input(z.object({
      word: z.string(),
      translation: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      console.log({ input });
      const { word, translation } = input;

      const stage = await ctx.prisma.stage.findUnique({ where: { level: 1 } });

      if (!stage) {
        return {};
      }

      const nextLearn = new Date(Date.now() + stage.hoursToNext * 60 * 60 * 1000);

      return ctx.prisma.word.create({
        data: {
          word,
          stage: {
            connect: {
              level: 1,
            },
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
    })
})