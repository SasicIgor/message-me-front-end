import useAuthStore from "@/store/useAuthStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  //if no user navigate to login, otherwise go to chat's
  beforeLoad: async () => {
    const user = useAuthStore.getState().user;
    console.log(user);
    if (!user) {
      throw redirect({ to: "/auth" });
    }
    throw redirect({ to: "/app/chat" });
  },
});
