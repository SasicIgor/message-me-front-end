import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useContactQuery from "./useContactQuery";
import useActiveChatStore from "@/store/useActiveChatStore";
const ContactList = () => {
  const { chatData } = useContactQuery();
  const { toggleActiveChat } = useActiveChatStore();
  return (
    <div className="p-2">
      {!chatData.length && "No contact to display. Connect with other users"}
      {chatData.map(({ id, isGroup, memberUsername, name, memberId }) => {
        const chatName = name ? name : "Group chat";
        return (
          <Link
            key={id}
            to={`/app/chat/$chatId`}
            params={{ chatId: id }}
            onClick={() => {
              toggleActiveChat({ id, isGroup, memberUsername, name, memberId });
            }}
          >
            <ContactCard
              username={isGroup ? chatName : (memberUsername as string)}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ContactList;
