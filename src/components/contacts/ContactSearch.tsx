import useAppForm from "../form/useAppForm";
import { z } from "zod";
const searchSchema = z.object({
  search: z.string().min(3, "Type at least 3 charachters"),
});
const ContactSearch = () => {
  const form = useAppForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onChangeAsyncDebounceMs: 1500,
      onChangeAsync: searchSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="p-2"
    >
      <form.AppField
        listeners={{
          onChangeDebounceMs: 1500,
          onChange: () => {
            form.handleSubmit();
          },
        }}
        name="search"
        children={(field) => <field.SearchField placeholder="search" />}
      />
    </form>
  );
};

export default ContactSearch;
