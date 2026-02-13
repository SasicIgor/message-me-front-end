import useAppForm from "@/components/form/useAppForm";

import useSearchStore from "@/store/useSearchStore";
import useChatQuery from "../useChatQuery";

const GroupChatForm = () => {
  const { users } = useSearchStore();
  const { createChat } = useChatQuery();

  const form = useAppForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      if (value.name !== "") {
        const memberIds = users.map((u) => u.id);
        createChat({ name: value.name, memberIds, type: "group" });
      }
    },
  });

  return (
    <form
      className="w-full my-2 flex-center flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Group name" />}
        />
        <form.SubscribeButton label="Create group" className="mt-2" />
      </form.AppForm>
    </form>
  );
};

export default GroupChatForm;
