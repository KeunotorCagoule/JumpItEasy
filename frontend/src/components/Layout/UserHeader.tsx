import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface UserHeaderProps {
  user: { username: string };
  onLogout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="mr-3 h-4 w-4" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Link>
          <button
            onClick={() => {
              onLogout();
              setIsDropdownOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
