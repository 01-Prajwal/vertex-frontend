import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, login, logout } = useContext(AuthContext);
const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Toggle login status (for demo purposes)
  const handleLogin = () => {
    // Simulated token for testing purposes
    navigate('/login');
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const toggleLogin = () => {
    
  }
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 left-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <a href="/dashboard" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">WaveConnect</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}

          
          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex md:items-center">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
                  U
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md"
                >
                  Login
                </button>
                <span onClick={()=>navigate('/register'	)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                  Sign Up
                </span>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
  
          
          {/* Auth Buttons (Mobile) */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-5 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
                    U
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto text-sm text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 flex flex-col space-y-2">
                <button
                  onClick={toggleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                >
                  Login
                </button>
                <a href="/signup" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}