import type { Message as MessageType } from "../model/types";
import styles from './Message.module.css';

export const Message = ({ message }: { message: MessageType }) => {

  return (
    <div
      className={`${styles.message} ${message.isMine
        ? styles.messageMine
        : styles.messageIncoming
        }`}
    >
      <span>{message.text}</span>

      <span className={styles.messageTime}>{message.time}</span>
    </div>
  );
}