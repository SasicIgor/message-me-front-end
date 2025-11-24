import useAppForm from "./useAppForm";

const LoginForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
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
          children={(field) => <field.TextField type="password" label="Password" />}
        ></form.AppField>
      </div>
      <div className="w-full">
        <form.SubscribeButton label="Log in" />
      </div>
    </form.AppForm>
  );
};

export default LoginForm;
