import { LanguageCode } from '../translations';

/**
 * Gets the default language based on user preferences
 * Checks in this order: user stored preference, browser language, fallback to English
 */
export const getDefaultLanguage = (): LanguageCode => {
  // First, check for stored user preference
  const storedLanguage = localStorage.getItem('language') as LanguageCode;
  if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'fr')) {
    return storedLanguage;
  }
  
  // If no stored preference, check browser language
  const browserLanguage = navigator.language.split('-')[0];
  if (browserLanguage === 'fr') {
    return 'fr';
  }
  
  // Default to English
  return 'en';
};

/**
 * Helper to validate if a language code is supported
 */
export const isValidLanguage = (code: string): boolean => {
  return code === 'en' || code === 'fr';
};

/**
 * Get language name from code
 */
export const getLanguageName = (code: LanguageCode): string => {
  const names: Record<LanguageCode, string> = {
    en: 'English',
    fr: 'Français'
  };
  return names[code] || 'English';
};
