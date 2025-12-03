import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useContactQuery from "./useContactQuery";

const ContactList = () => {
  const { data } = useContactQuery();
  return (
    <div className="p-2">
      {data.map(({ memberId, memeberUsername, id, isGroup }) => {
        return (
          <Link to={`/app/chat/$chatId`} params={{ chatId: id }}>
            <ContactCard
              username={
                isGroup ? `Group chat ${id}` : (memeberUsername as string)
              }
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ContactList;
