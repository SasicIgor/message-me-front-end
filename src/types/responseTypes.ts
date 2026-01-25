import { type User } from "@/store/useAuthStore";
import type { Chat } from "./globalTypes";

export type BaseResponse<T> = {
  message: string;
  data: T;
};

export type AuthResponse = {
  user: Pick<User, "id" | "username">;
  token: string;
};

export type ChatsResponse = {
  message: string;
  chats: Chat[];
};
