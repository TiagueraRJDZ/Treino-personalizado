'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Detecta navegação pelo botão "voltar" e desloga automaticamente
  useEffect(() => {
    if (!user) return;

    const handlePopState = async (event: PopStateEvent) => {
      // Se o usuário está logado e usou o botão voltar
      if (user && (pathname === '/dashboard' || pathname?.startsWith('/dashboard/'))) {
        try {
          await signOut(auth);
          // Redireciona para a página inicial
          router.replace('/');
        } catch (error) {
          console.error('Erro ao fazer logout automático:', error);
        }
      }
    };

    const handleBeforeUnload = () => {
      // Desloga quando o usuário sai da página/fecha o navegador
      if (user && (pathname === '/dashboard' || pathname?.startsWith('/dashboard/'))) {
        signOut(auth);
      }
    };

    // Adiciona os listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove os listeners quando o componente é desmontado
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, pathname, router]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Limpa dados salvos do "Lembrar de mim"
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      
      // Limpa session storage
      sessionStorage.clear();
      
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}