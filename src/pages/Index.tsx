
import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated fetch messages function
  const fetchMessages = async () => {
    // Replace this with your actual API call to PostgreSQL
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Polling for new messages
  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object: "whatsapp_business_account",
          entry: [
            {
              id: "406179402587770",
              changes: [
                {
                  value: {
                    messaging_product: "whatsapp",
                    metadata: {
                      display_phone_number: "15551853317",
                      phone_number_id: "418536728017266",
                    },
                    contacts: [
                      {
                        profile: {
                          name: "user",
                        },
                        wa_id: "255693338637",
                      },
                    ],
                    messages: [
                      {
                        from: "255693338637",
                        id: crypto.randomUUID(),
                        timestamp: Math.floor(Date.now() / 1000),
                        text: {
                          body: text,
                        },
                        type: "text",
                      },
                    ],
                  },
                  field: "messages",
                },
              ],
            },
          ],
        }),
      });
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
