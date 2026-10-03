import { useState } from 'react';

import { useAuth } from '@/app/providers/useAuth';
import { sendMessage } from '@/shared/api/greenApi';
import type { MessageType } from '@/entities/message';
import { formatTime } from '@/shared/lib/formatTime';

interface Options {
  chatId: string;
  onSent: (message: MessageType) => void;
}

export const useSendMessage = ({ chatId, onSent }: Options) => {
  const { credentials } = useAuth();

  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    const value = text.trim();

    if (!value || !credentials) {
      return;
    }

    if (value.length > 4000) {
      setError('Сообщение не может быть длиннее 4000 символов');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const result = await sendMessage(credentials, chatId, value);

      const newMessage: MessageType = {
        id: result.idMessage,
        text: value,
        time: formatTime(Date.now()),
        isMine: true,
      };

      onSent(newMessage);
      setText('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось отправить сообщение',
      );
    } finally {
      setIsSending(false);
    }
  };

  return {
    text,
    setText,
    isSending,
    error,
    submit,
  };
}