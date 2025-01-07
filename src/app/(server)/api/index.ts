import { publicProcedure_next, router_next } from "./trpc.ts";
import { z } from "zod";

export const appRouter_next = router_next({
  getTodos: publicProcedure_next.query(async () => {
    return [10, 20, 30];
  }),
  test: publicProcedure_next.query(() => {
    return true;
  }),
  hello: publicProcedure_next
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name || "world"}!`,
      };
    }),

  addNumbers: publicProcedure_next
    .input(
      z.object({
        num1: z.number(),
        num2: z.number(),
      })
    )
    .mutation(({ input }) => {
      return input.num1 + input.num2;
    }),
});

export type AppRouter_next = typeof appRouter_next;
