import { Link, useParams } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useChatQuery from "@/components/contacts/useChatQuery";
import useActiveChatStore from "@/store/useActiveChatStore";
import SpinnerComponent from "../global/SpinnerComponent";

const ContactList = () => {
  const { chatData, isFetching } = useChatQuery();
  const { toggleActiveChat } = useActiveChatStore();
  const { chatId: currentChat } = useParams({
    strict: false,
  });

  if (isFetching) {
    return <SpinnerComponent />;
  }

  if (!chatData) {
    return <h3>Ops, something went wrong. Please try again later.</h3>;
  }

  return (
    <div className="p-2">
      {!chatData.length && "No contact to display. Connect with other users"}
      {chatData.map((singleChat) => {
        const {
          id,
          isGroup,
          memberUsername,
          name,
          unreadCount,
          lastMessageSnippet,
        } = singleChat;
        const chatName = name ? name : "Group chat";
        const isActiveChat = currentChat === id;
        return (
          <Link
            key={id}
            to={`/app/chat/$chatId`}
            params={{ chatId: id }}
            onClick={() => {
              toggleActiveChat(singleChat);
            }}
          >
            <ContactCard
              username={isGroup ? chatName : (memberUsername as string)}
              isActive={isActiveChat}
              lastMessageSnippet={lastMessageSnippet}
              badge={unreadCount}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ContactList;
