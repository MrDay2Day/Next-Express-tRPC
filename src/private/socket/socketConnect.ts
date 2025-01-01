import io, { ManagerOptions, SocketOptions } from "socket.io-client";
import { catchError } from "@/utils/catchError";

const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL
    : `http://localhost:${process.env.PORT}`;

export function ServerSocketConn() {
  try {
    const socketConfig: Partial<ManagerOptions & SocketOptions> = {
      path: "/server/socket/",
      withCredentials: true,
      secure: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 3,
      autoConnect: true,
      extraHeaders: {
        "x-custom-header": "my-custom-client",
        Authorization: "Bearer 12345678",
      },
      auth: {
        token: "server_token",
      },
    };
    const [conn_err, conn] = catchError(io, [SERVER_URL, socketConfig]);

    if (conn_err && !conn) throw conn_err;

    const socketEmitListen = (
      event: string,
      data: unknown,
      callBack?: (d: unknown) => void
    ) => {
      conn?.emit(event, data, (response: unknown) => {
        if (callBack) {
          callBack(response);
        }
        conn?.disconnect();
      });
    };

    return { socketEmitListen, socketId: conn?.id };
  } catch (error) {
    console.log("SERVER SOCKET CONN ERR", error);
    throw error;
  }
}
