import type { ReceiveNotificationResponse } from "@/shared/api";

export const extractText = (
  messageData: ReceiveNotificationResponse['body']['messageData'],
): string | undefined => {
  switch (messageData.typeMessage) {
    case 'textMessage':
      return messageData.textMessageData?.textMessage;
    case 'extendedTextMessage':
      return messageData.extendedTextMessageData?.text;
    default:
      return undefined;
  }
}