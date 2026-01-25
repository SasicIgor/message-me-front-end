import type useAuthStore from "@/store/useAuthStore";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type AuthContext = {
  authStore: typeof useAuthStore
};

export const Route = createRootRouteWithContext<AuthContext>()({
  component: () => <Outlet />,
});
