import { useEffect, useState } from "react";
import { SocketContext, type SocketCtxState } from "./context";
import useAuthStore from "@/store/useAuthStore";
import { socket } from "./socket";

const SocketCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { user, accessToken } = useAuthStore((state) => state);
  

  useEffect(() => {
    if (user && socket) {
      socket.auth = { token: accessToken };

      socket.connect();
      socket.on("connect", () => {
        setIsConnected(true);
      });
      socket.on("disconnect", () => {
        setIsConnected(false);
      });
    }
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketCtxProvider;
