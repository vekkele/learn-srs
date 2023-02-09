import { DateTime } from "luxon";
import { z } from "zod";
import type { Forecast } from "../../../utils/forecast";
import {
  getLastCumulativeReviews,
  weekdayNumsToNames,
} from "../../../utils/forecast";
import {
  computeNextReview,
  getNextStage,
  getStageFromLevel,
} from "../../../utils/stage";
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
          },
        },
        translations: {
          select: {
            translation: true,
          },
        },
      },
    });

    return words;
  }),

  getReviewsCount: protectedProcedure.query(async ({ ctx }) => {
    const reviewsCount = await ctx.prisma.word.count({
      where: {
        userId: ctx.session.user.id,
        nextReview: {
          lte: new Date(),
        },
      },
    });

    return reviewsCount;
  }),

  getReviewWords: protectedProcedure.query(async ({ ctx }) => {
    const words = await ctx.prisma.word.findMany({
      where: {
        userId: ctx.session.user.id,
        nextReview: {
          lte: new Date(),
        },
      },
      include: {
        stage: {
          select: {
            level: true,
          },
        },
        translations: {
          select: {
            translation: true,
          },
        },
      },
    });

    return words.map((word) => ({
      ...word,
      stage: {
        ...word.stage,
        title: getStageFromLevel(word.stage.level),
      },
    }));
  }),

  addWord: protectedProcedure
    .input(
      z.object({
        word: z.string().trim().min(1),
        translations: z.string().trim().min(1).array().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { word, translations } = input;

      return ctx.prisma.$transaction(async (tx) => {
        const stage = await tx.stage.findUnique({ where: { level: 1 } });

        if (!stage) {
          throw new Error("could not find first stage in database");
        }

        return tx.word.create({
          data: {
            word,
            stage: {
              connect: {
                id: stage.id,
              },
            },
            nextReview: computeNextReview(stage.hoursToNext),
            translations: {
              create: translations.map((translation) => ({
                translation,
              })),
            },
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      });
    }),

  updateStage: protectedProcedure
    .input(
      z.object({
        wordId: z.string(),
        incorrectAnswers: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const word = await tx.word.findUniqueOrThrow({
          select: {
            stage: {
              select: {
                level: true,
              },
            },
          },
          where: {
            id: input.wordId,
          },
        });

        const nextLevel = getNextStage(
          word.stage.level,
          input.incorrectAnswers
        );

        const nextStage = await tx.stage.findUnique({
          where: {
            level: nextLevel,
          },
          select: {
            id: true,
            hoursToNext: true,
          },
        });

        if (!nextStage) {
          throw new Error(`could not set stage to ${nextLevel}`);
        }

        const nextReview = computeNextReview(nextStage.hoursToNext);

        return tx.word.update({
          where: {
            id: input.wordId,
          },
          data: {
            nextReview,
            stage: {
              connect: {
                id: nextStage.id,
              },
            },
          },
        });
      });
    }),

  getReviewForecast: protectedProcedure
    .input(
      z.object({
        timezone: z.string().min(1),
      })
    )
    .query(async ({ input: { timezone }, ctx }) => {
      const plusWeek = DateTime.now()
        .setZone(timezone)
        .plus({ weeks: 1 })
        .startOf("day");

      const words = await ctx.prisma.word.groupBy({
        by: ["nextReview"],
        where: {
          nextReview: {
            gt: new Date(),
            lt: plusWeek.toJSDate(),
          },
        },
        _count: {
          id: true,
        },
        orderBy: {
          nextReview: "asc",
        },
      });

      const forecast = words.reduce<Forecast>((prev, reviewStep) => {
        const reviewDate = DateTime.fromJSDate(reviewStep.nextReview).setZone(
          timezone
        );
        const weekday = reviewDate.weekday;
        const weekdayName = weekdayNumsToNames[weekday];

        const reviewsCount = reviewStep._count.id;
        const currentDay = prev[weekdayName] ?? [];

        const prevCumulationCount = getLastCumulativeReviews(prev, weekdayName);

        return {
          ...prev,
          [weekdayName]: [
            ...currentDay,
            {
              time: reviewDate.toJSDate(),
              newReviews: reviewsCount,
              cumulativeReviews: prevCumulationCount + reviewsCount,
            },
          ],
        };
      }, {});

      return forecast;
    }),
});
