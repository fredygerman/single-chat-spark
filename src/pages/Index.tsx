import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { Loader2, Search } from "lucide-react";

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Hey! 👋",
    timestamp: Math.floor((Date.now() - 7200000) / 1000),
  },
  {
    id: "2",
    role: "assistant",
    content: "Hello! How can I assist you today?",
    timestamp: Math.floor((Date.now() - 7100000) / 1000),
  },
  {
    id: "3",
    role: "user",
    content: "I need help with my recent order",
    timestamp: Math.floor((Date.now() - 7000000) / 1000),
  },
  {
    id: "4",
    role: "assistant",
    content: "Of course! Could you please provide your order number?",
    timestamp: Math.floor((Date.now() - 6900000) / 1000),
  },
  {
    id: "5",
    role: "user",
    content: "Sure, it's #ORD-12345",
    timestamp: Math.floor((Date.now() - 6800000) / 1000),
  },
  {
    id: "6",
    role: "assistant",
    content: "Thank you! I can see your order. It looks like it's currently in transit and will be delivered tomorrow between 2-4 PM.",
    timestamp: Math.floor((Date.now() - 6700000) / 1000),
  },
  {
    id: "7",
    role: "user",
    content: "That's perfect! Could you also confirm the delivery address?",
    timestamp: Math.floor((Date.now() - 6600000) / 1000),
  },
  {
    id: "8",
    role: "assistant",
    content: "Of course! The delivery address is: 123 Main Street, Apt 4B, New York, NY 10001. Is this correct?",
    timestamp: Math.floor((Date.now() - 6500000) / 1000),
  },
  {
    id: "9",
    role: "user",
    content: "Yes, that's correct! Thank you so much for your help 😊",
    timestamp: Math.floor((Date.now() - 6400000) / 1000),
  },
  {
    id: "10",
    role: "assistant",
    content: "You're welcome! Is there anything else you need help with?",
    timestamp: Math.floor((Date.now() - 6300000) / 1000),
  },
  {
    id: "11",
    role: "user",
    content: "No, that's all for now. Have a great day!",
    timestamp: Math.floor((Date.now() - 6200000) / 1000),
  },
  {
    id: "12",
    role: "assistant",
    content: "You too! Don't hesitate to reach out if you need anything else. 👋",
    timestamp: Math.floor((Date.now() - 6100000) / 1000),
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
        role: "user",
        content: text,
        timestamp: Math.floor(Date.now() / 1000),
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
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background">
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">T</span>
          </div>
          <h1 className="text-xl font-semibold text-primary-foreground">Twiga</h1>
        </div>
        <button className="text-primary-foreground">
          <Search className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 min-h-0 overflow-hidden">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading messages...
          </div>
        ) : (
          <ChatContainer messages={messages} />
        )}
      </div>

      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
