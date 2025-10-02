'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

// Tipos para as traduções
export interface Translations {
  [key: string]: string | Translations;
}

// Interface do contexto
interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string>) => string;
  loading: boolean;
}

// Criação do contexto
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook para usar o contexto
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n deve ser usado dentro de um I18nProvider');
  }
  return context;
};

// Provider do contexto
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState('pt-BR');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  // Carregar idioma do usuário do Firestore
  useEffect(() => {
    const loadUserLanguage = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.language) {
              setLanguageState(userData.language);
            }
          }
        } catch (error) {
          console.error('Erro ao carregar idioma do usuário:', error);
        }
      }
      setLoading(false);
    };

    loadUserLanguage();
  }, [user]);

  // Carregar traduções quando o idioma mudar
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await import(`../../translations/${language}.json`);
        setTranslations(response.default);
      } catch (error) {
        console.error(`Erro ao carregar traduções para ${language}:`, error);
        // Fallback para português se houver erro
        if (language !== 'pt-BR') {
          try {
            const response = await import(`../../translations/pt-BR.json`);
            setTranslations(response.default);
          } catch (fallbackError) {
            console.error('Erro ao carregar traduções de fallback:', fallbackError);
          }
        }
      }
    };

    loadTranslations();
  }, [language]);

  // Função para alterar idioma
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  // Função de tradução
  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Retorna a chave se a tradução não for encontrada
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Substituir parâmetros na string
    let result = value;
    if (params) {
      Object.entries(params).forEach(([param, val]) => {
        result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), val);
      });
    }
    
    return result;
  };

  const value = {
    language,
    setLanguage,
    t,
    loading
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};