import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";
import useContactQuery from "./useContactQuery";
const ContactList = () => {
  const { contactData } = useContactQuery();
  console.log(contactData);
  return (
    <div className="p-2">
      {!contactData.length &&
        "No contact to display. Connect with other users"}
      {/* {contactData.map(({ memberId, memeberUsername, id, isGroup }) => {
        return (
          <Link to={`/app/chat/$chatId`} params={{ chatId: id }}>
            <ContactCard
              username={
                isGroup ? `Group chat ${id}` : (memeberUsername as string)
              }
            />
          </Link>
        );
      })} */}
    </div>
  );
};

export default ContactList;
