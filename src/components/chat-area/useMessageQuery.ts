import { queryKeys } from "@/hooks/global-query/constants";
import useChatCache from "@/hooks/useChatCache";
import { deleteReq, getAllReq, patchReq, postReq } from "@/service/apiService";
import type { Message } from "@/types/globalTypes";
import {
  formatMessageList,
  type MsgListReturn,
} from "@/utils/formatMessageList";
import { fillOptimisticData } from "@/utils/mockDataOptimisticUpdate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useMessageQuery = (chatId: string) => {
  const path = `${queryKeys.messages}/${chatId}`;
  const queryKey = [queryKeys.messages, chatId];
  const queryClient = useQueryClient();
  const { newMessageChatUpdate } = useChatCache();

  const fallback: MsgListReturn = [];
  const { data: chatMessages = fallback, isLoading: loadingMessages } =
    useQuery({
      queryKey,
      queryFn: async () => {
        const chatMessages = await getAllReq<Message[]>(path);
        return chatMessages;
      },
      select(data) {
        const formattedData = formatMessageList(data);
        return formattedData;
      },
    });

  const { mutate: createOptimisticMessage } = useMutation({
    mutationFn: async (data: Pick<Message, "content">) => {
      return await postReq<Message>(path, data);
    },
    onMutate: async (data) => {
      //prevents fetching for this key before it settle
      await queryClient.cancelQueries({ queryKey });

      //snapshot of the old data in case of an error
      const oldData: Message[] | undefined = queryClient.getQueryData(queryKey);
      //set optimistic message with full data object
      //id and createAt are mockings until the real data comes back
      const optimisticMsg = fillOptimisticData({
        content: data.content,
        chatId,
      });
      queryClient.setQueryData<Message[]>(queryKey, (prev) => {
        return prev ? [...prev, optimisticMsg] : [optimisticMsg];
      });
      //update chat cards
      newMessageChatUpdate(chatId, data.content, true);

      return { oldData, optimisticMsg };
    },
    onError: (err, _data, context) => {
      console.log(err);
      //on error return the old data
      if (context) queryClient.setQueryData(queryKey, context.oldData);
    },
    onSuccess(data, _variables, onMutateResult) {
      //replace placeholder with returned message from the post request
      queryClient.setQueryData<Message[]>(queryKey, (prev) => {
        if (!prev) return [data];
        return prev.map((c) =>
          c.id === onMutateResult.optimisticMsg.id ? data : c,
        );
      });
    },
  });

  const { mutate: updateMessage } = useMutation({
    mutationFn: async ({
      data,
      messageId,
    }: {
      data: Pick<Message, "content">;
      messageId: string;
    }) => {
      console.log("editing");
      return await patchReq<Message>(`${path}/${messageId}`, data);
    },
    onSuccess: (updatedMsg) => {
      queryClient.setQueryData(queryKey, (prev: Message[]) => {
        return prev.map((msg) =>
          msg.id === updatedMsg?.id ? updatedMsg : msg,
        );
      });
    },
  });
  const { mutate: deleteMessage } = useMutation({
    mutationFn: async (messageId: string) => {
      return await deleteReq(`${path}/${messageId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return {
    chatMessages,
    loadingMessages,
    createOptimisticMessage,
    updateMessage,
    deleteMessage,
  };
};

export default useMessageQuery;
