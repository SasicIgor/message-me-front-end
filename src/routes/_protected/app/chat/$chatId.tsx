import ChatArea from "@/components/chat-area/ChatArea";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/app/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatArea />;
}
