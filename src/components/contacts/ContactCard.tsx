import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const ContactCard = ({
  username,
  lastMessage,
}: {
  username: string;
  lastMessage: string;
}) => {
  return (
    <Card className="w-full h-auto p-2 flex flex-row justify-around items-center bg-blue-400 hover:bg-blue-500">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col items-start w-full">
        <h2 className="text-xl">{username}</h2>
        <p>{lastMessage}</p>
      </div>
      <Badge className="w-6 h-6">1</Badge>
    </Card>
  );
};

export default ContactCard;
