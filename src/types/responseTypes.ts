import { type User } from "@/store/useAuthStore";

export type BaseResponse<T> = {
  message: string;
  data: T[];
};

export type AuthResponse = {
  user: Pick<User, "id" | "username">;
  token: string;
};

export type Chat = {
  id: string;
  name?: string;
  isGroup: boolean;
  memeberUsername?: string;
  memberId?: string;
};

export type ChatsResponse = {
  message: string;
  chats: Chat[];
};
