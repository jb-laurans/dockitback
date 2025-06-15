import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('shipmatch-token');
  });

  const isAuthenticated = !!user && !!token;

  // Persist token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('shipmatch-token', token);
    } else {
      localStorage.removeItem('shipmatch-token');
    }
  }, [token]);

  // Auto-login if token exists
  useEffect(() => {
    const autoLogin = async () => {
      const savedToken = localStorage.getItem('shipmatch-token');
      if (savedToken && !user) {
        try {
          const response = await fetch('http://localhost:3001/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(savedToken);
          } else {
            // Token invalid, remove it
            localStorage.removeItem('shipmatch-token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auto-login failed:', error);
          localStorage.removeItem('shipmatch-token');
          setToken(null);
        }
      }
    };

    autoLogin();
  }, [user]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('shipmatch-token');
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      logout,
      isAuthenticated,
      token,
      setToken
    }}>
      {children}
    </UserContext.Provider>
  );
};