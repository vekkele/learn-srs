import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../auth";
import { learnRouter } from "./routers/learn";
import { createInnerTRPCContext, createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  learn: learnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createTRPCCaller = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const trpcCtx = createInnerTRPCContext({ session });

  return appRouter.createCaller(trpcCtx)
}