
export interface Message {
  id: string;
  from: string;
  text: string;
  timestamp: number;
  type: 'text';
}

export interface ChatEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: string;
      metadata: {
        display_phone_number: string;
        phone_number_id: string;
      };
      contacts: Array<{
        profile: {
          name: string;
        };
        wa_id: string;
      }>;
      messages: Message[];
    };
    field: string;
  }>;
}

export interface ChatPayload {
  object: string;
  entry: ChatEntry[];
}
