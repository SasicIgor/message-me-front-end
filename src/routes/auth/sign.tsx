import { createFileRoute } from "@tanstack/react-router";
import Auth from "@/pages/Auth";
import { z } from "zod";

export const Route = createFileRoute("/auth/sign")({
  validateSearch: z.object({
    mode: z.enum(["login", "register"]).default("login"),
  }),
  component: () => <Auth />,
});
