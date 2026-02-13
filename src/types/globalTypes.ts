export type Message = {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  chatId: string;
};

export type Chat = {
  id: string;
  name: string | null;
  isGroup: boolean;
  memberUsername?: string;
  memberId: string;
};
