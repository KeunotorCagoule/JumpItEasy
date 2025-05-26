import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import LanguageToggle from "../common/LanguageToggle";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="src/public/logo.svg"
                alt="JumpItEasy Logo"
                className="h-14 w-14 mt-2 filter-blue"
                style={{
                  filter:
                    "invert(23%) sepia(90%) saturate(1352%) hue-rotate(209deg) brightness(96%) contrast(96%)",
                }}
              />
              <span className="text-xl font-bold text-gray-900">
                JumpItEasy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              {t("navigation.home")}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              {t("navigation.about")}
            </Link>
            <Link to="/parcours" className="text-gray-700 hover:text-blue-600">
              {t("navigation.courses")}
            </Link>
            <Link
              to="/parcours/generate"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {t("navigation.generateCourse")}
            </Link>

            {/* Language Toggle Flag */}
            <LanguageToggle className="ml-3" />

            {/* Conditional rendering based on login status */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  {t("navigation.login")}
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  {t("navigation.register")}
                </Link>
              </>            ) : (
              <UserHeader onLogout={handleLogout} />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {t("navigation.home")}
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {t("navigation.about")}
            </Link>
            <Link
              to="/parcours"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {t("navigation.courses")}
            </Link>
            <Link
              to="/parcours/generate"
              className="block px-3 py-2 text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {t("navigation.generateCourse")}
            </Link>

            {/* Language Toggle for Mobile */}
            <div className="px-3 py-2 flex">
              <span className="mr-2 text-gray-700">
                {t("common.language")}:
              </span>
              <LanguageToggle />
            </div>

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <button
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                {t("navigation.logout")}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navigation.login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navigation.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
