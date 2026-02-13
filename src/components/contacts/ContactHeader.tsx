import useSearchStore from "@/store/useSearchStore";
import { Button } from "../ui/button";
import { MessageSquareDiff, Users } from "lucide-react";

const ContactHeader = () => {
  const { isSearching, isGroup, toggleIsSearching } = useSearchStore();

  return (
    <div className="w-full p-3 flex justify-between">
      <h2 className="text-2xl">
        {isSearching
          ? isGroup
            ? "Create group chat"
            : "Search private chats"
          : "Chats"}
      </h2>
      <div className="flex items-center justify-between">
        <Button
          className={`mr-2 p-2 rounded-xl bg-brand-blue-default hover:bg-brand-blue-darker ${isSearching && !isGroup && "bg-brand-blue-darker"}`}
          onClick={() => toggleIsSearching(false)}
        >
          <MessageSquareDiff className="text-white" />
        </Button>
        <Button
          className={`mr-2 p-2 rounded-xl bg-brand-blue-default hover:bg-brand-blue-darker ${isSearching && isGroup && "bg-brand-blue-darker"}`}
          onClick={() => toggleIsSearching(true)}
        >
          <Users className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ContactHeader;
