import { create } from "zustand";
import { devtools } from "zustand/middleware";

type User = {
  id: string;
  username: string;
  token: string;
};

type State = {
  user: User | null;
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

const useAuthStore = create<State & Action>()(
  devtools((set) => ({
    user: null,
    updateUser: (user) => set(() => ({ user: user })),
  }))
);

export default useAuthStore;
