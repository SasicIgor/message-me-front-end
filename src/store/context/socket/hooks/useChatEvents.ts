import { useEffect } from "react";
import { useSocketCtx } from "../context";

const useChatEvents = (chatId: string) => {
  const { socket, isConnected } = useSocketCtx();

  useEffect(() => {
    if (isConnected && !chatId) return;
    socket.emit("chat:join_room", chatId);
    return () => {
      socket.emit("chat:leave_room", chatId);
    };
  }, [chatId]);
};

export default useChatEvents;
