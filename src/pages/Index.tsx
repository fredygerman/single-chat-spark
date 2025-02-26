
import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { Loader2 } from "lucide-react";

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: "1",
    from: "255693338637",
    text: "Hello there! 👋",
    timestamp: Math.floor((Date.now() - 3600000) / 1000), // 1 hour ago
    type: "text"
  },
  {
    id: "2",
    from: "15551853317",
    text: "Hi! How can I help you today?",
    timestamp: Math.floor((Date.now() - 3500000) / 1000),
    type: "text"
  },
  {
    id: "3",
    from: "255693338637",
    text: "I have a question about the new features you announced",
    timestamp: Math.floor((Date.now() - 3400000) / 1000),
    type: "text"
  },
  {
    id: "4",
    from: "15551853317",
    text: "Of course! I'd be happy to explain our new features. We recently launched several exciting updates including improved real-time messaging and enhanced group chat capabilities.",
    timestamp: Math.floor((Date.now() - 3300000) / 1000),
    type: "text"
  },
  {
    id: "5",
    from: "255693338637",
    text: "That sounds great! Can you tell me more about the group chat features?",
    timestamp: Math.floor((Date.now() - 3200000) / 1000),
    type: "text"
  }
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated fetch messages function with mock data
  const fetchMessages = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(mockMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    try {
      // Simulate sending a message
      const newMessage: Message = {
        id: crypto.randomUUID(),
        from: "255693338637",
        text: text,
        timestamp: Math.floor(Date.now() / 1000),
        type: "text"
      };
      
      // Add new message to the list
      setMessages(prev => [...prev, newMessage]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-background">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
      </div>
      
      <div className="flex-1 min-h-0 border rounded-xl bg-card shadow-sm">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading messages...
          </div>
        ) : (
          <ChatContainer messages={messages} />
        )}
      </div>

      <div className="mt-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
