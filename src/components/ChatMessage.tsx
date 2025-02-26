
import { Message } from "@/types/chat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="flex flex-col space-y-1 message-appear">
      <div className="flex items-end space-x-2">
        <div
          className={`px-4 py-2 rounded-2xl max-w-[80%] bg-secondary text-secondary-foreground`}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground pl-2">
        {format(new Date(message.timestamp * 1000), "HH:mm")}
      </span>
    </div>
  );
};
