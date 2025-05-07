import React from 'react';

interface LanguageDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  value,
  onChange,
  id = "language",
  name = "language",
  className = "",
  label,
  required = false,
}) => {
  const languages = [
    { code: "", name: "Select a language" },
    { code: "en", name: "English" },
    { code: "fr", name: "French (Français)" },
    // { code: "es", name: "Spanish (Español)" },
    // { code: "de", name: "German (Deutsch)" },
    // { code: "it", name: "Italian (Italiano)" },
    // { code: "pt", name: "Portuguese (Português)" },
    // { code: "nl", name: "Dutch (Nederlands)" },
    // { code: "ru", name: "Russian (Русский)" },
    // { code: "zh", name: "Chinese (中文)" },
    // { code: "ja", name: "Japanese (日本語)" },
  ];

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
