import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type User = {
  id: string;
  username: string;
  token: string;
};

type AuthConext = {
  user: User | null;
};

export const Route = createRootRouteWithContext<AuthConext>()({
  component: () => <Outlet />,
});
