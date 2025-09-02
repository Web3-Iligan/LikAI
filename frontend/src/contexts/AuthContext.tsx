import { Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  authClient: AuthClient | null;
  identity: Identity | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Default context values when no provider is available
const defaultContext: AuthContextType = {
  isAuthenticated: false,
  isAuthReady: false,
  authClient: null,
  identity: null,
  login: async () => {
    throw new Error('AuthProvider not initialized');
  },
  logout: async () => {
    throw new Error('AuthProvider not initialized');
  },
};

export const AuthContext = createContext<AuthContextType>(defaultContext);