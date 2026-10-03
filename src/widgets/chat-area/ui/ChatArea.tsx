import type { Chat } from '@/entities/chat';
import type { MessageType } from '@/entities/message';
import { ChatHeader } from '../ui/ChatHeader';
import { MessagesList } from '../ui/MessagesList';
import { Composer } from '@/features/send-message';
import styles from './ChatArea.module.css';

interface Props {
  chat: Chat | null;
  messages: MessageType[];
  onSent: (message: MessageType) => void;
}

export const ChatArea = ({ chat, messages, onSent }: Props) => {
  if (!chat) {
    return (
      <section className={styles.chat}>
        <div className={styles.emptyChat}>
          <div className={styles.emptyChatIcon}>M</div>
          <h2>Max Messenger Client</h2>
          <p>Создайте чат, чтобы начать переписку</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.chat}>
      <ChatHeader chat={chat} />
      <MessagesList messages={messages} />
      <Composer chatId={chat.chatId} onSent={onSent} />
    </section>
  );
}