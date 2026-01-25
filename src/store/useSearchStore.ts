import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./useAuthStore";

type State = {
  users: User[] | null;
  isSearching: boolean;
};

type Action = {
  updateUsers: (users: State["users"]) => void;
  toggleIsSearching: () => void;
  clearUsers: () => void;
};

const useSearchStore = create<State & Action>()(
  devtools(
    (set) => ({
      users: null,
      isSearching: false,
      toggleIsSearching: () =>
        set((state) => ({ isSearching: !state.isSearching })),
      updateUsers: (users) => set(() => ({ users: users, isSearching: true })),
      clearUsers: () => set(() => ({ users: [] })),
    }),
    { name: "SearchStore" },
  ),
);

export default useSearchStore;
