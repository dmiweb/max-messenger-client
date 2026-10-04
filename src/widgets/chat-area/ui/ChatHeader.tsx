import { ArrowLeft, MoreVertical } from 'lucide-react';
import type { Chat } from '@/entities/chat';
import { ChatAvatar } from '@/entities/chat';
import styles from './ChatArea.module.css';

interface Props {
  chat: Chat;
  onBack: () => void;
}

export const ChatHeader = ({ chat, onBack }: Props) => {
  return (
    <header className={styles.chatHeader}>
        <button
          type='button'
          className={styles.backButton}
          title='Назад'
          onClick={onBack}
        >
          <ArrowLeft size={24} />
        </button>

        <div className={styles.chatUser}>
          <ChatAvatar name={chat.phone} />

          <div>
            <div className={styles.chatHeaderPhone}>{chat.phone}</div>
          </div>
        </div>

      <button
        className={`${styles.menuButton} ${styles.iconButton}`}
        type="button"
        title="Дополнительно"
      >
        <MoreVertical size={20} />
      </button>
    </header>
  );
}