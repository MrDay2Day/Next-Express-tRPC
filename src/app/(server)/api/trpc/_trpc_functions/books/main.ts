import "server-only";

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure_next, router_next } from "../../../trpc";
import { booksDatabase } from "./_data";
import { authMiddleware_trpc } from "../../middleware_auth";

// Create a secure trpc route producer
const auth_producer = publicProcedure_next.use(authMiddleware_trpc);

export const BooksManagement = router_next({
  fetchAll: publicProcedure_next
    .input(z.object({ count: z.number() }))
    .mutation(async ({ input }) => {
      const count = input.count;

      if (count > 0 && count <= booksDatabase.length) {
        return booksDatabase.slice(0, count);
      } else if (count > booksDatabase.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough books in the database to fulfill the request.",
        });
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid count specified.",
        });
      }
    }),
  getCount: publicProcedure_next.query(async () => {
    return { count: booksDatabase.length };
  }),
  // Using secure trpc producer
  fetchBook: auth_producer // Authenticated route producer
    .input(z.number())
    .mutation(async ({ input }) => {
      const book = booksDatabase[+input];
      if (book) {
        return { book, date: new Date() };
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: "The book does not exist",
        });
      }
    }),
});
