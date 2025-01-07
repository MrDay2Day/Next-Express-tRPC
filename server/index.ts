import express, { Request, Response } from "express";
import { createServer } from "http";
import next from "next";

import dotenv from "dotenv";
import { catchErrorPromise } from "../src/utils/catchError";
import { init } from "./middleware/socket/socketServer";
import { generalListeners } from "./middleware/socket/listen";
import routes from "./routes";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, turbo: true, turbopack: true });
const handle = app.getRequestHandler();

async function startNextExpressServer() {
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
      generalListeners(socket, socket.request);
    });

    expressApp.use("/server", routes.stateRoutes);
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
    setTimeout(() => startNextExpressServer(), 3000);
  }
}

export default startNextExpressServer;
