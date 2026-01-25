import { queryKeys } from "@/hooks/global-query/constants";
import { useGetItems } from "@/hooks/global-query/crudHooks";
import type { Chat } from "@/types/globalTypes";

const useContactQuery = () => {
  const chatData = useGetItems<Chat>([queryKeys.chats]);
  return {
    chatData,
  }
};

export default useContactQuery;
