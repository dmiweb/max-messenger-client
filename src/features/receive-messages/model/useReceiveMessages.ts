import { useEffect } from 'react';
import { useAuth } from '@/app/providers/useAuth';
import { receiveNotification, deleteNotification } from '@/shared/api/greenApi';
import type { IncomingMessage } from './types';
import type { ReceiveNotificationResponse } from '@/shared/api';  
import { extractText } from '../lib/extractText';
import { formatTime } from '@/shared/lib/formatTime';

interface Options {
  onMessage: (incoming: IncomingMessage) => void;
}

export const useReceiveMessages = ({ onMessage }: Options) => {
  const { credentials } = useAuth();

  useEffect(() => {
    if (!credentials) {
      return;
    }

    let isActive = true;

    const loop = async () => {
      while (isActive) {
        try {
          const notification = (await receiveNotification(
            credentials,
          )) as ReceiveNotificationResponse | null;

          if (!isActive) {
            break;
          }

          if (!notification) {
            continue;
          }

          const { receiptId, body } = notification;

          const isIncoming = body.typeWebhook === 'incomingMessageReceived';
          const isOutgoing =
            body.typeWebhook === 'outgoingMessageReceived' ||
            body.typeWebhook === 'outgoingAPIMessageReceived';

          if (isIncoming || isOutgoing) {
            const text = extractText(body.messageData);
            const chatId = body.senderData.chatId;
            const messageId = body.idMessage;

            if (text && chatId && messageId) {
              onMessage({
                chatId,
                chatName: body.senderData.chatName,
                senderPhoneNumber: body.senderData.senderPhoneNumber,
                isOutgoing,
                message: {
                  id: messageId,
                  text,
                  time: formatTime(body.timestamp * 1000),
                  isMine: isOutgoing,
                },
              });
            }
          }

          await deleteNotification(credentials, receiptId);
        } catch (error) {
          if (!isActive) {
            break;
          }

          console.error('Ошибка получения сообщения:', error);

          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    loop();

    return () => {
      isActive = false;
    };
  }, [credentials, onMessage]);
}