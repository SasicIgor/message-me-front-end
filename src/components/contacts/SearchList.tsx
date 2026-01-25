import useSearchStore from "@/store/useSearchStore";
import { useNavigate } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import { postReq } from "@/service/apiService";
import type { Chat } from "@/types/globalTypes";

const SearchList = () => {
  const { users: data, clearUsers, toggleIsSearching } = useSearchStore();
  const navigate = useNavigate();
  //create or find chat
  const handleClick = async (id: string) => {
    const chat = await postReq<Chat>("/chats/private", {
      memberId: id,
    });
    clearUsers();
    toggleIsSearching();
    navigate({ from: "/app/chat", to: `${chat.id}` });
  };
  return (
    <div className="p-2">
      {data &&
        data.map(({ username, id }) => {
          return (
            <button className="w-full" key={id} onClick={() => handleClick(id)}>
              <ContactCard username={username} />
            </button>
          );
        })}
    </div>
  );
};

export default SearchList;
