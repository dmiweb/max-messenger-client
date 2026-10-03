import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getStateInstance, type GreenApiCredentials } from '@/shared/api';
import { AuthContext, type AuthContextValue } from './AuthContext';

const STORAGE_KEY = 'max-messenger-client';

const getStoredCredentials = (): GreenApiCredentials | null => {
  const storedCredentials = sessionStorage.getItem(STORAGE_KEY);

  if (!storedCredentials) {
    return null;
  }

  try {
    return JSON.parse(storedCredentials) as GreenApiCredentials;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [credentials, setCredentials] =
    useState<GreenApiCredentials | null>(getStoredCredentials);

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (newCredentials: GreenApiCredentials) => {
      setIsLoading(true);

      try {
        const result = await getStateInstance(newCredentials);

        if (result.stateInstance !== 'authorized') {
          throw new Error(
            `Инстанс не готов к работе. Текущий статус: ${result.stateInstance}`,
          );
        }

        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newCredentials),
        );

        setCredentials(newCredentials);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setCredentials(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      credentials,
      isAuthenticated: credentials !== null,
      isLoading,
      login,
      logout,
    }),
    [credentials, isLoading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}