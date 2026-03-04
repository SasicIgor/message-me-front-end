import { useParams } from "@tanstack/react-router";
import useMessageQuery from "./useMessageQuery";
import MessageBubble from "./MessageBubble";
import useChatCache from "@/hooks/useChatCache";
import { useEffect, useRef } from "react";
import SpinnerComponent from "../global/SpinnerComponent";
import { useMsgCtx } from "@/store/context/MessageContext";

const ChatMessages = () => {
  const { chatId } = useParams({ from: "/_protected/app/chat/$chatId" });
  const { chatMessages, loadingMessages } = useMessageQuery(chatId);
  const { addMsgForEdit } = useMsgCtx();

  const { resetCounter } = useChatCache();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: "instant" });
  }, [chatMessages.length]);

  useEffect(() => {
    resetCounter(chatId);
  }, [chatId]);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-radial to-brand-blue-default from-brand-blue-darker">
      <div className="grow"></div>
      <div className="flex flex-col p-1 overflow-y-auto gap-1">
        {loadingMessages && <SpinnerComponent className="text-white" />}
        {!loadingMessages && !chatMessages.length && (
          <p className=" text-black bg-brand-accent-light m-auto border px-1 rounded">
            No messages yet. Be the first to say hi
          </p>
        )}
        {chatMessages.length > 0 &&
          chatMessages.map((item) => {
            return item.type === "date" ? (
              <span
                className="text-black bg-brand-accent-light m-auto border px-1 rounded"
                key={item.id}
              >
                {item.displayDate}
              </span>
            ) : (
              <div
                onDoubleClick={() => {
                  (addMsgForEdit(item.message), console.log("DOUBLE CLICK"));
                }}
                key={item.message.id}
              >
                <MessageBubble msg={item.message} />
              </div>
            );
          })}
        <div className="h-0" ref={scrollRef}></div>
      </div>
    </div>
  );
};
export default ChatMessages;
