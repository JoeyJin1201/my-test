import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextProps {
  user: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // 初始化：從 localStorage 中恢復用戶狀態
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (storedUser && token) {
      setUser(storedUser);
    }
  }, []);

  const login = (username: string, token: string) => {
    setUser(username);
    localStorage.setItem('user', username);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    router.push('/login'); // 登出後重定向
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
