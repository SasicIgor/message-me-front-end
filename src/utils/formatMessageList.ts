import type { Message } from "@/types/globalTypes";
import { formatDateForDisplay } from "./formatMsgDate";

type MsgData = {
  type: "msg";
  message: Message;
};
type DateData = {
  type: "date";
  id: string;
  displayDate: string;
};

export type MsgListReturn = Array<MsgData | DateData>;

export const formatMessageList = (msgs: Message[]): MsgListReturn => {
  const data: MsgListReturn = [];
  let latestDate = "";

  msgs.forEach((msg) => {
    const currentDate = formatDateForDisplay(msg.createdAt);
    if (latestDate !== currentDate) {
      data.push({
        displayDate: currentDate,
        type: "date",
        id: `date-${currentDate}`,
      });
      latestDate = currentDate;
    }
    data.push({ type: "msg", message: msg });
  });
  console.log(data);
  return data;
};
