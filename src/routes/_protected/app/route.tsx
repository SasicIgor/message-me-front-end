import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-12 gap-2 h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}
