import type { MessageType } from '@/entities/message';
import { Message } from '@/entities/message';
import styles from './ChatArea.module.css';

interface Props {
  messages: MessageType[];
}

export const  MessagesList = ({ messages }: Props) => {
  return (
    <div className={styles.messages}>
      <div className={styles.messagesInner}>
        {messages.map((item) => (
          <div
            key={item.id}
            className={`${styles.messageRow} ${
              item.isMine ? styles.messageRowMine : ''
            }`}
          >
            <Message message={item} />
          </div>
        ))}
      </div>
    </div>
  );
}