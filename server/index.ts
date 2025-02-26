/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import next from "next";

import { init } from "./middleware/socket/socketServer";
import { generalListeners } from "./middleware/socket/listen";
import routes from "./routes";
import { serverLogs } from "./middleware/modules";
import dotenv from "dotenv";
import { catchErrorPromiseFunc } from "../src/utils/catchError";

dotenv.config();

/**
 * *****************************************************
 * **** DO NOT CHANGE 'startNextExpressServer' NAME ****
 * *****************************************************
 */

async function startNextExpressServer() {
  try {
    const app = next({
      dev: process.env.NODE_ENV !== "production",
      turbo: true,
      turbopack: true,
    });
    const handle = app.getRequestHandler();
    await app.prepare();

    const expressApp = express();
    expressApp.use(serverLogs);
    const server = createServer(expressApp);

    // Socket.IO event handlers with type safety
    const [ExpressErr, ExpressSocketServer] = await catchErrorPromiseFunc(
      init(server)
    );
    if (ExpressErr) throw ExpressErr;
    ExpressSocketServer?.on("connection", (socket) => {
      generalListeners(socket, socket.request);
    });

    // Express & tRPC Endpoints
    expressApp.use("/server", routes.stateRoutes);
    // Handle Next.js routing
    expressApp.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    expressApp.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error(error); // Log the error for debugging

        res.status(500).json({
          success: false,
          message: "An unexpected error occurred.",
          error: error.message || "Internal Server Error",
        });
      }
    );

    //
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(
        `> Express SocketIO NextJs Server listening on port http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    console.log("RESTARTING SERVER");
    setTimeout(() => startNextExpressServer(), 3000);
  }
}

/**
 * ******************************************
 * **** DO NOT EDIT DEFAULT EXPORT BELOW ****
 * ******************************************
 */

export default startNextExpressServer;
