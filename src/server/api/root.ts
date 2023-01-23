import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { learnRouter } from "./routers/learn";
import { createTRPCRouter } from "./trpc";

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

export type RouterInputs = inferRouterInputs<typeof appRouter>
export type RouterOutputs = inferRouterOutputs<typeof appRouter>
