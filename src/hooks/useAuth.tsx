import { useState, useEffect, useContext } from 'react';
import { AuthContext, User } from '../contexts/AuthContext';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const login = () => {
    // API call 
    const user: User = { id: 1, name: 'John' };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
  };
};