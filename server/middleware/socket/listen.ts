/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DisconnectReason, Socket } from "socket.io";
import http from "http";

import { getIO } from "./socketServer";
import { catchError } from "../../../src/utils/catchError";
import SocketLogger from "./logger";

let count = 0;
const [io_error, io] = catchError(getIO, []);

const socketIOLogger = new SocketLogger();
// Handle server-wide errors
io?.engine.on("connection_error", (err: any) => {
  socketIOLogger.error("SERVER_CONN", "Connection error", {
    error: err.message,
    req: err.req,
    code: err.code,
  });
});

let activeSockets: string[] = [];

export async function generalListeners(
  socket: Socket,
  request: http.IncomingMessage
) {
  try {
    // const auth = socket.handshake.auth;
    // const headers = request.headers;

    // socket.onAny(async (event) => {
    //   console.log({ auth, headers });
    //   console.log({ event }, socket.data);
    // });

    console.log("Client connected:", socket.id);
    socketIOLogger.info(socket.id, "Client connected", { event: "connection" });
    socket.on("disconnect", (reason: DisconnectReason) => {
      socketIOLogger.warn(socket.id, "Client Disconnected", {
        event: "disconnected",
        reason,
      });
      console.log(`Client ${socket.id} disconnected. Reason: ${reason}`);
    });

    // Handle errors
    socket.on("error", (error: Error) => {
      socketIOLogger.error(socket.id, "Socket error", {
        error: error.message,
        stack: error.stack,
        clientId: socket.id,
      });
    });

    /**Examples of general socket listeners */
    socket.on("ping", async (data, callback) => {
      try {
        socketIOLogger.info(socket.id, "Triggers a ping to server for demo", {
          event: "ping",
        });
        if (io_error && !io) {
          socketIOLogger.error(socket.id, " - I6729HGF", io_error);
        }
        if (callback) {
          return callback({ valid: false, msg: "Connection Issue" });
        }
        /**This function should be used to validate socket connection that it is associated with a valid user. */
        await validate_socket(socket);
        console.log("Received PING data:", {
          data,
        });
        count++;
        const response = {
          valid: true,
          count,
          time: new Date(),
        };
        /**Example -> Sending a socket message, this message is sent to all who are listening to the "all" event.
         * Also this message, if redis/keydb is enabled is distributed to all server instances that are connected to the Pub/Sub connection.
         */
        io?.to(data.to).emit("hello", data);
        socketIOLogger.info(socket.id, "Emit to specific user", {
          data,
        });
        io?.emit("tick", { data: count, date: new Date() });
        socketIOLogger.info(socket.id, "General Emit", {
          data: { data: count, date: new Date() },
          event: "tick",
        });
        /**Callback used to send data back to the client if applicable. */
        if (callback) callback(response);
      } catch (err) {
        console.log({ err });
      }
    });
    socket.on("clients", async (data, callback) => {
      try {
        socketIOLogger.info(socket.id, "Trigger client endpoint", { data });
        console.log({ data });
        if (io_error && !io) {
          socketIOLogger.error(socket.id, "io Error  FDH7E92J1", io_error);
          if (callback) {
            return callback({ valid: false, msg: "Connection Issue" });
          }
        }

        if (callback && io) {
          console.log({ data, callback });
          const connectedClients = Array.from(io.sockets.sockets.keys());
          const clientIds = [...io.sockets.sockets.keys()];
          return callback({ valid: true, connectedClients, clientIds });
        }
      } catch (err) {
        console.log({ err });
      }
    });

    /** WebRTC Functions */
    const existingSocket = activeSockets.find(
      (existingSocket) => existingSocket === socket.id
    );
    console.log({ existingSocket });

    if (!existingSocket) {
      activeSockets.push(socket.id);

      console.log({ activeSockets });

      socket.emit("update-user-list", {
        users: activeSockets,
      });
    }

    socket.on("mute-user", (data) => {
      socket.to(data.to).emit("user-muted", { socket: socket.id });
    });
    socket.on("ice-candidate", (data) => {
      const { candidate, to } = data;

      // Forward the candidate to the intended recipient
      socket.to(to).emit("ice-candidate", {
        candidate,
        from: socket.id,
      });
    });
    socket.on("refresh", (data: any, callback: (x: string[]) => void) => {
      callback(activeSockets);
    });
    socket.on("call-user", (data: any) => {
      socket.to(data.to).emit("call-made", {
        offer: data.offer,
        socket: socket.id,
      });
    });
    socket.on("end-call", (data: any) => {
      socket.to(data.to).emit("end-call", {
        socket: socket.id,
      });
    });
    socket.on("make-answer", (data) => {
      socket.to(data.to).emit("answer-made", {
        socket: socket.id,
        answer: data.answer,
      });
    });
    socket.on("reject-call", (data) => {
      socket.to(data.from).emit("call-rejected", {
        socket: socket.id,
      });
    });
    socket.on("disconnect", () => {
      const newList: string[] = [];

      activeSockets.forEach((c) => {
        if (c !== socket.id) {
          newList.push(c);
        }
      });

      activeSockets = newList;

      socket.broadcast.emit("remove-user", {
        socketId: socket.id,
      });
    });
  } catch (error: unknown) {
    console.log("Error - generalListeners", error);
  }
}

