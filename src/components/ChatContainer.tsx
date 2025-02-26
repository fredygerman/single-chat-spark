
import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "./ui/scroll-area";

interface ChatContainerProps {
  messages: Message[];
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col space-y-4 p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
