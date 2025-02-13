/* eslint-disable @typescript-eslint/no-require-imports */
import "server-only";

import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import { ZodError } from "zod";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
import { createNextAPIContext } from "../../../../types/backend/trpc";
const superjson = require("superjson").default;

type Context = inferAsyncReturnType<typeof createNextAPIContext>;

export const t = initTRPC.context<Context>().create({
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
