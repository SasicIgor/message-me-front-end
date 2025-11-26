import { loginSchema } from "@/validations/authValidations";
import useAppForm from "./useAppForm";
import { createPost } from "@/service/apiService";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";
import type { AuthResponse } from "@/types/responseTypes";

const LoginForm = () => {
  const navigate = useNavigate();
  const updateUser = useAuthStore((state) => state.updateUser);

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: { onBlur: loginSchema, onChange: loginSchema },
    onSubmit: async ({ value }) => {
      const data = await createPost<AuthResponse>("/auth/user/login", value);

      updateUser({ ...data.user, token: data.token });
      navigate({ to: "/" });
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
        <div className="pb-4">
          <form.AppField
            name="username"
            children={(field) => <field.TextField label="Username" />}
          />
        </div>
        <div className="pb-4">
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField type="password" label="Password" />
            )}
          ></form.AppField>
        </div>
        <div className="w-full">
          <form.SubscribeButton label="Log in" />
        </div>
      </form.AppForm>
    </form>
  );
};

export default LoginForm;
