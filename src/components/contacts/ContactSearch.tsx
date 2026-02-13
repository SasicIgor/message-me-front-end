import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAppForm from "../form/useAppForm";
import { z } from "zod";
import { getAllReq } from "@/service/apiService";
import type { User } from "@/store/useAuthStore";
import { queryKeys } from "@/hooks/global-query/constants";
import { useEffect } from "react";
import useSearchStore from "@/store/useSearchStore";

const searchSchema = z.object({
  search: z.string().min(3, "Type at least 3 charachters"),
});
const ContactSearch = () => {
  const queryClient = useQueryClient();
  const { isSearching, isGroup } = useSearchStore();
  const { mutate } = useMutation({
    mutationFn: (value: string) => getAllReq<User[]>(`/user/${value}`),
    onSuccess: (data) => {
      queryClient.setQueryData([queryKeys.searchedUsers], data);
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

  useEffect(() => {
    form.reset();
  }, [form, isSearching, isGroup]);

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
