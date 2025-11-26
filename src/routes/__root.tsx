import type useAuthStore from "@/store/useAuthStore";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type AuthConext = {
  authStore: typeof useAuthStore
};

export const Route = createRootRouteWithContext<AuthConext>()({
  component: () => <Outlet />,
});
