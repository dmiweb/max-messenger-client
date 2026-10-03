import { MoreVertical } from 'lucide-react';
import type { Chat } from '@/entities/chat';
import { ChatAvatar } from '@/entities/chat';
import styles from './ChatArea.module.css';

interface Props {
  chat: Chat;
}

export const ChatHeader = ({ chat }: Props) => {
  return (
    <header className={styles.chatHeader}>
      <div className={styles.chatUser}>
        <ChatAvatar name={chat.phone} />

        <div>
          <div className={styles.chatHeaderPhone}>{chat.phone}</div>
        </div>
      </div>

      <button
        className={styles.iconButton}
        type="button"
        title="Дополнительно"
      >
        <MoreVertical size={20} />
      </button>
    </header>
  );
}