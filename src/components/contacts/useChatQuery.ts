import { queryKeys } from "@/hooks/global-query/constants";
import { deleteReq, getAllReq, postReq, putReq } from "@/service/apiService";
import useActiveChatStore from "@/store/useActiveChatStore";
import useSearchStore from "@/store/useSearchStore";
import type { Chat } from "@/types/globalTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const useChatQuery = () => {
  const path = queryKeys.chats;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toggleActiveChat, chat } = useActiveChatStore();
  const { clearUsers, toggleIsSearching } = useSearchStore();

  //get all chats for a user
  const { data: chatData, isFetching } = useQuery({
    queryKey: [queryKeys.chats],
    queryFn: async () => await getAllReq<Chat[]>(path),
  });
  //mutation creates group chat or get/create private chat
  type DMprops = { memberId: string; type: "private" };
  type GroupChatProps = { memberIds: string[]; name: string; type: "group" };
  type ChatMutationProps = DMprops | GroupChatProps;
  const { mutate: createChat } = useMutation({
    mutationFn: async (data: ChatMutationProps) => {
      const { type, ...other } = data;
      const chat = await postReq<Chat>(`${path}/${type}`, other);
      return chat;
    },
    onSuccess: (chat) => {
      //set it as active chat
      toggleActiveChat(chat);
      //clear users from the search state
      clearUsers();
      //set isSearch to false
      toggleIsSearching();
      //update cache
      queryClient.setQueryData<Chat[] | undefined>(
        [queryKeys.chats],
        (oldChats) => {
          if (!oldChats) return [chat];
          const filteredChats = oldChats.filter(
            (oldChat) => oldChat.id !== chat.id,
          );

          return [chat, ...filteredChats];
        },
      );
      //navigate to active chat
      navigate({ from: "/app/chat", to: `${chat.id}` });
    },
  });
  //Add/remove a user from group chat
  const { mutate: addRemoveGroupMember } = useMutation({
    mutationFn: async (memberId: string) => {
      const infoMsg = await putReq<{ message: string }>(
        `${path}/${chat?.id}`,
        memberId,
      );
      return infoMsg.message;
    },
  });

  //Delete chat mutation
  const { mutate: deleteChat } = useMutation({
    mutationFn: async (id: string) => {
      await deleteReq(`/${path}/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Chat[]>([queryKeys.chats], (oldChats) => {
        return oldChats?.filter((chat) => chat.id !== id);
      });
    },
  });
  return {
    chatData,
    isFetching,
    createChat,
    addRemoveGroupMember,
    deleteChat,
  };
};

export default useChatQuery;
