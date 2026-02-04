import { queryKeys } from "@/hooks/global-query/constants";
import { getAllReq } from "@/service/apiService";
import type { Chat } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";

const useContactQuery = () => {
  const path = queryKeys.chats;

  const { data: chatData, isFetching } = useQuery({
    queryKey: [queryKeys.chats],
    queryFn: async () => await getAllReq<Chat[]>(path),
  });

  // const chatData = useGetItems<Chat>([queryKeys.chats]);
  return {
    chatData,
    isFetching,
  };
};

export default useContactQuery;
