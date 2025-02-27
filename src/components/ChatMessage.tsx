
import { Message } from "@/types/chat";
import { format } from "date-fns";
import { Check } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isSender = message.role === 'user';

  return (
    <div className={`flex flex-col space-y-1 message-appear ${isSender ? 'items-end' : 'items-start'}`}>
      <div className={`flex flex-col max-w-[70%] ${isSender ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isSender 
              ? 'bg-[#e7ffd9] text-foreground rounded-tr-sm' 
              : 'bg-white text-foreground rounded-tl-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed break-words">{message.content}</p>
          <div className="flex items-center justify-end space-x-1 -mb-1">
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.timestamp * 1000), "HH:mm")}
            </span>
            {isSender && (
              <Check className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
