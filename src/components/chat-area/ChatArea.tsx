import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import NewMessageForm from "./NewMessageForm";
import ChatMessages from "./ChatMessages";
import { MsgCtxProvider } from "@/store/context/MessageContext";
import useActiveChatStore from "@/store/useActiveChatStore";
import { redirect } from "@tanstack/react-router";
import useChatRoom from "@/store/context/socket/hooks/useChatEvents";
import useMessageEvent from "@/store/context/socket/hooks/useMessageEvent";

const ChatArea = () => {
  const chat = useActiveChatStore((state) => state.chat);

  if (!chat) throw redirect({ to: "/app/chat" });
  useChatRoom(chat.id);
  useMessageEvent(chat.id);

  return (
    <>
      <MsgCtxProvider>
        <div className="h-screen flex flex-col">
          {/* USER PROFILE INFO */}
          <div className="flex justify-start aling-center p-2 bg-brand-blue-light border-b">
            <Avatar className="m-1">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div>
              <p className="text-sm">
                {chat.isGroup ? chat.name : chat.memberUsername}
              </p>
              <p className="text-xs">last online</p>
            </div>
          </div>
          {/* CHAT MESSAGES */}
          <ChatMessages />
          {/* NEW MESSAGE FIELD */}
          <NewMessageForm />
        </div>
      </MsgCtxProvider>
    </>
  );
};

export default ChatArea;
