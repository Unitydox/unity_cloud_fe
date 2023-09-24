import { createContext, useState, ReactNode } from 'react';
import { IUserDetails } from 'models/user';

export interface AuthContextType {
  user: IUserDetails | null;
  login: (user: IUserDetails) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserDetails | null>(null);

  const login = (user: IUserDetails) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};