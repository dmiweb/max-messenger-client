export interface Chat {
  id: string;
  chatId: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}