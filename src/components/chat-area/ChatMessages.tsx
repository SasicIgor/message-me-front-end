import { useParams } from "@tanstack/react-router";
import useMessageQuery from "./useMessageQuery";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import { formatDateForDisplay, formatMsgDate } from "@/utils/formatMsgDate";

const ChatMessages = () => {
  const { chatId } = useParams({ from: "/_protected/app/chat/$chatId" });
  const { chatMessages } = useMessageQuery(chatId);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatMessages.length]);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto bg-radial to-brand-blue-default from-brand-blue-darker"
      ref={scrollRef}
    >
      <div className="grow"></div>
      <div className="flex flex-col-reverse p-1 overflow-y-auto gap-1">
        {!chatMessages.length && (
          <p>No messages yet. Be the first, send something</p>
        )}
        {chatMessages.length > 0 &&
          chatMessages.map((msg, i) => {
            const isLastMessage = i === chatMessages.length - 1;
            let isDifferentDate = false;

            if (!isLastMessage) {
              const { msgDate: currentMsgDate } = formatMsgDate(
                chatMessages[i].createdAt,
              );
              const { msgDate: nextMsgDate } = formatMsgDate(
                chatMessages[i + 1].createdAt,
              );
              isDifferentDate = currentMsgDate !== nextMsgDate;
              console.log(isDifferentDate);
            }
            const displayDate = formatDateForDisplay(msg.createdAt);
            return (
              <>
                <MessageBubble key={msg.id} msg={msg} />
                {(isDifferentDate || isLastMessage) && (
                  <span className="text-black bg-brand-accent-light m-auto border px-1 rounded">
                    {displayDate}
                  </span>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};
export default ChatMessages;
