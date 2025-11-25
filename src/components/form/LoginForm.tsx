import { loginSchema } from "@/validations/authValidations";
import useAppForm from "./useAppForm";

const LoginForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: { onBlur: loginSchema, onChange: loginSchema },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value));
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
