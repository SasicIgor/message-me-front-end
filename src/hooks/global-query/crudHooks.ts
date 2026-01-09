import { createPostReq, fetchAllReq } from "@/service/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Message } from "@/types/globalTypes";

export const useGetItems = <T>(queryKey: string[]): T[] => {
  const fallback: T[] = [];

  const path = queryKey.join("/");

  const { data = fallback } = useQuery<T[]>({
    queryKey,
    queryFn: () => fetchAllReq(path),
  });

  return data;
};

export const useCreateItems = <T>(queryKey: string[]) => {
  const path = queryKey.join("/");
  const queryClient = useQueryClient();
  console.log("mutation start");
  const { mutate } = useMutation({
    mutationFn: async (data: T) => createPostReq(path, data),
    onMutate: async (newMessage) => {
      console.log("onMutate");
      await queryClient.cancelQueries({ queryKey });
      const oldMsgs: Message[] | undefined = queryClient.getQueryData([
        queryKey,
      ]);
      queryClient.setQueryData(queryKey, (prev: Message[]) => {
        console.log("PREV: ", prev);
        return [newMessage, ...prev];
      });
      return { oldMsgs };
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutate;
};
