import type { Message } from "@/types/globalTypes";
import { createContext, useContext, useState } from "react";

type MsgCtx = {
  message: Message | null;
  addMsgForEdit: (data: Message) => void;
  removeMsgForEdit: () => void;
};

const initialState = {
  message: null,
  addMsgForEdit: () => {},
  removeMsgForEdit: () => {},
};
const MessageContext = createContext<MsgCtx>(initialState);

export const MsgCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [msgForEdit, setMsgForEdit] = useState<Message | null>(null);
  const addMsgForEdit = (data: Message) => {
    setMsgForEdit(data);
  };
  const removeMsgForEdit = () => {
    setMsgForEdit(null);
  };
  return (
    <MessageContext.Provider
      value={{ message: msgForEdit, addMsgForEdit, removeMsgForEdit }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMsgCtx = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("Something went wrong with context");
  return ctx;
};
