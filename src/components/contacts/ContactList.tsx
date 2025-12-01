import { Link } from "@tanstack/react-router";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const data = [
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "1" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "2" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "3" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "4" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "5" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "1" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "2" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "3" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "4" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "5" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "1" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "2" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "3" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "4" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "5" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "1" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "2" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "3" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "4" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "5" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "1" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "2" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "3" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "4" },
    { username: "Test", lastMessage: "dsnadhkashdlkjasl", id: "10" },
  ];
  return (
    <div className="p-2">
      {data.map(({ username, lastMessage, id }) => {
        return (
          <Link to={`/app/chat/$chatId`} params={{ chatId: id }}>
            <ContactCard username={username} lastMessage={lastMessage} />
          </Link>
        );
      })}
    </div>
  );
};

export default ContactList;
