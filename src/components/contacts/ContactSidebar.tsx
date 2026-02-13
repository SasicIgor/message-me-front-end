import ContactList from "./ContactList";
import { ScrollArea } from "../ui/scroll-area";
import ContactSearch from "./search/ContactSearch";
import SearchComponent from "./SearchComponent";
import useSearchStore from "@/store/useSearchStore";
import ContactHeader from "./ContactHeader";

const ContactSidebar = () => {
  const { isSearching } = useSearchStore();

  return (
    <div className="h-screen bg-brand-blue-light border-r flex flex-col">
      {/* CONTACT HEADER */}
      <ContactHeader />
      {isSearching && <ContactSearch />}
      {/* CONTACT CONTENT */}
      <ScrollArea className="w-auto h-11/12 flex-auto">
        {isSearching ? <SearchComponent /> : <ContactList />}
      </ScrollArea>
    </div>
  );
};

export default ContactSidebar;
