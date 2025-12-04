import useSearchStore from "@/store/useSearchStore";
import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";

const SearchList = () => {
  const { users: data } = useSearchStore();

  return (
    <div className="p-2">
      {data &&
        data.map(({ username, id }) => {
          return (
            <Link to={`/app/chat/$chatId`} params={{ chatId: id }} key={id}>
              <ContactCard username={username} />
            </Link>
          );
        })}
    </div>
  );
};

export default SearchList;
