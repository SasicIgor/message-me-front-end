import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const ContactCard = ({
  username,
  lastMessageSnippet,
  isActive,
  badge,
}: {
  username: string;
  lastMessageSnippet?: string;
  isActive?: boolean;
  badge: number;
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
        <p className="">{lastMessageSnippet}</p>
      </div>
      {badge > 0 && !isActive && <Badge className="w-6 h-6">{badge}</Badge>}
    </Card>
  );
};

export default ContactCard;
