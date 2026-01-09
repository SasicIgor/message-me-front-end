import { queryKeys } from "@/hooks/global-query/constants";
import { useCreateItems, useGetItems } from "@/hooks/global-query/crudHooks";
import type { Message } from "@/types/globalTypes";

const useMessageQuery = (chatId: string) => {
  const chatMessages = useGetItems<Message>([queryKeys.messages, chatId]);
  const createMessage = useCreateItems([queryKeys.messages, chatId]);
  return {
    chatMessages,
    createMessage
  };
};

export default useMessageQuery;
