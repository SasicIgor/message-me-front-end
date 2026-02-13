import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./useAuthStore";
import { client } from "@/react-query/queryClient";
import { queryKeys } from "@/hooks/global-query/constants";

type State = {
  //users represent the list of users stored for group chat
  //it should reset on group creation
  users: User[];
  //is used to trigger cleanup of the state and cache as well as ui display
  isSearching: boolean;
  //keeping track if user is making a group chat or not, rendering different way
  isGroup: boolean;
};

type Action = {
  //adding/removing users that would be involved in group chat
  updateUsers: (user: User) => void;
  //either closes the searching and clearing state or changing creating from private to group
  toggleIsSearching: (group?: boolean) => void;
  //clear users from store and cache
  clearUsers: () => void;
};

const useSearchStore = create<State & Action>()(
  devtools(
    (set, get) => ({
      users: [],
      isSearching: false,
      isGroup: false,
      toggleIsSearching: (group) => {
        //group prop passed to function represents the type of chat that user wants
        //either that chat is group or not

        //if user presses the same button twice, we want to close searching
        //otherwise if he pressed the different button we still stay in search mode
        //but we clear users since we dont need users for private chat
        const shouldClose = get().isGroup === group || group === undefined;
        set((state) => ({
          isSearching: shouldClose ? !state.isSearching : state.isSearching,
          isGroup: group ? group : false,
        }));
        if (!get().isSearching || group === false) get().clearUsers();
      },
      updateUsers: (user) => {
        set((state) => {
          const isSelected = state.users.find((u) => u.id == user.id);
          return {
            users: isSelected
              ? state.users.filter((u) => u.id !== user.id)
              : [...state.users, user],
            isSearching: true,
          };
        });
      },

      //we want to clear users and query cache if user is not searching anymore
      clearUsers: () => {
        client.removeQueries({ queryKey: [queryKeys.searchedUsers] });
        set(() => ({ users: [] }));
      },
    }),
    { name: "SearchStore" },
  ),
);

export default useSearchStore;
