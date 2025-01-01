import express, { Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as trpcExpress from "@trpc/server/adapters/express";

import ServerSideEvent from "./app/events/eventRoute";
import CookieWorker from "./app/utils/cookieWorker";

import dotenv from "dotenv";
import { appRouter } from "./app/trpc/trpc";
dotenv.config();

const endPoints = express.Router();
const stateRoutes = express.Router();

stateRoutes.use(
  cors({
    origin: true,
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  express.json(),
  compression(),
  cookieParser(process.env.COOKIE_SECRET),
  morgan("combined")
);
endPoints.get(
  "/listen",
  CookieWorker.validCookie,
  (req: Request, res: Response) => {
    return ServerSideEvent.listen(req, res);
  }
);
endPoints.get(
  "/trigger",
  CookieWorker.validCookie,
  (req: Request, res: Response) => {
    return ServerSideEvent.trigger(req, res);
  }
);

endPoints.get("/set-cookie", async (req: Request, res: Response) => {
  return CookieWorker.setCookie(res, "demo-cookie-sign", {
    hello: "world",
    JWT: "JWT_TOKEN_HERE",
  });
});

endPoints.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

stateRoutes.use(endPoints);

export default stateRoutes;
