import { useEffect, useReducer } from "react";
import { SocketContext } from "./context";
import {
  initialSocketState,
  SocketActionTypes,
  socketReducer,
} from "./socketReducer";
import { socket } from "./socket";
import useAuthStore from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/global-query/constants";

const SocketCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(socketReducer, initialSocketState);
  const { user, accessToken } = useAuthStore((state) => state);

  const queryClient = useQueryClient();

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

      socket.on("message:new", ({ chatId }: { chatId: string }) => {
        console.log("NEW MESSAGE");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.messages, chatId],
        });
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
