/** This files allows us to share our SocketIO connection across the application. */
console.log("INITIALIZING SOCKET CONNECTION...");

import http from "http";
import { createClient, RedisClientType } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { Server as SocketIOServer } from "socket.io";
import { catchErrorPromiseFunc } from "../../../src/utils/catchError";

import dotenv from "dotenv";
dotenv.config();

export const userRedis = process.env.USE_REDIS === "y";

export const pubClient = userRedis
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : null;

export const subClient = userRedis && pubClient ? pubClient?.duplicate() : null;
// export const eventClient =
//   userRedis && pubClient ? pubClient?.duplicate() : null;

export let io: SocketIOServer;

export async function init(httpServer: http.Server) {
  io = new SocketIOServer(httpServer, {
    cookie: true,
    pingTimeout: 30000,
    pingInterval: 30000,
    path: `/server/socket/`,
    cors: {
      origin: process.env.SERVER_URL,
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
    },
  });

  if (userRedis) {
    console.log("ATTEMPTING TO CONNECT TO REDIS");
    const [connErr] = await catchErrorPromiseFunc(
      Promise.all([
        pubClient?.connect(),
        subClient?.connect(),
        // eventClient?.connect(),
      ])
    );

    if (connErr) {
      console.log("REDIS CONNECTION ERROR", connErr);
      throw connErr;
    }

    io.adapter(createAdapter(pubClient, subClient));
    console.log("SOCKET CONNECTED TO REDIS!");

    // console.log({ io });
    console.log("SECURE WEBSOCKET INITIALIZED!");
  }

  return io;
}

/**To get Access to Web socket
 * To use io
 *
 * @function getIO()
 *
 * @returns {Server} Server with socket connection
 *
 * @example Server Side
 *
 * const { getIO } = require("../socket");
 *
 * // General Emit to all sockets
 *
 * const io = getIO();
 * io.emit("event",
 *   {
 *     action: "create",
 *     data: { ... }
 *   }
 * );
 *
 * // Send to specific socket id  or room id
 *
 * const io = getIO();
 * const data = { action: "create" };
 *
 * io
 *   .to(<client/room_id>)
 *   .emit("reg_event", data);
 *
 * io
 *   .to(<client/room_id>)
 *   .emit("ack_demo", data, ack => ack && console.log(ack) );
 *   // "ack" is only applicable if receiver acknowledges message with a reply.
 *
 *
 * @example Client Side
 *
 * socket.on("reg_event", (data) => {
 *     console.log({ data })
 * });
 *
 * socket.on("ack_demo", (data, ack) => {
 *   if(data.action === "create"){
 *     console.log({ data })
 *     ack({ response: true });
 *   }else{
 *     ack({ response: false });
 *   };
 * });
 */
export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  console.log("SOCKET.IO INITIALIZED!");
  return io;
}

export async function redisServer() {
  if (process.env.USE_REDIS === "y") {
    const conn = pubClient?.duplicate();
    await conn?.connect();
    return conn;
  } else {
    return false;
  }
}

export function redisServerDuplicate(): RedisClientType | null {
  if (process.env.USE_REDIS === "y" && pubClient) {
    return (pubClient.duplicate() as RedisClientType) || null;
  }
  return null;
}
