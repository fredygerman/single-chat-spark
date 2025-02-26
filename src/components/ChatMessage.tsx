
import { Message } from "@/types/chat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isSender = message.role === 'user';

  return (
    <div className={`flex flex-col space-y-1 message-appear ${isSender ? 'items-end' : 'items-start'}`}>
      <div className="flex items-end space-x-2">
        <div
          className={`px-4 py-2 rounded-2xl max-w-[80%] ${
            isSender 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground px-2">
        {format(new Date(message.timestamp * 1000), "HH:mm")}
      </span>
    </div>
  );
};
