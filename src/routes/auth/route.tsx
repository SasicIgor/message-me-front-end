import { createFileRoute, redirect } from "@tanstack/react-router";
import Auth from "@/pages/Auth";
import { z } from "zod";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    mode: z.enum(["login", "register"]).default("login"),
  }),
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (user) throw redirect({ to: "/app/chat" });
  },
  component: () => <Auth />,
});
