import { useEffect, useReducer } from "react";
import { SocketContext } from "./context";
import { initialSocketState, socketReducer } from "./socketReducer";
import { socket } from "./socket";
import useAuthStore from "@/store/useAuthStore";

const SocketCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(socketReducer, initialSocketState);
  const { user, accessToken } = useAuthStore((state) => state);

  useEffect(() => {
    if (user) {
      socket.auth = { token: accessToken };
      console.log("SOCKET: ", socket);
      socket.connect();
      socket.on("connect", () => {
        console.log("Socket connected");
      });
    }
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [user]);

  const joinRooms = (chatIds: string[]) => {};

  return (
    <SocketContext.Provider value={{ dispatch, state, joinRooms }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketCtxProvider;
