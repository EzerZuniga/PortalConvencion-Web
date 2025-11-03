import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, MapPin, Clock, Mail, LogOut, Bell, UserCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LoginModal from './LoginModal';

type NavItem = {
  name: string;
  href: string;
};

const navigation: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/about' },
  { name: 'Destinos', href: '/destinations' },
  { name: 'Gastronomía', href: '/gastronomia' },
  { name: 'Blog', href: '/blog' },
  { name: 'Galería', href: '/gallery' },
  { name: 'Tips', href: '/tips' },
  { name: 'Contacto', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; picture?: string } | null>(null);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Verificar si hay sesión guardada
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, name: string, picture?: string) => {
    const userData = { email, name, picture };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setShowUserMenu(false);
  };

  // Ref para el menú de usuario
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300">
      {/* Top bar profesional - desaparece al hacer scroll */}
      <div 
        className={`w-full bg-white dark:bg-slate-800 transition-all duration-300 overflow-hidden ${
          scrolled 
            ? 'h-0 opacity-0 border-b-0' 
            : 'h-auto py-2.5 opacity-100 border-b border-gray-200 dark:border-slate-700'
        }`}
        style={{ display: scrolled ? 'none' : 'block' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            
            {/* Información de contacto */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="hidden sm:inline">La Convención, Cusco</span>
                <span className="sm:hidden">Quillabamba</span>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Clock size={14} className="flex-shrink-0" />
                <span>Lun - Dom: 7:00 - 19:00</span>
              </div>
              
              <a 
                href="mailto:info@explorandolaconvencion.pe" 
                className="hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" />
                <span>info@explorandolaconvencion.pe</span>
              </a>
            </div>
            
            {/* Redes sociales y mensaje */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-gray-500 dark:text-gray-400">Síguenos:</span>
              
              <div className="flex items-center gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-emerald-600 dark:hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                  title="Síguenos en Facebook"
                >
                  <FaFacebookF className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                  title="Síguenos en Instagram"
                >
                  <FaInstagram className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
                
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-red-600 dark:hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                  title="Síguenos en YouTube"
                >
                  <FaYoutube className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Navegación principal - transparente inicialmente, blanca al hacer scroll */}
      <nav 
        className={`${
          scrolled ? 'bg-white dark:bg-slate-900 shadow-lg' : 'bg-transparent'
        } transition-all duration-300`} 
        role="navigation" 
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center gap-2 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 -ml-2 sm:-ml-3">
              <Link to="/" className="flex items-center group">
                <div className={`${
                  scrolled 
                    ? 'bg-white dark:bg-slate-900 rounded-lg px-2 py-1 shadow-sm' 
                    : 'bg-transparent'
                } transition-all duration-300`}>
                  <img 
                    src="/images/logo navbar.png" 
                    alt="Logo Explorando La Convención" 
                    className="h-8 w-auto sm:h-10 lg:h-12 object-contain transition-all duration-200 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>
            
            {/* Menú principal desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    scrolled 
                      ? 'text-slate-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
                      : 'text-white hover:text-emerald-300'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Controles de usuario - Desktop */}
              <div className="flex items-center gap-3 ml-4">
                <ThemeToggle scrolled={true} />
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
                    >
                      {user.picture ? (
                        <img 
                          src={user.picture} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1B5E20] dark:bg-[#4CAF50] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.split(' ')[0].charAt(0)}
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Menú desplegable */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 py-2 z-50">
                        {/* Mi perfil */}
                        <Link 
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <UserCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-800 dark:text-white font-medium">Mi perfil</span>
                        </Link>

                        {/* Notificaciones */}
                        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-800 dark:text-white font-medium">Mis notificaciones</span>
                        </button>

                        {/* Divisor */}
                        <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>

                        {/* Cerrar sesión */}
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">Cerrar sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" 
                    aria-label="Iniciar sesión"
                    title="Iniciar sesión"
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Controles móvil */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle scrolled={true} />
              {user ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#1B5E20] dark:border-[#4CAF50]"
                >
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1B5E20] dark:bg-[#4CAF50] flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name.split(' ')[0].charAt(0)}
                      </span>
                    </div>
                  )}
                </button>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" 
                  aria-label="Iniciar sesión"
                  title="Iniciar sesión"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 ${
                  scrolled 
                    ? 'text-slate-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-700' 
                    : 'bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur-sm text-white'
                }`}
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`${
            scrolled 
              ? 'bg-white dark:bg-slate-900 shadow-md border-t border-gray-200 dark:border-slate-700' 
              : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-700'
          } transition-all duration-300`}>
            <nav className="px-2 py-3" aria-label="Menú de navegación móvil">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
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
      
      {/* Menú de usuario móvil flotante */}
      {showUserMenu && user && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay para cerrar */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUserMenu(false)}
          />
          
          {/* Menú flotante */}
          <div className="absolute top-20 right-4 left-4 sm:left-auto sm:w-80 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 p-2">
            {/* Perfil */}
            <Link 
              to="/profile"
              onClick={() => setShowUserMenu(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 transition-colors duration-200"
            >
              <UserCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Mi perfil</span>
            </Link>
            
            {/* Notificaciones */}
            <button 
              onClick={() => {
                setShowUserMenu(false);
                // TODO: Navigate to notifications page
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-200 transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Mis notificaciones</span>
            </button>
            
            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>
            
            {/* Cerrar sesión */}
            <button 
              onClick={() => {
                setShowUserMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </header>
  );
};

export default Navbar;