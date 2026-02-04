import { useEffect, useReducer } from "react";
import { SocketContext } from "./context";
import {
  initialSocketState,
  SocketActionTypes,
  socketReducer,
} from "./socketReducer";
import { socket } from "./socket";
import useAuthStore from "@/store/useAuthStore";

const SocketCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(socketReducer, initialSocketState);
  const { user, accessToken } = useAuthStore((state) => state);

  useEffect(() => {
    if (user) {
      socket.auth = { token: accessToken };

      socket.connect();
      socket.on("connect", () => {
        dispatch({ type: SocketActionTypes.SET_CONNECTED });
        console.log("Socket connected");
      });
      socket.on("disconnect", () => {
        dispatch({ type: SocketActionTypes.SET_DISCONNECTED });
      });
    }
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [user]);

  const joinRooms = async (chatIds: string[]) => {
    const response = await socket.emitWithAck("chat:join_many", chatIds);
    if (response === "ok")
      dispatch({ type: SocketActionTypes.JOIN_CHATS, payload: chatIds });
  };

  return (
    <SocketContext.Provider value={{ dispatch, state, joinRooms }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketCtxProvider;
