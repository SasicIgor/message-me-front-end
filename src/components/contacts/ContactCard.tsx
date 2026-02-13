import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const ContactCard = ({
  username,
  lastMessage,
  isActive,
}: {
  username: string;
  lastMessage?: string;
  isActive?: boolean;
}) => {
  return (
    <Card
      className={`max-w-full h-auto b-none p-2 mb-1 flex flex-row justify-around items-center ${isActive && "bg-brand-blue-lightest"} `}
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col items-start w-full">
        <h2 className="text-xl">{username}</h2>
        <p className="">some messageher</p>
      </div>
      <Badge className="w-6 h-6">1</Badge>
    </Card>
  );
};

export default ContactCard;
