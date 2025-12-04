import { queryKeys } from "@/hooks/global-query/constants";
import { useGetItems } from "@/hooks/global-query/crudHooks";
import type { Chat } from "@/types/responseTypes";

const useContactQuery = () => {
  const contactData = useGetItems<Chat>([queryKeys.chats]);
  return {
    contactData,
  }
};

export default useContactQuery;
