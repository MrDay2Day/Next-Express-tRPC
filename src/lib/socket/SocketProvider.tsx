/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

import io, { Socket } from "socket.io-client";
import { BASE_URL } from "../../../types/constants/general";

const SERVER_URL = BASE_URL;

export type SocketContextValue = {
  socketId: string;
  connected: boolean;
  socket: Partial<Socket>;
  socketEmitListen: (
    event: string,
    data?: any, // This type can be imported from express server
    callBack?: (response: any) => void
  ) => void;
  socketListenOn: (event: string, callBack: (response: any) => void) => void;
  socketListenOff: (event: string) => void;
};

const SocketContext: React.Context<SocketContextValue | null> =
  createContext<SocketContextValue | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

const socketDefault: Partial<Socket> = {
  id: "",
  connected: false,
  disconnected: true,
  on: undefined,
  off: undefined,
  emit: undefined,
};

function SocketProvider({ children }: SocketProviderProps) {
  const socket = useRef<Partial<Socket>>(socketDefault);

  const socketEmitListen = useRef<
    (event: string, data?: any, callBack?: (response: any) => void) => void
  >(() => {});
  const socketListenOn = useRef<
    (event: string, callBack: (response: any) => void) => void
  >(() => {});
  const socketListenOff = useRef<(event: string) => void>(() => {});

  const online = true;
  //   const storedSocket = useSelector((state: any) => state.socket.connection);

  const [socketId, setSocketId] = useState("");
  //   const [masterTab, setMasterTab] = useState(false);

  socketListenOn.current = useCallback(
    (event: string, callBack: (d: any) => void) => {
      if (!online || !socket.current || !socket.current.on) return;
      if (socket.current.id && event) {
        socket.current.on(event, (response) => callBack(response));
      }
    },
    [online, socket]
  );

  socketListenOff.current = useCallback(
    (event) => {
      if (!online || !socket.current || !socket.current.off) return;
      if (!!socket.current.id && event) {
        socket.current.off(event);
      }
    },
    [online, socket]
  );

  socketEmitListen.current = useCallback(
    (event, data, callBack?: (d: any) => void) => {
      if (!online || !socket.current || !socket.current.emit) return;
      if (!!socket.current.id && event) {
        socket.current.emit(event, data, (response: any) => {
          if (callBack) callBack(response);
        });
      }
    },
    [online, socket]
  );

  useEffect(() => {
    socket.current = online
      ? io(SERVER_URL, {
          path: "/server/socket/",
          withCredentials: true,
          secure: true,
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: Number.MAX_SAFE_INTEGER,
          autoConnect: true,
          extraHeaders: {
            "x-custom-header": "my-custom-server",
            Authorization: "Bearer 98765432",
          },
          auth: {
            token: "client_token",
          },
        })
      : socketDefault;

    console.log("RIGHT HERE!!!!", 1234567890);

    if (online && socket.current.on)
      socket.current.on("connect", async () => {
        console.log("WebSocket Connected - ", socket.current.id);
        if (socket.current.id) {
          setSocketId(socket.current.id || "");
          localStorage.setItem("socketId", socket.current.id);
          //   updateSocketId(socket.current.id)
          //     .then((resData) => {
          //       console.log(
          //         "Registering socket.current with user's session - ",
          //         socket.current.id,
          //         {
          //           resData,
          //           socket,
          //         }
          //       );
          //     })
          //     .catch((err) => {
          //       console.log("Socket Comp ERR", { err });
          //     });
        }
      });

    return () => {
      if (socketId) localStorage.removeItem("socketId");
      if (socket.current.disconnect) socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  //   useEffect(() => {
  //     if (socket.current.connected && !socket.current.disconnected) {
  //       dispatch({
  //         type: "CONNECT_SOCKET",
  //       });
  //     } else {
  //       dispatch({
  //         type: "DISCONNECT_SOCKET",
  //       });
  //     }
  //   }, [socket.current.connected]);

  return (
    <SocketContext.Provider
      value={{
        socketId: socket.current.id || "",
        connected: socket.current.connected || false,
        socket: socket.current,
        socketEmitListen: socketEmitListen.current!,
        socketListenOn: socketListenOn.current!,
        socketListenOff: socketListenOff.current!,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketProvider, SocketContext };
