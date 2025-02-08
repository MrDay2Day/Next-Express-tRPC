/**
 * tRPC Configure
 */
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { EventEmitter } from "events";
import superjson from "superjson";
import { ZodError } from "zod";

// Create EventEmitter instance
export const ee = new EventEmitter();

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create({
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

// Create middleware for logging
const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;
  console.log(`Method: ${type} | Function: ${path} | Duration: ${duration}ms`);
  return result;
});

// Create router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure.use(loggerMiddleware);
