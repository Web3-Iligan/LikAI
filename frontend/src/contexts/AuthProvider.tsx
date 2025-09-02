import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';
import { AuthContext } from './AuthContext';

// Use the Internet Identity canister ID from environment variables
const getIdentityProviderUrl = () => {
  // For local development, use the local Internet Identity canister
  if (process.env.DFX_NETWORK === 'local') {
    const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
    return `http://${canisterId}.localhost:8000`;
  }
  // For production, use the Internet Computer mainnet identity provider
  return 'https://identity.ic0.app';
};

// Configuration for Internet Identity authentication
const AUTH_OPTIONS = {
  identityProvider: getIdentityProviderUrl(),
  windowOpenerFeatures: 'width=768,height=600',
  // Maximum authorization expiration is 8 days
  maxTimeToLive: BigInt(8) * BigInt(24) * BigInt(3_600_000_000_000), // 8 days in nanoseconds
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  // Initialize AuthClient
  useEffect(() => {
    let timeoutId: number;
    
    const initAuth = async () => {
      try {
        console.log("Starting auth client initialization...");
        console.log("Using Identity Provider:", AUTH_OPTIONS.identityProvider);
        
        // Set a timeout to ensure we don't get stuck in loading state
        timeoutId = window.setTimeout(() => {
          console.warn("Auth initialization timed out after 10 seconds");
          setIsAuthReady(true);
        }, 10000);
        
        const client = await AuthClient.create();
        console.log("Auth client created successfully");
        setAuthClient(client);
        
        const isLoggedIn = await client.isAuthenticated();
        console.log("Authentication status checked:", isLoggedIn);
        setIsAuthenticated(isLoggedIn);
        
        if (isLoggedIn) {
          const identity = client.getIdentity();
          setIdentity(identity);
          console.log("User is already authenticated");
        } else {
          console.log("User is not authenticated");
        }
        
        // Clear the timeout since we completed successfully
        window.clearTimeout(timeoutId);
        setIsAuthReady(true);
      } catch (error) {
        console.error('Failed to initialize auth client:', error);
        // Still mark as ready, but in error state
        setIsAuthReady(true);
      }
    };
    
    initAuth();
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  // Login function
  const login = async (): Promise<void> => {
    if (!authClient) {
      console.error("Auth client not initialized when attempting login");
      return Promise.reject(new Error("Auth client not initialized"));
    }
    
    return new Promise<void>((resolve, reject) => {
      console.log("Initiating login process...");
      authClient.login({
        ...AUTH_OPTIONS,
        onSuccess: async () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();
          setIdentity(identity);
          console.log("Login successful");
          resolve();
        },
        onError: (error) => {
          console.error('Login failed:', error);
          reject(error);
        }
      });
    });
  };

  // Logout function
  const logout = async (): Promise<void> => {
    if (!authClient) {
      console.error("Auth client not initialized when attempting logout");
      return Promise.reject(new Error("Auth client not initialized"));
    }
    
    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setIdentity(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const contextValue = {
    isAuthenticated,
    isAuthReady,
    authClient,
    identity,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};