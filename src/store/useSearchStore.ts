import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./useAuthStore";

type State = {
  users: User[];
};

type Action = {
  updateUsers: (users: State["users"]) => void;
  clearUsers: () => void;
};

const useSearchStore = create<State & Action>()(
  devtools((set) => ({
    users: null,
    updateUsers: (users) => set(() => ({ users: users })),
    clearUsers: () => set(() => ({ users: [] })),
  }))
);

export default useSearchStore;