/**
 *
 * @param {string} socketRoom The unique socket room id for each user.
 * @param {string} socketId The new socket connection ID to be added to the socket room.
 *
 * @returns {Promise<Boolean>} Returns a promise true | false if the socket was added to the socket room.
 */
export async function joinSocketRoom(
  socketRoom: string,
  socketId: string
): Promise<boolean> {
  try {
    console.log({ socketRoom, socketId });
    /** Establishing SocketIO Server Access */
    if (io_error && !io) {
      socketIOLogger.error(socketId, "io Error - HE1G5389", {
        ...io_error,
        socketRoom,
      });
      throw new Error("No Socket socket connection.");
    }

    /** getting the socket connection instance for the ID */
    const socket = io?.sockets.sockets.get(socketId);

    /** Adding socket id to the user's private socket room */
    if (socketRoom) {
      socket?.join(socketRoom);
    } else {
      socketIOLogger.error(
        socketId,
        "No socket for current socket connection",
        { socketRoom }
      );
    }

    /** Getting a list of the main socket room */
    const main_socket_room = io?.sockets.adapter.rooms.get(
      process.env.APP_MAIN_SOCKET_ROOM || "main_socket_room"
    );

    /** Add socket connection to the main socket room */
    if (main_socket_room) {
      /** Checking if main socket room has the new ID */
      const has_socket_conn = main_socket_room.has(socketId);
      if (!has_socket_conn) {
        socket?.join(process.env.APP_MAIN_SOCKET_ROOM || "main_socket_room");
      }
    } else {
      /** If the room does not exist on this server it will be created upon adding the ID */
      socket?.join(process.env.APP_MAIN_SOCKET_ROOM || "main_socket_room");
    }

    console.log(`${socketRoom} IDs`, {
      ids: io?.sockets.adapter.rooms.get(socketRoom),
    });
    return true;
  } catch (err) {
    throw err;
  }
}

/**
 * Validate socket connection with "socket_room_id" method.
 *
 * When a socket is sending a message you SHOULD send the user's id when the event is triggered fetch the user info which will include the user's "socket_room_id" then check if that "socket.id" from the socket connection is in the user's private socket room, if it is then the message can be sent else throw an error.
 *
 * @param {string} socket The socket connection to validate if it belongs to a verified user.
 * @returns {Promise<Boolean>} Returns a promise true | false if the connection is valid.
 */
async function validate_socket(socket: Socket): Promise<boolean> {
  try {
    const socket_id = socket.id;

    if (!socket_id) {
      throw new Error("Not Authenticated.");
    }

    // Socket Validation Here

    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
}
