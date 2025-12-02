import { SendHorizontal } from "lucide-react";
import useAppForm from "../form/useAppForm";
import { Avatar } from "../ui/avatar";
import { Card, CardDescription, CardFooter } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";

const messages = [
  {
    id: "1",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:24",
    content: "Some content",
  },
  {
    id: "2",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:24",
    content: "Some content",
  },
  {
    id: "3",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:25",
    content: "Some content",
  },
  {
    id: "4",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:26",
    content: "Some content",
  },
  {
    id: "5",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:27",
    content: "Some content",
  },
  {
    id: "6",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:28",
    content: "Some content",
  },
  {
    id: "7",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:29",
    content: "Some content",
  },
  {
    id: "8",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:30",
    content: "Some content",
  },
  {
    id: "9",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:31",
    content: "Some content",
  },
  {
    id: "10",
    chatId: "Igor",
    senderId: "2",
    createdAt: "12:32",
    content: "Some contentaa",
  },
  {
    id: "11",
    chatId: "Igor",
    senderId: "1",
    createdAt: "12:33",
    content: "Some contentdsada",
  },
];

const baseArrow = `after:content-[''] 
  after:absolute 
  after:z-0
  after:border-t-16 
  after:border-l-16
  after:border-b-16
  after:border-transparent
  after:border-l-white
  after:w-0 
  after:h-0 
  after:rotate-90
  after:-top-1`;

const rightArrow = `mr-2 
  after:right-2`;

const leftArrow = `ml-2 
  after:left-2`;

const ChatArea = () => {
  const form = useAppForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="h-screen flex flex-col">
      {/* USER PROFILE INFO */}
      <div className="flex justify-start aling-center p-2 border-white border-b">
        <Avatar className="m-1">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <div>
          <p className="text-sm">Username</p>
          <p className="text-xs">last online</p>
        </div>
      </div>
      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-hidden p-2">
        <ScrollArea className="h-full w-full">
          {messages.map((msg) => {
            return (
              <div
                className={`relative flex flex-col ${msg.senderId === "2" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex mt-1 rounded max-w-11/12 bg-white ${baseArrow} ${msg.senderId === "2" ? rightArrow : leftArrow}`}
                >
                  <div className="p-2 text-sm z-1">
                    {msg.content} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Eius beatae nemo alias ex excepturi
                    laborum sunt rem quas perferendis molestias velit, autem
                    possimus quo ratione nostrum aspernatur aut earum quis.
                    Similique voluptates ab officiis tempora ratione error rem
                    molestiae maxime atque mollitia, perspiciatis fugit
                    reprehenderit dolorum, vero corporis magnam repudiandae
                    corrupti provident quas, delectus inventore eveniet. Dolorem
                    nesciunt rem perferendis!
                  </div>
                  <div className="flex items-end p-1 text-xs">
                    {msg.createdAt}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
      {/* MESSAGE FIELD */}

      <form.AppForm>
        <div className="flex m-1 bg-blue-700 focus-within:bg-blue-800 rounded-md ">
          <form.AppField
            name="message"
            children={(field) => (
              <field.SearchField placeholder="type a message" className="border-none focus:outline-none focus-visible:ring-0" />
            )}
          />
          <form.SubscribeButton
          className="p-0 m-0 rounded-4xl bg-transparent hover:bg-transparent w-auto"
            label={<SendHorizontal className="rounded" />}
          />
        </div>
      </form.AppForm>
    </div>
  );
};

export default ChatArea;
