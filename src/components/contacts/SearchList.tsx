import useSearchStore from "@/store/useSearchStore";
import { useNavigate } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import { postReq } from "@/service/apiService";
import type { Chat } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/store/useAuthStore";
import { queryKeys } from "@/hooks/global-query/constants";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import useActiveChatStore from "@/store/useActiveChatStore";
import { XCircleIcon } from "lucide-react";

const SearchList = () => {
  const { clearUsers, toggleIsSearching, updateUsers, isGroup, users } =
    useSearchStore();
  const { toggleActiveChat } = useActiveChatStore();
  const { data } = useQuery<User[]>({
    queryKey: [queryKeys.searchedUsers],
    enabled: false,
  });

  const navigate = useNavigate();
  //create or find chat

  const handleSubmitGroup = async () => {
    const memberIds = users.map((u) => u.id);
    const chat = await postReq<Chat>("/chats/group", {
      memberIds,
      name: "new group name",
    });
    toggleActiveChat(chat);
    navigate({ from: "/app/chat", to: `${chat.id}` });
    clearUsers();
    toggleIsSearching();
  };

  const handleSubmitPrivate = async ({ username, id }: User) => {
    const chat = await postReq<Chat>("/chats/private", {
      memberId: id,
    });
    toggleActiveChat(chat);
    navigate({ from: "/app/chat", to: `${chat.id}` });
    clearUsers();
    toggleIsSearching();
  };

  const handleClick = async (user: User) => {
    updateUsers(user);
  };

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="flex flex-wrap">
        {users &&
          users.map((u, i) => {
            return (
              <button
                className="h-fit p-1 m-1 flex flex-col items-center cursor-pointer shrink-0"
                onClick={() => updateUsers(u)}
                key={i}
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <XCircleIcon
                    className="absolute -top-1 -right-1 text-black rounded"
                    fill="white"
                    size={16}
                  />
                </div>
                <h2 className="text-xs">{u.username}</h2>
              </button>
            );
          })}
      </div>
      {isGroup && users.length > 0 && (
        <div className="w-full my-2 flex-center flex-col">
          <Input type="text" placeholder="group name" className="m-2" />
          <button
            className="p-2 rounded-xl border bg-brand-accent-strong"
            onClick={() => handleSubmitGroup()}
          >
            Create group
          </button>
        </div>
      )}

      <div className="">
        {data &&
          data.map((user) => {
            const { id, username } = user;
            const isSelected = users.find((u) => u.id === id);
            if (isSelected) return;
            return (
              <button
                className="w-full"
                key={id}
                onClick={() => {
                  isGroup ? handleClick(user) : handleSubmitPrivate(user);
                }}
              >
                <ContactCard username={username} />
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SearchList;
