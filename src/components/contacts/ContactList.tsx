import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useContactQuery from "./useContactQuery";
const ContactList = () => {
  const { chatData } = useContactQuery();
  return (
    <div className="p-2">
      {!chatData.length && "No contact to display. Connect with other users"}
      {chatData.map(({ id, isGroup, memberUsername, name }) => {
        const chatName = name ? name : "Group chat";
        return (
          <Link
            key={id}
            to={`/app/chat/$chatId`}
            params={{ chatId: id }}
            onClick={() => {}}
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
