import { GREEN_API_URL, RECEIVE_TIMEOUT } from "./greenApi.config";
import type {
  CheckAccountResponse,
  GetStateInstanceResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
  SendMessageResponse
} from "./greenApi.types";

export const getStateInstance = async (
  credentials: GreenApiCredentials,
): Promise<GetStateInstanceResponse> => {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  );

  if (!response.ok) {
    throw new Error('Не удалось выполнить запрос к GREEN-API');
  }

  return response.json();
}

export const checkAccount = async (
  credentials: GreenApiCredentials,
  phoneNumber: number,
): Promise<CheckAccountResponse> => {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_URL}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || 'Не удалось проверить номер телефона',
    );
  }

  const data = await response.json();

  if (data.status === false) {
    throw new Error(
      data.reason || 'Не удалось проверить номер телефона',
    );
  }

  return data;
}

export const sendMessage = async (
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
): Promise<SendMessageResponse> => {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId,
        message,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || 'Не удалось отправить сообщение',
    );
  }

  return response.json();
}

export const receiveNotification = async (
  credentials: GreenApiCredentials,
): Promise<ReceiveNotificationResponse | null> => {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${RECEIVE_TIMEOUT}`,
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || 'Не удалось получить уведомление',
    );
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

export const deleteNotification = async (
  credentials: GreenApiCredentials,
  receiptId: number,
): Promise<void> => {
  const { idInstance, apiTokenInstance } = credentials;

  const response = await fetch(
    `${GREEN_API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error(
      'Не удалось удалить уведомление',
    );
  }
}