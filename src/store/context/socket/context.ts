import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

export type SocketCtxState = {
  isConnected: boolean;
  socket: Socket;
};

export const SocketContext = createContext<SocketCtxState | null>(null);

export const useSocketCtx = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("Something went wrong with socket context");
  return ctx;
};
