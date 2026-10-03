import { LogOut, Plus } from 'lucide-react';
import type { Chat } from '@/entities/chat';
import { ChatItem } from '@/entities/chat';
import { SearchBar } from '@/features/search-chats';
import styles from './Sidebar.module.css';

interface Props {
  chats: Chat[];
  selectedChatId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onLogout: () => void;
}

export const Sidebar = ({
  chats,
  selectedChatId,
  search,
  onSearchChange,
  onSelectChat,
  onNewChat,
  onLogout,
}: Props) => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <h1 className={styles.logo}>Max Messenger Client</h1>

        <button
          className={styles.iconButton}
          type="button"
          title="Выйти"
          onClick={onLogout}
        >
          <LogOut size={20} />
        </button>
      </header>

      <SearchBar value={search} onChange={onSearchChange} />

      <div className={styles.chatList}>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={selectedChatId === chat.id}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>

      <button
        className={styles.newChatButton}
        type="button"
        onClick={onNewChat}
      >
        <Plus size={20} />
        <span>Новый чат</span>
      </button>
    </aside>
  );
}