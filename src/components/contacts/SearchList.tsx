import useSearchStore from "@/store/useSearchStore";
import { useNavigate } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import { createPostReq } from "@/service/apiService";
import type { BaseResponse, Chat } from "@/types/responseTypes";

const SearchList = () => {
  const { users: data } = useSearchStore();
  const navigate = useNavigate();
  //create or find chat
  const handleClick = async (id: string) => {
    const chat = await createPostReq<BaseResponse<Chat>>("/chats/private", {
      memberId: id,
    });
    navigate({ from: "/app/chat", to: `${chat.data[0].id}` });
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
