import { Paperclip, Send, Smile } from 'lucide-react';
import type { MessageType } from '@/entities/message';
import { useSendMessage } from '../model/useSendMessage';
import styles from './Composer.module.css';

interface Props {
  chatId: string;
  onSent: (message: MessageType) => void;
}

export const Composer = ({ chatId, onSent }: Props) => {
  const { text, setText, isSending, error, submit } = useSendMessage({
    chatId,
    onSent,
  });

  return (
    <>
      <div className={styles.composer}>
        <button
          className={styles.iconButton}
          type="button"
          title="Прикрепить файл"
        >
          <Paperclip size={20} />
        </button>

        <div className={styles.messageInput}>
          <input
            type="text"
            placeholder="Написать сообщение..."
            value={text}
            maxLength={4000}
            disabled={isSending}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
          />

          <button
            className={styles.inputIcon}
            type="button"
            title="Смайлы"
          >
            <Smile size={20} />
          </button>
        </div>

        <button
          className={styles.sendButton}
          type="button"
          title="Отправить"
          disabled={!text.trim() || isSending}
          onClick={submit}
        >
          <Send size={19} />
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}