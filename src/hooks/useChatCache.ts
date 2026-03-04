import type { Chat } from "@/types/globalTypes";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./global-query/constants";
import { msgSnippet } from "@/utils/msgSnippet";

const useChatCache = () => {
  const queryClient = useQueryClient();

  const chatForUpdate = (
    chatId: string,
    updateFunc: (chat: Chat) => Chat,
    moveUp: boolean = false,
  ) => {
    queryClient.setQueryData<Chat[]>([queryKeys.chats], (prev) => {
      if (!prev) return;
      //find the index of the chat for update
      const chatIndex = prev.findIndex((c) => c.id === chatId);
      if (chatIndex === -1) return prev;

      //update chat specific fields
      const updatedChat = updateFunc(prev[chatIndex]);

      //make new array so it trigger the rerender
      const newChatList = [...prev];

      //replace the old chat with an updated version on the same index
      if (!moveUp) {
        newChatList[chatIndex] = updatedChat;
        console.log();
        return newChatList;
      }
      return [
        { ...updatedChat },
        ...newChatList.filter((_, i) => i !== chatIndex),
      ];
    });
  };

  const resetCounter = (chatId: string) => {
    chatForUpdate(chatId, (chat) => ({ ...chat, unreadCount: 0 }));
  };

  const newMessageChatUpdate = (
    chatId: string,
    content: string,
    isActive: boolean,
  ) => {
    chatForUpdate(
      chatId,
      (chat) => ({
        ...chat,
        lastMessageSnippet: msgSnippet(content),
        unreadCount: isActive ? chat.unreadCount : chat.unreadCount + 1,
      }),
      true,
    );
  };
  return { resetCounter, newMessageChatUpdate };
};

export default useChatCache;
