import { useMsgCtx } from "@/store/context/MessageContext";
import useAuthStore from "@/store/useAuthStore";
import type { Message } from "@/types/globalTypes";

const baseArrow = `after:content-[''] 
  after:absolute 
  after:z-0
  after:border-t-16 
  after:border-l-16
  after:border-b-16
  after:border-transparent
  after:border-l-white
  after:w-0 
  after:h-0 
  after:rotate-90
  after:-top-1`;

const rightArrow = `mr-2 
  after:right-2`;

const leftArrow = `ml-2 
  after:left-2`;

const MessageBubble = ({ msg }: { msg: Message }) => {
  const { addMsgForEdit } = useMsgCtx();
  const userId = useAuthStore((state) => state.user?.id);
  return (
    <div
      onClick={() => addMsgForEdit(msg)}
      className={`relative flex flex-col justify-center ${msg.senderId === userId ? "items-end" : "items-start"}`}
    >
      <div
        className={`flex mt-1 rounded max-w-11/12 bg-white ${baseArrow} ${msg.senderId === userId ? rightArrow : leftArrow}`}
      >
        <div className="p-2 text-sm z-1">{msg.content}</div>
        <div className="flex items-end p-1 text-xs">{msg.createdAt}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
