import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserRole } from '../types';

interface User {
  role: UserRole;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

interface UserProviderProps {
  children: ReactNode;
  initialRole: UserRole;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialRole }) => {
  const [user, setUser] = useState<User>({ role: initialRole });

  useEffect(() => {
    setUser({ role: initialRole });
  }, [initialRole]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};