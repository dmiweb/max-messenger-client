export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword';

export interface GetStateInstanceResponse {
  stateInstance: InstanceState;
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  fromCache?: boolean;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface SenderData {
  chatId: string;
  chatName?: string;
  chatType?: string;
  sender: string;
  senderName?: string;
  senderType?: string;
  senderContactName?: string;
  senderPhoneNumber?: number;
}

export interface TextMessageData {
  typeMessage: 'textMessage';
  textMessageData?: {
    textMessage: string;
    forwardingScore?: number;
    isForwarded?: boolean;
  };
}

export interface ExtendedTextMessageData {
  typeMessage: 'extendedTextMessage';
  extendedTextMessageData?: {
    text: string;
    description?: string;
    title?: string;
    previewType?: string;
    jpegThumbnail?: string;
    forwardingScore?: number;
    isForwarded?: boolean;
  };
}

export type MessageData = TextMessageData | ExtendedTextMessageData;

export interface WebhookBody {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: WebhookBody;
}

export interface GreenApiErrorBody {
  status: false;
  reason?: string;
}