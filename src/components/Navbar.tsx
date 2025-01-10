import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const location = useLocation(); // Get the current route

  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < prevScrollY || currentScrollY <= 0);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Determine the text color based on the route
  const isBlackText = 
    location.pathname === '/';

  const textColor = isBlackText ? 'text-white' : 'text-black';
  const hoverTextColor = isBlackText ? 'hover:text-amber-800' : 'hover:text-amber-800';
  const textColor2 = 'text-black';

  return (
    <>
      <nav
        className={`fixed w-full bg-transparent z-50 transition-transform ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Section */}
            <div className="text-2xl font-serif">
              <Link to="/" className="flex items-center space-x-2">
                <span className="bg-amber-800 text-white px-3 py-1 rounded-lg">BH</span>
                <span className={`ml-2 ${textColor}`}>Villa</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${textColor} ${hoverTextColor} transition-colors`}>Home</Link>
              <Link to="#about" className={`${textColor} ${hoverTextColor} transition-colors`}>About</Link>
              <Link to="/amenities" className={`${textColor} ${hoverTextColor} transition-colors`}>Amenities</Link>
              <Link to="/rooms" className={`${textColor} ${hoverTextColor} transition-colors`}>Rooms</Link>
              <Link to="/contacts" className={`${textColor} ${hoverTextColor} transition-colors`}>Contact</Link>

              {/* User Section */}
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 bg-amber-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <User size={18} />
                    <span>{user.displayName || "Profile"}</span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className={`block px-3 py-2 ${textColor2} hover:bg-gray-100`}>Home</Link>
              <Link to="#about" className={`block px-3 py-2 ${textColor2} hover:bg-gray-100`}>About</Link>
              <Link to="/amenities" className={`block px-3 py-2 ${textColor2} hover:bg-gray-100`}>Amenities</Link>
              <Link to="/rooms" className={`block px-3 py-2 ${textColor2} hover:bg-gray-100`}>Rooms</Link>
              <Link to="/contacts" className={`block px-3 py-2 ${textColor2} hover:bg-gray-100`}>Contact</Link>

              {/* User Section */}
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User size={18} className="mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
