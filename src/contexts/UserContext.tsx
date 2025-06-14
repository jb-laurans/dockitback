import { createContext, useContext } from 'react';

type User = { name: string; type: 'charterer' | 'shipowner' };

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);
