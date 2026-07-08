import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/menu', label: 'Menú' },
    { to: '/resenas', label: 'Reseñas' },
    { to: '/reservas', label: 'Reservas' },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl text-amber-900 font-bold tracking-tight">El Bodegón</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-amber-700 ${
                      isActive ? 'text-amber-700 border-b-2 border-amber-700 pb-1' : 'text-gray-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* User Actions Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-amber-700" />
                    Hola, {user?.nombre}
                  </span>
                  <button 
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-amber-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors"
                >
                  Iniciar sesión
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-amber-900 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium ${
                      isActive ? 'bg-amber-50 text-amber-900' : 'text-gray-700 hover:bg-gray-50 hover:text-amber-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-3 px-3">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User size={16} className="text-amber-700" />
                      {user?.nombre}
                    </span>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-sm text-red-600 font-medium w-full py-2"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-amber-900 bg-amber-50"
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
