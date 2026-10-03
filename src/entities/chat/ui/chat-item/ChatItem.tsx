import type { Chat } from '../../model/types';
import { ChatAvatar } from '../chat-avatar/ChatAvatar';
import styles from './ChatItem.module.css';

interface Props {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export const ChatItem = ({ chat, isActive, onClick }: Props) => {
  return (
    <button
      type="button"
      className={`${styles.chatItem} ${isActive ? styles.chatItemActive : ''}`}
      onClick={onClick}
    >
      <ChatAvatar name={chat.name} />

      <div className={styles.chatContent}>
        <div className={styles.chatTop}>
          <span className={styles.chatName}>{chat.name}</span>
          <span className={styles.chatTime}>{chat.time}</span>
        </div>

        <div className={styles.chatBottom}>
          <span className={styles.lastMessage}>{chat.lastMessage}</span>
          {chat.unreadCount ? (
            <span className={styles.unread}>{chat.unreadCount}</span>
          ) : null}
        </div>
      </div>
    </button>
  );
}