import express, { Request, Response } from "express";

import ServerSideEvent from "./app/events/eventRoute";
import CookieWorker from "./app/utils/cookieWorker";

import dotenv from "dotenv";
import { serverMainContext } from "./app/trpc/context/context";
import modules from "./middleware/modules";
dotenv.config();

const endPoints = express.Router();
const stateRoutes = express.Router();

stateRoutes.use(modules);

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

endPoints.use("/trpc", serverMainContext);

stateRoutes.use(endPoints);

const routes = { stateRoutes };
export default routes;
