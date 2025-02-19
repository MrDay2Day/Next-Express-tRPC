/**
 * tRPC Configure
 */
import { initTRPC } from "@trpc/server";
// import * as trpcExpress from "@trpc/server/adapters/express";
import { EventEmitter } from "events";

import { ZodError } from "zod";
import * as SuperJSON from "../../../utilities/superjson/dist";
import { ExpressCallerTypes } from "./utilities/trpc_types";

// Create EventEmitter instance
export const ee = new EventEmitter();

export const createContext = ({ req, res, authHeader }: ExpressCallerTypes) => {
  return { req, res, authHeader };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
// const t = initTRPC.context<Context>().create({
const t = initTRPC.create({
  transformer: SuperJSON,
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
  console.log({ path, type, next });
  const start = Date.now();
  const result = next();
  const duration = Date.now() - start;
  console.log(
    `ExpressAPI tRPC - Method: ${type} | Function: ${path} | Duration: ${duration}ms`
  );
  return result;
});

// Create router and procedure helpers
export const router = t.router;
export const callerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure.use(loggerMiddleware);
