import "server-only";

import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router_next = t.router;
export const publicProcedure_next = t.procedure;
