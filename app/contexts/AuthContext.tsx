'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há token armazenado
    const token = localStorage.getItem('userToken');
    const email = localStorage.getItem('userEmail');
    
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
    
    setLoading(false);
  }, []);

  const login = (email: string, token: string) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}