import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, MapPin, Clock, Mail, LogOut, Bell, UserCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import ThemeToggle from '@/components/features/theme';
import LoginModal from '@/components/features/auth';
import { NAVIGATION } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';
import { useScrollPosition, useClickOutside } from '@/hooks';
import type { User as UserType } from '@/types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const location = useLocation();
  const scrolled = useScrollPosition(50);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const closeUserMenu = useCallback(() => setShowUserMenu(false), []);
  useClickOutside(userMenuRef, closeUserMenu);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem('currentUser');
    }
  }, []);

  const handleLogin = (email: string, name: string, picture?: string) => {
    const userData: UserType = { email, name, picture };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setShowUserMenu(false);
  };

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300">
      {/* Top bar */}
      <div
        className={`w-full bg-white dark:bg-primary-900 transition-all duration-300 overflow-hidden ${
          scrolled
            ? 'h-0 opacity-0 border-b-0'
            : 'h-auto py-2.5 opacity-100 border-b border-earth-200 dark:border-primary-700'
        }`}
        style={{ display: scrolled ? 'none' : 'block' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-ink-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="hidden sm:inline">{SITE_CONFIG.contact.location}</span>
                <span className="sm:hidden">Quillabamba</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-ink-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                <Clock size={14} className="flex-shrink-0" />
                <span>{SITE_CONFIG.contact.schedule}</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="hidden lg:flex items-center gap-2 text-ink-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" />
                <span>{SITE_CONFIG.social.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-ink-500 dark:text-slate-400">Síguenos:</span>
              <div className="flex items-center gap-2">
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-earth-100 dark:bg-primary-700 hover:bg-accent-600 dark:hover:bg-accent-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Facebook" title="Síguenos en Facebook">
                  <FaFacebookF className="text-sm text-ink-700 dark:text-white hover:text-white" />
                </a>
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-earth-100 dark:bg-primary-700 hover:bg-accent-600 dark:hover:bg-accent-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Instagram" title="Síguenos en Instagram">
                  <FaInstagram className="text-sm text-ink-700 dark:text-white hover:text-white" />
                </a>
                <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-earth-100 dark:bg-primary-700 hover:bg-accent-700 dark:hover:bg-accent-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="YouTube" title="Síguenos en YouTube">
                  <FaYoutube className="text-sm text-ink-700 dark:text-white hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`${
          scrolled ? 'bg-white/95 dark:bg-primary-950/95 backdrop-blur-md shadow-lg border-b border-earth-200 dark:border-primary-700' : 'bg-transparent'
        } transition-all duration-300`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center gap-2 sm:gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group relative z-10" aria-label="Ir al inicio - Explorando La Convención">
              <img
                src="/images/logos.png"
                alt="Explorando La Convención - Turismo en Quillabamba"
                className={`${scrolled ? 'h-10 sm:h-12 lg:h-14' : 'h-9 sm:h-11 lg:h-12'} w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMEE4NkIiLz48dGV4dCB4PSIxMDAiIHk9IjM1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FeHBsb3JhbmRvPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    scrolled
                      ? 'text-ink-800 dark:text-slate-200 hover:text-accent-600 dark:hover:text-accent-300'
                      : 'text-white hover:text-accent-200'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center gap-3 ml-4">
                <ThemeToggle scrolled={scrolled} />
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-earth-300 dark:border-primary-600 hover:border-accent-500 dark:hover:border-accent-400 transition-colors"
                    >
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-primary-900 dark:bg-primary-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{user.name.split(' ')[0].charAt(0)}</span>
                        </div>
                      )}
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-primary-900 rounded-lg shadow-2xl border border-earth-200 dark:border-primary-700 py-2 z-50">
                        <Link to="/profile" onClick={() => setShowUserMenu(false)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-earth-100 dark:hover:bg-primary-700 transition-colors">
                          <UserCircle className="w-5 h-5 text-ink-600 dark:text-slate-400" />
                          <span className="text-sm text-ink-800 dark:text-white font-medium">Mi perfil</span>
                        </Link>
                        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-earth-100 dark:hover:bg-primary-700 transition-colors">
                          <Bell className="w-5 h-5 text-ink-600 dark:text-slate-400" />
                          <span className="text-sm text-ink-800 dark:text-white font-medium">Mis notificaciones</span>
                        </button>
                        <div className="border-t border-earth-200 dark:border-primary-700 my-2" />
                        <button onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Cerrar sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                      scrolled ? 'text-ink-900 dark:text-white' : 'text-white'
                    }`}
                    aria-label="Iniciar sesión" title="Iniciar sesión"
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle scrolled={scrolled} />
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 rounded-full overflow-hidden transition-colors duration-200"
                >
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-primary-900 dark:bg-primary-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.name.split(' ')[0].charAt(0)}</span>
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    scrolled ? 'text-ink-900 dark:text-white' : 'text-white'
                  }`}
                  aria-label="Iniciar sesión" title="Iniciar sesión"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  scrolled ? 'text-ink-900 dark:text-slate-200' : 'text-white'
                }`}
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`${
            scrolled
              ? 'bg-white dark:bg-primary-950 shadow-md border-t border-earth-200 dark:border-primary-700'
              : 'bg-white/95 dark:bg-primary-950/95 backdrop-blur-md border-t border-earth-200 dark:border-primary-700'
          } transition-all duration-300`}>
            <nav className="px-2 py-3" aria-label="Menú de navegación móvil">
              <ul className="space-y-1">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-accent-50 dark:bg-accent-900/25 text-accent-700 dark:text-accent-300'
                          : 'text-ink-700 dark:text-slate-200 hover:bg-earth-100 dark:hover:bg-primary-800 hover:text-accent-600 dark:hover:text-accent-300'
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </nav>

      {/* Mobile user menu overlay */}
      {showUserMenu && user && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowUserMenu(false)} />
          <div className="absolute top-20 right-4 left-4 sm:left-auto sm:w-80 bg-white dark:bg-primary-900 rounded-lg shadow-2xl border border-earth-200 dark:border-primary-700 p-2">
            <Link to="/profile" onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-earth-100 dark:hover:bg-primary-700 text-ink-700 dark:text-slate-200 transition-colors duration-200">
              <UserCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Mi perfil</span>
            </Link>
            <button onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-earth-100 dark:hover:bg-primary-700 text-ink-700 dark:text-slate-200 transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Mis notificaciones</span>
            </button>
            <div className="border-t border-earth-200 dark:border-primary-700 my-2" />
            <button onClick={() => { setShowUserMenu(false); handleLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </header>
  );
};

export default Navbar;

