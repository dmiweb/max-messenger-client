import { useState } from 'react';
import { useAuth } from '@/app/providers/useAuth';
import {
  checkAccount,
  type CheckAccountResponse,
} from '@/shared/api';
import type { Chat } from '@/entities/chat/model/types';

interface Options {
  onSuccess: (chat: Chat) => void;
}

export const useCreateChat = ({ onSuccess }: Options) => {
  const { credentials } = useAuth();

  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setPhone('');
    setError('');
  };

  const submit = async () => {
    const normalizedPhone = phone.replace(/\D/g, '');

    if (!normalizedPhone) {
      setError('Введите номер телефона');
      return;
    }

    if (normalizedPhone.length !== 11 && normalizedPhone.length !== 12) {
      setError('Введите номер в международном формате');
      return;
    }

    if (!credentials) {
      return;
    }

    setIsChecking(true);
    setError('');

    try {
      const result: CheckAccountResponse = await checkAccount(
        credentials,
        Number(normalizedPhone),
      );

      if (!result.exist || !result.chatId) {
        setError('На этом номере нет аккаунта MAX');
        return;
      }

      const chat: Chat = {
        id: result.chatId,
        chatId: result.chatId,
        name: `+${normalizedPhone}`,
        phone: `+${normalizedPhone}`,
        lastMessage: '',
        time: '',
      };

      onSuccess(chat);
    } catch (err) {
      setError(
        err instanceof Error 
        ? 'Введите корректный номер телефона с указанием международного кода в формате +7 999 000 00 00' 
        : 'Не удалось проверить номер',
      );
    } finally {
      setIsChecking(false);
    }
  };

  return {
    phone,
    setPhone,
    isChecking,
    error,
    submit,
    reset,
  };
}