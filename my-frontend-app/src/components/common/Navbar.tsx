import { User, Menu, X, Brain, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTestsDropdownOpen, setIsTestsDropdownOpen] = useState(false);
  const [isInterviewDropdownOpen, setIsInterviewDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleInterviewClick = (path: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const testCategories = [
    { name: 'Reasoning Test', path: '/test/reasoning' },
    { name: 'Psychology Test', path: '/test/psychology' },
    { name: 'GTO Test', path: '/test/gto' },
    { name: 'Personality Test', path: '/test/personality' },
    { name: 'Education Test', path: '/test/education' },
    { name: 'Career Test', path: '/test/career' }
  ];

  const interviewCategories = [
    { name: 'GD (Group Discussion)', path: '/interview/gd' },
    { name: 'GPE', path: '/interview/gpe' },
    { name: 'Obstacle Test', path: '/interview/obstacle' }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 lg:left-8 lg:right-8 z-50 bg-white/75 backdrop-blur-md rounded-2xl border border-white/40 shadow-elevated-low transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-accent-600" />
            <span className="text-2xl font-bold text-gray-900">ZPluse Counselling</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
              Home
            </Link>

            {/* Tests Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsTestsDropdownOpen(true)}
              onMouseLeave={() => setIsTestsDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-accent-600 font-medium transition-colors py-2">
                Tests
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTestsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Invisible bridge to prevent dropdown from closing */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

              {/* Dropdown Menu */}
              {isTestsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transform transition-all duration-200 ease-out">
                    <Link
                      to="/tests"
                      className="block px-4 py-3 text-gray-700 hover:bg-accent-50 hover:text-accent-700 transition-colors font-medium"
                    >
                      All Tests
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    {testCategories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="block px-4 py-3 text-gray-700 hover:bg-accent-50 hover:text-accent-700 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interview Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsInterviewDropdownOpen(true)}
              onMouseLeave={() => setIsInterviewDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-accent-600 font-medium transition-colors py-2">
                Interview
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isInterviewDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Invisible bridge to prevent dropdown from closing */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

              {/* Dropdown Menu */}
              {isInterviewDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transform transition-all duration-200 ease-out">
                    {interviewCategories.map((category) => (
                      <button
                        key={category.path}
                        onClick={() => {
                          handleInterviewClick(category.path);
                          setIsInterviewDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-accent-50 hover:text-accent-700 transition-colors"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/career" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
              Career
            </Link>

            <Link to="/blog" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
              Blog
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                  Profile
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-accent-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-accent-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Tests Menu */}
            <div>
              <Link
                to="/tests"
                className="block text-gray-700 hover:text-accent-600 font-medium mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                All Tests
              </Link>
              <div className="ml-4 space-y-2">
                {testCategories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className="block text-gray-600 hover:text-accent-600 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Interview Menu */}
            <div>
              <div className="text-gray-700 font-medium mb-2">Interview</div>
              <div className="ml-4 space-y-2">
                {interviewCategories.map((category) => (
                  <button
                    key={category.path}
                    onClick={() => {
                      handleInterviewClick(category.path);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-accent-600 text-sm"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/career"
              className="block text-gray-700 hover:text-accent-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Career
            </Link>

            <Link
              to="/blog"
              className="block text-gray-700 hover:text-accent-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-accent-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:text-accent-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-accent-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;