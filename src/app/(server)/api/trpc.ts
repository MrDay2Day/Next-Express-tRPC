/* eslint-disable @typescript-eslint/no-require-imports */
import "server-only";

import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import { ZodError } from "zod";
import { createNextAPIContext } from "../../_trpc/config/trpc_api";

import * as SuperJSON from "../../../../utilities/superjson/dist";

type Context = inferAsyncReturnType<typeof createNextAPIContext>;

export const t = initTRPC.context<Context>().create({
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

export interface AuthContext {
  token?: string;
  user?: {
    id: string;
    role: string;
  };
}

const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  console.log({ path, type, next });
  const start = Date.now();
  const result = next();
  const duration = Date.now() - start;
  console.log(
    `NextAPI tRPC - Method: ${type} | Function: ${path} | Duration: ${duration}ms`
  );
  return result;
});

export const router_next = t.router;
export const createCallerFactory_next = t.createCallerFactory;
export const publicProcedure_next = t.procedure.use(loggerMiddleware);
