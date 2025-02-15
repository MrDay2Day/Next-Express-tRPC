import "server-only";

import {
  createCallerFactory_next,
  publicProcedure_next,
  router_next,
} from "../../trpc";
import { z } from "zod";
import { BooksManagement } from "./books/main";
import { CustomerManagement } from "./customers/main";

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
        theDate: new Date(),
      };
    }),
  customers: CustomerManagement,
  books: BooksManagement,
  addNumbers: publicProcedure_next
    .input(
      z.object({
        num1: z.number(),
        num2: z.number(),
      })
    )
    .mutation(({ input }) => {
      console.log({ input });
      const result = input.num1 + input.num2;
      return { result, date: new Date() };
    }),
});

// Caller to use NextAPI tRPC functions on the server
export const createCaller_next = createCallerFactory_next(appRouter_next);
export type AppRouter_next = typeof appRouter_next;
