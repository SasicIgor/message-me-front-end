import { MessageSquareDiff } from "lucide-react";
import { Users } from "lucide-react";
import ContactList from "./ContactList";
import { ScrollArea } from "../ui/scroll-area";

const ContactSidebar = () => {
  return (
    <div className="h-screen">
      {/* CONTACT HEADER */}
      <div className="w-full p-3 flex justify-between">
        <h2 className="text-2xl">Chats</h2>
        <div className="flex items-center justify-between">
          <MessageSquareDiff className="mr-2" />
          <Users />
        </div>
      </div>
      {/* CONTACT CONTENT */}
      <ScrollArea className="h-full w-auto">
        <ContactList />
      </ScrollArea>
    </div>
  );
};

export default ContactSidebar;
