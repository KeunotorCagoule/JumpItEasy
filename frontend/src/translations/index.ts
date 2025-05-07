import en from './en';
import fr from './fr';

export const translations = {
  en,
  fr
};

export type LanguageCode = keyof typeof translations;

export default translations;
