import { useMemo, useState } from 'react';
import type { Chat } from '@/entities/chat';

export const useChatSearch = (chats: Chat[]) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      chats.filter((chat) =>
        `${chat.name} ${chat.phone}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [chats, search],
  );

  return { search, setSearch, filtered };
}