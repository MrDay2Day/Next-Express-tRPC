import { useContext } from "react";
import { SocketContext, SocketContextValue } from "./SocketProvider";

export function useSocket(): SocketContextValue | null {
  const socketTools = useContext(SocketContext);

  return socketTools;
}
