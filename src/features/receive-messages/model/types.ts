import type { MessageType } from "@/entities/message";

export interface IncomingMessage {
  chatId: string;
  chatName?: string;
  senderPhoneNumber?: number;
  isOutgoing: boolean;
  message: MessageType;
}