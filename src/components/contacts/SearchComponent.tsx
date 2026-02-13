import useSearchStore from "@/store/useSearchStore";
import {
  GroupChatForm,
  GroupChatMembers,
  SearchedUsersList,
} from "@/components/contacts/search";

const SearchList = () => {
  const { isGroup, users } = useSearchStore();

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <GroupChatMembers />
      {isGroup && users.length > 0 && <GroupChatForm />}
      <SearchedUsersList />
    </div>
  );
};

export default SearchList;
