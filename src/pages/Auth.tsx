import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card className="flex justify-center items-center w-full sm:w-4/5 md:w-3/5 lg:w-2/5 2xl:w-1/5 mx-4">
        <CardHeader className="w-4/5 flex justify-center items-center flex-col text-xl">
          <CardTitle>
            {isRegister ? "Join us today!" : "Glad to see you back!"}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegister
              ? "We want to improve the way people communicate!"
              : "If you are here again, that means we are doing something right!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          {isRegister ? <RegisterForm /> : <LoginForm />}
        </CardContent>
        <CardFooter>
          <p className="w-full">
            {message}
            <Link
              to="/auth"
              search={{ mode: isRegister ? "login" : "register" }}
              className="underline font-semibold"
            >
              {isRegister ? "Login here" : "Register here"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
