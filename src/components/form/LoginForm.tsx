import { loginSchema } from "@/validations/authValidations";
import useAppForm from "./useAppForm";
import { createPostReq } from "@/service/apiService";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";
import type { AuthResponse, BaseResponse } from "@/types/responseTypes";
import { setAccessCookie } from "@/utils/cookie";

const LoginForm = () => {
  const navigate = useNavigate();
  const updateUser = useAuthStore((state) => state.updateUser);

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChangeAsyncDebounceMs: 1500,
      onChangeAsync: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const {data} = await createPostReq<BaseResponse<AuthResponse>>(
        "/auth/user/login",
        value
      );

      updateUser({ ...data[0].user });
      setAccessCookie(data[0].token);
      navigate({ to: "/app/chat" });
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
