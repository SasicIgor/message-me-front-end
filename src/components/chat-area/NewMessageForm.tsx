import { SendHorizontal } from "lucide-react";
import useAppForm from "../form/useAppForm";

const NewMessageForm = () => {
  const form = useAppForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form.AppForm>
      <div className="flex m-1 bg-blue-700 focus-within:bg-blue-800 rounded-md ">
        <form.AppField
          name="message"
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
  );
};

export default NewMessageForm;
