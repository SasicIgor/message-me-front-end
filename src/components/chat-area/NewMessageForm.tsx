import { SendHorizontal } from "lucide-react";
import useAppForm from "../form/useAppForm";
import useMessageQuery from "../contacts/useMessageQuery";
import { useParams } from "@tanstack/react-router";

const NewMessageForm = () => {
  const { chatId } = useParams({ from: "/app/chat/$chatId" });

  const { createMessage } = useMessageQuery(chatId);

  const form = useAppForm({
    defaultValues: {
      content: "",
    },
    onSubmit: async ({ value }) => {
      console.log("MESSeGING", value);
      const newMesg = await createMessage(value);
      form.reset();
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <div className="flex m-1 bg-blue-700 focus-within:bg-blue-800 rounded-md ">
          <form.AppField
            name="content"
            children={(field) => (
              <field.SearchField
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
