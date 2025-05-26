import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, LandPlot, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

interface UserHeaderProps {
  onLogout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onLogout }) => {
  const { t } = useLanguage();
  const { tokenExpiresIn, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Format du temps restant en mm:ss
  const formatTimeRemaining = (seconds: number | null): string => {
    if (seconds === null) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 bg-white p-2 rounded-full hover:bg-gray-50 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.username}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-[-50px] mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
          {/* Afficher le temps restant si le token expire dans moins de 10 minutes */}
          {tokenExpiresIn !== null && tokenExpiresIn < 600 && (
            <div className="flex items-center px-4 py-2 text-sm text-amber-600 border-b border-gray-100">
              <Clock className="mr-3 h-4 w-4" />
              <span>Session: {formatTimeRemaining(tokenExpiresIn)}</span>
            </div>
          )}

          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="mr-3 h-4 w-4" />
            {t("userHeader.profile")}
          </Link>
          <Link
            to="/parcours/mes-parcours"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <LandPlot className="mr-3 h-4 w-4" />
            {t("userHeader.ownCourses")}
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings className="mr-3 h-4 w-4" />
            {t("userHeader.settings")}
          </Link>
          <button
            onClick={() => {
              onLogout();
              setIsDropdownOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-4 w-4" />
            {t("userHeader.signOut")}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
