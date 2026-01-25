import { registrationSchema } from "@/validations/authValidations";
import useAppForm from "./useAppForm";
import { useNavigate } from "@tanstack/react-router";
import { postReq } from "@/service/apiService";
import useAuthStore from "@/store/useAuthStore";
import type { AuthResponse, BaseResponse } from "@/types/responseTypes";

const RegisterForm = () => {
  const navigate = useNavigate();
  const setUserState = useAuthStore((state) => state.setUserState);

  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validators: {
      onChangeAsyncDebounceMs: 1500,
      onChangeAsync: registrationSchema,
    },

    onSubmit: async ({ value }) => {
      const data = await postReq<AuthResponse>(
        "/auth/register",
        value
      );

      setUserState({ ...data.user }, data.token);
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
            children={(field) => <field.TextField label="username" />}
          />
        </div>
        <div className="pb-4">
          <form.AppField
            name="email"
            children={(field) => <field.TextField label="email" />}
          />
        </div>
        <div className="pb-4">
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField type="password" label="password" />
            )}
          />
        </div>
        <div className="pb-4">
          <form.AppField
            name="confirmedPassword"
            children={(field) => (
              <field.TextField type="password" label="Confirm Password" />
            )}
          />
        </div>
        <form.SubscribeButton label="Register" />
      </form.AppForm>
    </form>
  );
};

export default RegisterForm;
