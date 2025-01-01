process
  .on("warning", (e) => console.warn(e.stack))
  .on("unhandledRejection", (reason, p) =>
    console.log(reason, `Unhandled Rejection at Promise - ${p}`)
  )
  .on("uncaughtException", (exception_err) =>
    console.log(exception_err, "Uncaught Exception Error")
  );
import express, { Request, Response } from "express";
import { createServer } from "http";
import { init } from "./server/middleware/socket/socketServer";
import { DisconnectReason } from "socket.io";
import { catchErrorPromise } from "./src/utils/catchError";
import { generalListeners } from "./server/middleware/socket/listen";
import stateRoutes from "./server/routes";
import next from "next";

import dotenv from "dotenv";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, turbo: true, turbopack: true });
const handle = app.getRequestHandler();

async function start() {
  try {
    await app.prepare();

    const expressApp = express();
    const server = createServer(expressApp);

    const [ExpressErr, ExpressSocketServer] = await catchErrorPromise(
      init(server)
    );

    if (ExpressErr) throw ExpressErr;

    // Socket.IO event handlers with type safety
    ExpressSocketServer?.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
      socket.on("disconnect", (reason: DisconnectReason) => {
        console.log(`Client ${socket.id} disconnected. Reason: ${reason}`);
      });
      generalListeners(socket, socket.request);
    });

    expressApp.use("/server", stateRoutes);
    // Handle Next.js routing
    expressApp.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(
        `> Express SocketIO NextJs Server listening on port http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log("SERVER ERROR", error);
    console.log("RESTARTING SERVER");
    setTimeout(() => start(), 3000);
  }
}

start();
