import { apiRequest } from "@/service/apiRequest";
import api from "@/service/axiosInstance";
import type { AuthResponse } from "@/types/responseTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type User = {
  id: string;
  username: string;
};

type State = {
  user: User | null;
  accessToken: string | null;
  initialRefreshFinished: boolean;
};

type Action = {
  setUserState: (
    user: State["user"],
    accessToken: State["accessToken"]
  ) => void;
  refresh: () => Promise<{ user: User; token: string } | null>;
};

const useAuthStore = create<State & Action>()(
  devtools(
    (set) => ({
      user: null,
      accessToken: null,
      initialRefreshFinished: false,
      setUserState: (user, accessToken) =>
        set(() => ({ user: user, accessToken: accessToken })),
      refresh: async () => {
        try {
          const response = await apiRequest<AuthResponse>(() =>
            api.post("/auth/refresh")
          );
          const { user, token } = response.data;
          set({ user, accessToken: token });
        } catch (error) {
          console.error("Refresh faield", error);
        } finally {
          set({ initialRefreshFinished: true });
        }
      },
    }),
    { name: "AuthStore" }
  )
);

export default useAuthStore;
