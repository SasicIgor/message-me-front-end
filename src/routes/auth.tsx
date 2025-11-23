import { createFileRoute } from "@tanstack/react-router";
import Auth from "@/pages/auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Auth />;
}
