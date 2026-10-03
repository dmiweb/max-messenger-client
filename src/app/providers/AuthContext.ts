import { createContext } from 'react';
import type { GreenApiCredentials } from '@/shared/api/greenApi.types';

export interface AuthContextValue {
  credentials: GreenApiCredentials | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: GreenApiCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);