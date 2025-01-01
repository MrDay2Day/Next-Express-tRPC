import { Socket } from "socket.io";
import http from "http";

import { getIO } from "./socketServer";
import { catchError } from "../../../src/utils/catchError";

let count = 0;

export async function generalListeners(
  socket: Socket,
  request: http.IncomingMessage
) {
  try {
    const auth = socket.handshake.auth;
    const headers = request.headers;

    socket.onAny(async (event) => {
      console.log({ auth, headers });
      console.log({ event }, socket.data);
    });

    /**Examples of general socket listeners */

    socket.on("ping", async (data, callback) => {
      try {
        const [io_error, io] = catchError(getIO, []);
        if (io_error) {
          if (callback) {
            return callback({ valid: false, msg: "Connection Issue" });
          }
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
        /**Callback used to send data back to the client if applicable. */
        if (callback) callback(response);
      } catch (err) {
        console.log({ err });
      }
    });

    socket.on("clients", async (data, callback) => {
      try {
        console.log({ data });
        const [io_error, io] = catchError(getIO, []);
        if (io_error && !io) {
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
    const [io_error, io] = catchError(getIO, []);
    if (io_error) {
      throw new Error("No Socket socket connection.");
    }

    /** getting the socket connection instance for the ID */
    const socket = io?.sockets.sockets.get(socketId);

    /** Adding socket id to the user's private socket room */
    if (socketRoom) {
      socket?.join(socketRoom);
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
