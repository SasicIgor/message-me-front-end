import { MessageSquareDiff } from "lucide-react";
import { Users } from "lucide-react";
import ContactList from "./ContactList";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import ContactSearch from "./ContactSearch";
import useToggle from "@/hooks/useToggle";
import SearchList from "./SearchList";

const ContactSidebar = () => {
  const [value, toggle] = useToggle(false);
  return (
    <div className="h-screen">
      {/* CONTACT HEADER */}
      <div className="w-full p-3 flex justify-between">
        <h2 className="text-2xl">Chats</h2>
        <div className="flex items-center justify-between">
          <Button
            className="mr-2 bg-blue-400 hover:bg-blue-500"
            onClick={() => toggle()}
          >
            <MessageSquareDiff className="w-full h-full" />
          </Button>
          <Button
            className="mr-2 bg-blue-400 hover:bg-blue-500"
            // onClick={() => toggle()}
          >
            <Users />
          </Button>
        </div>
      </div>
      <div className={`${value ? "block" : "hidden"}`}>
        <ContactSearch></ContactSearch>
      </div>
      {/* CONTACT CONTENT */}
      <ScrollArea className="h-full w-auto">
        {value ? <SearchList /> : <ContactList />}
      </ScrollArea>
    </div>
  );
};

export default ContactSidebar;
