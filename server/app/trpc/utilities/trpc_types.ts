import * as trpcExpress from "@trpc/server/adapters/express";
export type ExpressCallerTypes = trpcExpress.CreateExpressContextOptions & {
  authHeader?: string | null | undefined;
};
