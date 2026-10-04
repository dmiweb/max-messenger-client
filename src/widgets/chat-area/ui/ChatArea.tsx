import type { Chat } from '@/entities/chat';
import type { MessageType } from '@/entities/message';
import { ChatHeader } from '../ui/ChatHeader';
import { MessagesList } from '../ui/MessagesList';
import { Composer } from '@/features/send-message';
import styles from './ChatArea.module.css';

interface Props {
  chat: Chat | null;
  messages: MessageType[];
  isHiddenOnMobile: boolean;
  onSent: (message: MessageType) => void;
  onBack: () => void;
}

export const ChatArea = ({ chat, messages, isHiddenOnMobile, onSent, onBack }: Props) => {
  if (!chat) {
    return (
      <section className={`${styles.chat} ${isHiddenOnMobile ? styles.hiddenOnMobile : ''}`}>
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
      <ChatHeader chat={chat} onBack={onBack}/>
      <MessagesList messages={messages} />
      <Composer chatId={chat.chatId} onSent={onSent} />
    </section>
  );
}