import ContactSidebar from "@/components/contacts/ContactSidebar";
import useScreenCheck from "@/hooks/useScreenCheck";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/app/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isMobile } = useScreenCheck();
  const { chatId } = useParams({ strict: false });
  //check if its mobile, if so, i want to display only one contacts or chat
  const isChatActive = isMobile === true && chatId !== undefined;
  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`col-span-12 md:col-span-4 xl:col-span-3 ${isChatActive ? "hidden" : "block"} md:block`}
      >
        <ContactSidebar />
      </div>
      {/* MAIN */}
      <div
        className={`bg-blue-500 col-span-12 md:col-span-8 xl:col-span-9 ${isChatActive ? "block" : "hidden"} md:block`}
      >
        <Outlet />
      </div>
    </>
  );
}
