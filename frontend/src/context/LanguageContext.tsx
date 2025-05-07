import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../translations/en';
import frTranslations from '../translations/fr';

type Translations = {
  [key: string]: string | Translations;
};

type Languages = 'en' | 'fr';

type LanguageContextType = {
  language: Languages;
  t: (key: string, params?: Record<string, string>) => string;
  changeLanguage: (lang: Languages) => void;
};

const translations: Record<Languages, Translations> = {
  en: enTranslations,
  fr: frTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get language from localStorage or default to 'en'
  const savedLanguage = localStorage.getItem('language') as Languages;
  const browserLanguage = navigator.language.split('-')[0] as Languages;
  const defaultLanguage = (savedLanguage || browserLanguage || 'en') as Languages;
  
  const [language, setLanguage] = useState<Languages>(
    translations[defaultLanguage] ? defaultLanguage : 'en'
  );

  useEffect(() => {
    // Save language preference to localStorage when it changes
    localStorage.setItem('language', language);
    // Update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Get nested translation by key path (e.g., 'common.button.save')
  const getNestedTranslation = (obj: Translations, path: string): string => {
    const keys = path.split('.');
    let current: any = obj;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path; // Return the key if translation not found
      }
      current = current[key];
    }
    
    if (typeof current !== 'string') {
      console.warn(`Translation key "${path}" is not a string`);
      return path;
    }
    
    return current;
  };

  // Translation function with interpolation support
  const t = (key: string, params?: Record<string, string>): string => {
    try {
      let translation = getNestedTranslation(translations[language], key);
      
      // Replace parameters in translation if they exist
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), value);
        });
      }
      
      return translation;
    } catch (e) {
      console.error(`Translation error for key: ${key}`, e);
      return key;
    }
  };

  const changeLanguage = (lang: Languages): void => {
    if (translations[lang]) {
      setLanguage(lang);
    } else {
      console.warn(`Language ${lang} is not supported`);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
