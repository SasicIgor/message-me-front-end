import { queryKeys } from "@/hooks/global-query/constants";
import type { User } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import ContactCard from "../ContactCard";
import useSearchStore from "@/store/useSearchStore";
import useChatQuery from "../useChatQuery";

const SearchedUsersList = () => {
  const { updateUsers, isGroup, users } = useSearchStore();
  const { createChat } = useChatQuery();

  const { data, isFetching } = useQuery<User[]>({
    queryKey: [queryKeys.searchedUsers],
    enabled: false,
  });

  const handleClick = async (user: User) => {
    updateUsers(user);
  };

  return (
    <div>
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
                isGroup
                  ? handleClick(user)
                  : createChat({ memberId: user.id, type: "private" });
              }}
            >
              <ContactCard username={username} />
            </button>
          );
        })}
    </div>
  );
};

export default SearchedUsersList;
