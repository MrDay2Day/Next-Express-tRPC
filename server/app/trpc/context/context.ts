import { appRouter } from "../trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

export const serverMainContext = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext({ req, res }: { req: express.Request; res: express.Response }) {
    return { req, res };
  },
});
