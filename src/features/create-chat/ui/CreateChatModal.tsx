import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Chat } from '@/entities/chat/model/types';
import { useCreateChat } from '../model/useCreateChat';
import styles from './CreateChatModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (chat: Chat) => void;
}

export const CreateChatModal = ({ isOpen, onClose, onCreated }: Props) => {
  const { phone, setPhone, isChecking, error, submit, reset } = useCreateChat({
    onSuccess: (chat) => {
      onCreated(chat);
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Новый чат</h2>
            <p>Введите номер телефона пользователя MAX</p>
          </div>

          <button
            className={styles.iconButton}
            type="button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <label htmlFor="phone">Номер телефона</label>

          <input
            id="phone"
            className={styles.phoneInput}
            type="tel"
            placeholder="+7 999 123-45-67"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                submit();
              }
            }}
            autoFocus
          />

          {error && <div className={styles.modalError}>{error}</div>}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onClose}
          >
            Отмена
          </button>

          <button
            className={styles.createButton}
            type="button"
            disabled={isChecking}
            onClick={submit}
          >
            {isChecking ? 'Проверяем...' : 'Создать чат'}
          </button>
        </div>
      </div>
    </div>
  );
}