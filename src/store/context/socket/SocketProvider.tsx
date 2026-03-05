import { useEffect, useState } from "react";
import { SocketContext } from "./context";
import useAuthStore from "@/store/useAuthStore";
import { socket } from "./socket";

const SocketCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { user, accessToken } = useAuthStore((state) => state);

  useEffect(() => {
    if (!user && !socket) return;
    socket.auth = { token: accessToken };
    socket.connect();
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [user, accessToken]);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketCtxProvider;
