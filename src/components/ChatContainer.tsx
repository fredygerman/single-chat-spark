
import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "./ui/scroll-area";
import { format, isToday, isYesterday, isSameDay } from "date-fns";

interface ChatContainerProps {
  messages: Message[];
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getDateDivider = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    if (isToday(date)) {
      return "Today";
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    return format(date, "MMMM d, yyyy");
  };

  const groupMessagesByDate = () => {
    const groups: { date: number; messages: Message[] }[] = [];
    
    messages.forEach((message) => {
      const lastGroup = groups[groups.length - 1];
      const messageDate = new Date(message.timestamp * 1000);
      
      if (!lastGroup || !isSameDay(new Date(lastGroup.date * 1000), messageDate)) {
        groups.push({
          date: message.timestamp,
          messages: [message],
        });
      } else {
        lastGroup.messages.push(message);
      }
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <ScrollArea className="h-full bg-[#f0f2f5]">
      <div className="flex flex-col space-y-4 p-4">
        {messageGroups.map((group) => (
          <div key={group.date} className="space-y-2">
            <div className="self-center flex justify-center">
              <div className="bg-white rounded-full px-4 py-1 text-sm text-muted-foreground shadow-sm">
                {getDateDivider(group.date)}
              </div>
            </div>
            {group.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
