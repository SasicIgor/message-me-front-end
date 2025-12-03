import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "./MessageBubble";

const messages = [
  {
    id: "1",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:24",
    content: "Some content",
  },
];

const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-hidden p-2">
      <ScrollArea className="h-full w-full">
        {messages.map((msg) => {
          return <MessageBubble msg={msg} />;
        })}
      </ScrollArea>
    </div>
  );
};

export default ChatMessages;
