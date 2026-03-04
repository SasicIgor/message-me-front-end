import { useQueryClient } from "@tanstack/react-query";
import type { Message } from "@/types/globalTypes";
import { queryKeys } from "@/hooks/global-query/constants";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useChatCache from "@/hooks/useChatCache";
import { useSocketCtx } from "../context";

const useMessageEvent = (chatId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const { newMessageChatUpdate } = useChatCache();
  const { socket, isConnected } = useSocketCtx();

  useEffect(() => {
    if (!user || !isConnected) return;
    const handleNewMessage = ({ msg }: { msg: Message }) => {
      //update contact card info (unread count and last message snippet)
      const isActive = msg.chatId === chatId;
      newMessageChatUpdate(msg.chatId, msg.content, isActive);
      if (msg.senderId !== user.id) {
        queryClient.setQueryData<Message[]>(
          [queryKeys.messages, msg.chatId],
          (oldMsg) => {
            if (!oldMsg) return;
            return [msg, ...oldMsg];
          },
        );
      }
    };
    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [chatId, user]);
};

export default useMessageEvent;
