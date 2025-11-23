import { createFileRoute } from "@tanstack/react-router";
import Auth from "@/pages/auth";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    mode: z.enum(["login", "register"]).default("login"),
  }),
  component: () => <Auth />,
});
