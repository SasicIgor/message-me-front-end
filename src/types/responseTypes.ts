import { type User } from "@/store/useAuthStore";

export type AuthResponse = {
  message: string;
  user: Pick<User, "id" | "username">;
  token: string;
};
