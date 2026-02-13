import { Link, useParams } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useChatQuery from "@/components/contacts/useChatQuery";
import useActiveChatStore from "@/store/useActiveChatStore";
import SpinnerComponent from "../global/SpinnerComponent";
import { useEffect } from "react";
import { useSocketCtx } from "@/store/context/socket/context";

const ContactList = () => {
  const { chatData, isFetching } = useChatQuery();
  const { toggleActiveChat, chat } = useActiveChatStore();
  const { chatId: currentChat } = useParams({
    strict: false,
  });

  const { joinRooms } = useSocketCtx();

  useEffect(() => {
    if (!chatData || !chatData.length) return;
    const chatIds = chatData.map((chat) => chat.id);
    joinRooms(chatIds);
  }, [chatData]);

  if (isFetching) {
    return <SpinnerComponent />;
  }

  if (!chatData) {
    return <h3>Ops, something went wrong. Please try again later.</h3>;
  }

  return (
    <div className="p-2">
      {!chatData.length && "No contact to display. Connect with other users"}
      {chatData.map(({ id, isGroup, memberUsername, name, memberId }) => {
        const chatName = name ? name : "Group chat";
        const isActiveChat = currentChat === id;
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
              isActive={isActiveChat}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ContactList;
