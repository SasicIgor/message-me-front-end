import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import NewMessageForm from "./NewMessageForm";
import ChatMessages from "./ChatMessages";
import { MsgCtxProvider } from "@/store/context/MessageContext";
import useActiveChatStore from "@/store/useActiveChatStore";

const ChatArea = () => {
  const chat = useActiveChatStore((state) => state.chat);
  return (
    <MsgCtxProvider>
      <div className="h-screen flex flex-col">
        {/* USER PROFILE INFO */}
        <div className="flex justify-start aling-center p-2 bg-brand-blue-light border-b">
          <Avatar className="m-1">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <div>
            <p className="text-sm">{chat?.memberUsername}</p>
            <p className="text-xs">last online</p>
          </div>
        </div>
        {/* CHAT MESSAGES */}
        <ChatMessages />
        {/* NEW MESSAGE FIELD */}
        <NewMessageForm />
      </div>
    </MsgCtxProvider>
  );
};

export default ChatArea;
