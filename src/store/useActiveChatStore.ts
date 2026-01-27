import type { Chat } from "@/types/globalTypes";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type State = {
  chat: Chat | null;
};

type Action = {
  toggleActiveChat: (chat?: Chat) => void;
};

const useActiveChatStore = create<State & Action>()(
  devtools(
    persist(
      (set, get) => ({
        chat: null,
        toggleActiveChat: (chat) =>
          set(() => (chat ? { chat } : { chat: null })),
      }),
      {
        name: "activeChat",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ chat: state.chat }),
      },
    ),
  ),
);

export default useActiveChatStore;
