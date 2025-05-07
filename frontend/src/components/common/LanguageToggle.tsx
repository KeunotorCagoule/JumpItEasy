import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { updateLanguagePreference } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, changeLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    
    // Change language locally
    changeLanguage(newLanguage);
    
    // If user is logged in, update language preference in database
    if (isLoggedIn) {
      try {
        await updateLanguagePreference(newLanguage);
        console.log('Language preference updated in database');
      } catch (error) {
        console.error('Failed to update language preference in database:', error);
      }
    }
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
