import { createContext, useContext } from "react";
import type { SocketActions, SocketState } from "./socketReducer";

type ContextType = {
  state: SocketState;
  dispatch: React.Dispatch<SocketActions>;
  joinRooms: (chatIds: string[]) => void;
};

export const SocketContext = createContext<ContextType | null>(null);

export const useSocketCtx = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("Something went wrong with socket context");
  return ctx;
};
