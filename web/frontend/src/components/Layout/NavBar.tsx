import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Users as Horse } from "lucide-react";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

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
              <Horse className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                JumpItEasy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/parcours" className="text-gray-700 hover:text-blue-600">
              Courses
            </Link>
            <Link
              to="/parcours/generate"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate Course
            </Link>

            {/* Conditional rendering based on login status */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <UserHeader
                user={{ username: username || "User" }}
                onLogout={handleLogout}
              />
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/parcours"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/parcours/generate"
              className="block px-3 py-2 text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Generate Course
            </Link>
            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <button
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Register
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
