import { queryKeys } from "@/hooks/global-query/constants";
import { useGetItems } from "@/hooks/global-query/crudHooks";
import { deleteReq, patchReq, postReq } from "@/service/apiService";
import type { Message } from "@/types/globalTypes";
import { fillOptimisticData } from "@/utils/mockDataOptimisticUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMessageQuery = (chatId: string) => {
  const path = `${queryKeys.messages}/${chatId}`;
  const queryKey = [queryKeys.messages, chatId];
  const queryClient = useQueryClient();

  const chatMessages = useGetItems<Message>([queryKeys.messages, chatId]);

  const { mutate: createOptimisticMessage } = useMutation({
    mutationFn: async (data: Pick<Message, "content">) => {
      return await postReq(path, data);
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
      queryClient.setQueryData(queryKey, (prev: Message[]) => {
        return prev ? [optimisticMsg, ...prev] : [optimisticMsg];
      });

      return { oldData, optimisticMsg };
    },
    onError: (err, _data, context) => {
      console.log(err);
      //on error return the old data
      if (context) queryClient.setQueryData(queryKey, context.oldData);
    },
    onSettled: () => {
      //invalidate cache to trigger refetch
      queryClient.invalidateQueries({ queryKey });
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
    onSettled: (updatedMsg) => {
      const data = queryClient.getQueryData(queryKey);
      console.log(data);
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
    createOptimisticMessage,
    updateMessage,
    deleteMessage,
  };
};

export default useMessageQuery;
