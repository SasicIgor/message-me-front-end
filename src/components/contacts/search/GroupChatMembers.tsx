import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useSearchStore from "@/store/useSearchStore";
import { XCircleIcon } from "lucide-react";

const GroupChatMembers = () => {
  const { users, updateUsers } = useSearchStore();
  return (
    <div className="flex flex-wrap">
      {users &&
        users.map((u, i) => {
          return (
            <button
              className="h-fit p-1 m-1 flex flex-col items-center cursor-pointer shrink-0"
              onClick={() => updateUsers(u)}
              key={i}
            >
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <XCircleIcon
                  className="absolute -top-1 -right-1 text-black rounded"
                  fill="white"
                  size={16}
                />
              </div>
              <h2 className="text-xs">{u.username}</h2>
            </button>
          );
        })}
    </div>
  );
};

export default GroupChatMembers;
