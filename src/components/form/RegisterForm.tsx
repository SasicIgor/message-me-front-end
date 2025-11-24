import useAppForm from "./useAppForm";

const RegisterForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });
  return (
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
  );
};

export default RegisterForm;
