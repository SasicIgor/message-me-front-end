import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { Route } from "@/routes/auth";
import { Link } from "@tanstack/react-router";

const Auth = () => {
  const { mode } = Route.useSearch();
  const isRegister = mode === "register" ? true : false;

  const message = isRegister
    ? "Already a member? "
    : "Don't have an account yet? ";

  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <form className="w-2/5 h-2/5">
        <Input type="text" name="username" />
        {isRegister && <Input type="email" name="email" />}
        <Input type="password" name="password" />
        {isRegister && <Input type="password" name="confirmPassword" />}
        <div className="flex justify-between items-center">
          <Button />
          <p className="w-full">
            {message}
            <Link
              to="/auth"
              search={{ mode: isRegister ? "login" : "register" }}
              className="underline"
            >
              {isRegister ? "Login here" : "Registere here"}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Auth;
