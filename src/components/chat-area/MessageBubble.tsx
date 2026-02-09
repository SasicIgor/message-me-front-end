import { useMsgCtx } from "@/store/context/MessageContext";
import useAuthStore from "@/store/useAuthStore";
import type { Message } from "@/types/globalTypes";
import { formatMsgDate } from "@/utils/formatMsgDate";

//user is the one who is currently log in the app
const userClass = "rounded-2xl rounded-br-none bg-white";
//member is the person who is he sending messages to
const memberClass = "rounded-2xl rounded-bl-none bg-brand-blue-lightest";

const MessageBubble = ({ msg }: { msg: Message }) => {
  const { addMsgForEdit } = useMsgCtx();
  const { time } = formatMsgDate(msg.createdAt);
  const userId = useAuthStore((state) => state.user?.id);
  return (
    <div
      onDoubleClick={() => addMsgForEdit(msg)}
      className={`flex flex-col justify-center ${msg.senderId === userId ? "items-end" : "items-start"}`}
    >
      <div
        className={`flex flex-col m-1 min-w-1/12 max-w-11/12 ${
          msg.senderId === userId ? userClass : memberClass
        }`}
      >
        <div className="px-3 py-1 text-sm wrap-break-word">{msg.content}</div>
        <div
          className={`flex ${msg.senderId === userId ? "justify-end pr-1" : "justify-start pl-1"}`}
        >
          <div className={`flex items-end text-[10px]`}>{time}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
