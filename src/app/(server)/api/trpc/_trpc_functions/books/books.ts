import { z } from "zod";
import { publicProcedure_next, router_next } from "../../../trpc";
import { TRPCError } from "@trpc/server";

type Book = {
  title: string;
  description: string;
};

// Simulate a database of books
export const booksDatabase: Book[] = [
  {
    title: "The Great Gatsby",
    description: "A novel by F. Scott Fitzgerald set in the Jazz Age.",
  },
  {
    title: "To Kill a Mockingbird",
    description:
      "A novel by Harper Lee about racial injustice in the Deep South.",
  },
  {
    title: "1984",
    description:
      "A dystopian novel by George Orwell about a totalitarian regime.",
  },
  {
    title: "Pride and Prejudice",
    description: "A romantic novel by Jane Austen set in 19th-century England.",
  },
  {
    title: "Moby Dick",
    description:
      "A novel by Herman Melville about the obsessive quest for a white whale.",
  },
  {
    title: "The Catcher in the Rye",
    description: "A novel by J.D. Salinger about teenage rebellion and angst.",
  },
  {
    title: "The Lord of the Rings",
    description:
      "A fantasy epic by J.R.R. Tolkien about the fight against Sauron.",
  },
  {
    title: "The Hobbit",
    description: "A fantasy adventure by J.R.R. Tolkien about Bilbo Baggins.",
  },
  {
    title: "Brave New World",
    description:
      "A dystopian novel by Aldous Huxley about a technologically advanced society.",
  },
  {
    title: "The Alchemist",
    description:
      "A novel by Paulo Coelho about a shepherd's journey to find his treasure.",
  },
];

export const BooksManagement = router_next({
  fetchAll: publicProcedure_next
    .input(z.object({ count: z.number() }))
    .mutation(async ({ input }) => {
      const count = input.count;
      setTimeout(() => {
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
      }, 1000); // Simulate a 1-second delay
    }),
  getCount: publicProcedure_next.query(async () => {
    return { count: booksDatabase.length };
  }),
  fetchBook: publicProcedure_next
    .input(z.number())
    .mutation(async ({ input }) => {
      const book = booksDatabase[input];
      if (book) {
        return { book };
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: "The book does not exist",
        });
      }
    }),
});
