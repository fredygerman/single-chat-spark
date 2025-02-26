
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
    text: "Hey! 👋",
    timestamp: Math.floor((Date.now() - 7200000) / 1000),
    type: "text"
  },
  {
    id: "2",
    from: "15551853317",
    text: "Hello! How can I assist you today?",
    timestamp: Math.floor((Date.now() - 7100000) / 1000),
    type: "text"
  },
  {
    id: "3",
    from: "255693338637",
    text: "I need help with my recent order",
    timestamp: Math.floor((Date.now() - 7000000) / 1000),
    type: "text"
  },
  {
    id: "4",
    from: "15551853317",
    text: "Of course! Could you please provide your order number?",
    timestamp: Math.floor((Date.now() - 6900000) / 1000),
    type: "text"
  },
  {
    id: "5",
    from: "255693338637",
    text: "Sure, it's #ORD-12345",
    timestamp: Math.floor((Date.now() - 6800000) / 1000),
    type: "text"
  },
  {
    id: "6",
    from: "15551853317",
    text: "Thank you! I can see your order. It looks like it's currently in transit and will be delivered tomorrow between 2-4 PM.",
    timestamp: Math.floor((Date.now() - 6700000) / 1000),
    type: "text"
  },
  {
    id: "7",
    from: "255693338637",
    text: "That's perfect! Could you also confirm the delivery address?",
    timestamp: Math.floor((Date.now() - 6600000) / 1000),
    type: "text"
  },
  {
    id: "8",
    from: "15551853317",
    text: "Of course! The delivery address is: 123 Main Street, Apt 4B, New York, NY 10001. Is this correct?",
    timestamp: Math.floor((Date.now() - 6500000) / 1000),
    type: "text"
  },
  {
    id: "9",
    from: "255693338637",
    text: "Yes, that's correct! Thank you so much for your help 😊",
    timestamp: Math.floor((Date.now() - 6400000) / 1000),
    type: "text"
  },
  {
    id: "10",
    from: "15551853317",
    text: "You're welcome! Is there anything else you need help with?",
    timestamp: Math.floor((Date.now() - 6300000) / 1000),
    type: "text"
  },
  {
    id: "11",
    from: "255693338637",
    text: "No, that's all for now. Have a great day!",
    timestamp: Math.floor((Date.now() - 6200000) / 1000),
    type: "text"
  },
  {
    id: "12",
    from: "15551853317",
    text: "You too! Don't hesitate to reach out if you need anything else. 👋",
    timestamp: Math.floor((Date.now() - 6100000) / 1000),
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
