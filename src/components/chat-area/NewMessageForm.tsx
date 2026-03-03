import { SendHorizontal } from "lucide-react";
import useAppForm from "../form/useAppForm";
import useMessageQuery from "./useMessageQuery";
import { useParams } from "@tanstack/react-router";
import { useMsgCtx } from "@/store/context/MessageContext";
import { useEffect, useRef } from "react";

const NewMessageForm = () => {
  const { chatId } = useParams({ from: "/_protected/app/chat/$chatId" });
  const inputRef = useRef<HTMLInputElement>(null);

  const { createOptimisticMessage, updateMessage } = useMessageQuery(chatId);

  const { message, removeMsgForEdit } = useMsgCtx();
  const isEditingForm = message !== null;

  useEffect(() => {
    removeMsgForEdit();
    form.reset();
    inputRef.current?.focus();
  }, [chatId]);

  const form = useAppForm({
    defaultValues: {
      content: isEditingForm ? message.content : "",
    },
    onSubmit: async ({ value }) => {
      isEditingForm
        ? await updateMessage({ data: value, messageId: message.id })
        : await createOptimisticMessage(value);
      form.reset();
      removeMsgForEdit();
      inputRef.current?.focus();
    },
  });

  return (
    <form
      className="bg-brand-blue-default"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className="flex m-1 opacity-90 bg-brand-blue-light focus-within:opacity-100 rounded-md ">
          <form.AppField
            name="content"
            children={(field) => (
              <field.SearchField
                ref={inputRef}
                key={chatId}
                placeholder="type a message"
                className="border-none focus:outline-none focus-visible:ring-0"
              />
            )}
          />
          <form.SubscribeButton
            className="p-0 m-0 rounded-4xl bg-transparent hover:bg-transparent w-auto"
            label={<SendHorizontal className="rounded" />}
          />
        </div>
      </form.AppForm>
    </form>
  );
};

export default NewMessageForm;
