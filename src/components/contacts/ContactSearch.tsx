import { useMutation } from "@tanstack/react-query";
import useAppForm from "../form/useAppForm";
import { z } from "zod";
import { fetchAllReq } from "@/service/apiService";
import useSearchStore from "@/store/useSearchStore";
import type { User } from "@/store/useAuthStore";

const searchSchema = z.object({
  search: z.string().min(3, "Type at least 3 charachters"),
});
const ContactSearch = () => {
  const { updateUsers, clearUsers } = useSearchStore();
  const { mutate } = useMutation({
    mutationFn: (value: string) => fetchAllReq<User>(`/auth/user/${value}`),
    onSuccess: (data) => {
      updateUsers(data);
    },
  });
  const form = useAppForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onChangeAsyncDebounceMs: 1500,
      onChangeAsync: searchSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.search.length > 2) mutate(value.search);
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
            clearUsers();
          },
        }}
        name="search"
        children={(field) => <field.SearchField placeholder="search" />}
      />
    </form>
  );
};

export default ContactSearch;
