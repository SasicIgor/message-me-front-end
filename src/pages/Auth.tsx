import Input from "@/components/global/Input";

const Auth = () => {
  return (
    <div>
      <Input type="text" name="username" />
      <Input type="email" name="email" />
      <Input type="password" name="password" />
      <Input type="password" name="confirmedPassword" />
    </div>
  );
};

export default Auth;
