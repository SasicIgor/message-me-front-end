import { useParams } from "@tanstack/react-router";
import useMessageQuery from "./useMessageQuery";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "./MessageBubble";

const ChatMessages = () => {
  const { chatId } = useParams({ from: "/app/chat/$chatId" });
  const { chatMessages } = useMessageQuery(chatId);

  return (
    <div className="flex-1 overflow-y-hidden p-2">
      <ScrollArea className="h-full w-full">
        {chatMessages.map((msg) => {
          return <MessageBubble key={msg.id} msg={msg} />;
        })}
      </ScrollArea>
    </div>
  );
};

export default ChatMessages;
