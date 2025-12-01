import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  //if no user navigate to login, otherwise go to chat's
  beforeLoad: async ({ context }) => {
    const user = context.authStore.getState().user;
    if (!user) {
      throw redirect({ to: "/auth" });
    }
    redirect({ to: "/app/chat" });
  },
});
