import { useParams } from "@tanstack/react-router";
import useMessageQuery from "./useMessageQuery";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

const ChatMessages = () => {
  const { chatId } = useParams({ from: "/_protected/app/chat/$chatId" });
  const { chatMessages } = useMessageQuery(chatId);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatMessages.length]);

  return (
    <div className="flex flex-col h-full overflow-y-auto" ref={scrollRef}>
      <div className="grow"></div>
      <div className="flex flex-col-reverse gap-1">
        {!chatMessages.length && (
          <p>No messages yet. Be the first, send something</p>
        )}
        {chatMessages.length > 0 &&
          chatMessages.map((msg) => {
            return <MessageBubble key={msg.id} msg={msg} />;
          })}
      </div>
    </div>
  );
};
export default ChatMessages;
