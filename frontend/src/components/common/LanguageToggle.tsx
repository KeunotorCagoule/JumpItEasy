import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center ${className}`}
      aria-label={`Change language to ${language === 'en' ? 'French' : 'English'}`}
    >
      <span className="font-medium text-sm">
        {language === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
      </span>
    </button>
  );
};

export default LanguageToggle;
