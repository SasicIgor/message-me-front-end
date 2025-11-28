import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/chat/$chatId"!</div>;
}
