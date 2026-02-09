import { MessageSquareDiff } from "lucide-react";
import { Users } from "lucide-react";
import ContactList from "./ContactList";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import ContactSearch from "./ContactSearch";
import SearchList from "./SearchList";
import useSearchStore from "@/store/useSearchStore";

const ContactSidebar = () => {
  const { isSearching, toggleIsSearching } = useSearchStore();
  return (
    <div className="h-screen bg-brand-blue-light border-r">
      {/* CONTACT HEADER */}
      <div className="w-full p-3 flex justify-between">
        <h2 className="text-2xl">Chats</h2>
        <div className="flex items-center justify-between">
          <Button
            className="mr-2 bg-blue-400 hover:bg-blue-500"
            onClick={() => toggleIsSearching()}
          >
            <MessageSquareDiff className="w-full h-full" />
          </Button>
          <Button
            className="mr-2 bg-blue-400 hover:bg-brand-blue-default"
            // onClick={() => toggle()}
          >
            <Users />
          </Button>
        </div>
      </div>
      {isSearching && <ContactSearch />}

      {/* CONTACT CONTENT */}
      <ScrollArea className="h-full w-auto">
        {isSearching ? <SearchList /> : <ContactList />}
      </ScrollArea>
    </div>
  );
};

export default ContactSidebar;
