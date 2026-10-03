import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Chat } from '@/entities/chat';
import type { MessageType } from '@/entities/message';
import { useReceiveMessages } from '@/features/receive-messages';
import type { IncomingMessage } from '@/features/receive-messages';

export const useChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messagesByChat, setMessagesByChat] = useState<Record<string, MessageType[]>>({});
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const selectedChatIdRef = useRef(selectedChatId);

  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  const handleMessage = useCallback((incoming: IncomingMessage) => {
    const { chatId, chatName, senderPhoneNumber, message } = incoming;

    setMessagesByChat((current) => {
      const existing = current[chatId] ?? [];

      if (existing.some((m) => m.id === message.id)) {
        return current;
      }

      return { ...current, [chatId]: [...existing, message] };
    });

    setChats((current) => {
      const existing = current.find((c) => c.chatId === chatId);
      const isCurrent = selectedChatIdRef.current === chatId;

      if (!existing) {
        const newChat: Chat = {
          id: chatId,
          chatId,
          name:
            chatName ||
            (senderPhoneNumber ? `+${senderPhoneNumber}` : chatId),
          phone: senderPhoneNumber ? `+${senderPhoneNumber}` : '',
          lastMessage: message.text,
          time: message.time,
          unreadCount: isCurrent ? 0 : 1,
        };

        return [newChat, ...current];
      }

      return current.map((chat) => {
        if (chat.chatId !== chatId) {
          return chat;
        }

        return {
          ...chat,
          lastMessage: message.text,
          time: message.time,
          unreadCount: isCurrent ? 0 : (chat.unreadCount ?? 0) + 1,
        };
      });
    });
  }, []);

  useReceiveMessages({ onMessage: handleMessage });

  const handleChatCreated = (chat: Chat) => {
    setChats((current) => {
      const existing = current.find((c) => c.chatId === chat.chatId);

      if (existing) {
        setSelectedChatId(existing.id);
        return current;
      }

      return [chat, ...current];
    });

    setSelectedChatId(chat.id);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );
  };

  const handleSent = (chatId: string, message: MessageType) => {
    setMessagesByChat((current) => {
      const existing = current[chatId] ?? [];

      if (existing.some((m) => m.id === message.id)) {
        return current;
      }

      return { ...current, [chatId]: [...existing, message] };
    });

    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId
          ? { ...chat, lastMessage: message.text, time: message.time }
          : chat,
      ),
    );
  };

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? null,
    [chats, selectedChatId],
  );

  const messages = selectedChat
    ? messagesByChat[selectedChat.chatId] ?? []
    : [];

  return {
    chats,
    selectedChatId,
    selectedChat,
    messages,
    isNewChatOpen,
    setIsNewChatOpen,
    handleChatCreated,
    handleSelectChat,
    handleSent,
  };
}