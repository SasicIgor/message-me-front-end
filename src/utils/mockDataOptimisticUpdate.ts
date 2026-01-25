import useAuthStore from "@/store/useAuthStore";
import type { Message } from "@/types/globalTypes";

type fillOptimisticDataProps = Pick<Message, "content" | "chatId">;

export const fillOptimisticData = ({
  content,
  chatId,
}: fillOptimisticDataProps): Message => {
  const tempId = Date.now().toString();
  const senderId = useAuthStore.getState().user?.id as string;
  const createdAt = new Date().toISOString();
  return { id: tempId, senderId, createdAt, content, chatId };
};
