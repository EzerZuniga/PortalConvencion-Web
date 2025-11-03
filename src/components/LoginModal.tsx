import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Compass, MapPin, Heart } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string, picture?: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Login real con Google OAuth - DEBE estar antes del return
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Obtener información del usuario desde Google
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        
        const { email, name, picture } = userInfo.data;
        onLogin(email, name, picture);
        onClose();
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        alert('Error al iniciar sesión con Google');
      }
    },
    onError: () => {
      console.error('Login Failed');
      alert('Error al iniciar sesión con Google');
    }
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      // Guardar usuario en localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('users', JSON.stringify(users));
      alert('¡Registro exitoso! Ahora puedes iniciar sesión');
      setIsRegistering(false);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      // Verificar login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin(user.email, user.name);
        onClose();
      } else {
        alert('Credenciales incorrectas');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
        {/* Header con imagen de fondo */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 overflow-hidden">
          {/* Patrón decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')] bg-cover bg-center"></div>
          </div>
          
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Logo y título */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                  {isRegistering ? '¡Únete a la aventura!' : '¡Bienvenido de nuevo!'}
                </h2>
              </div>
            </div>
            <p className="text-sm text-white/90 drop-shadow">
              {isRegistering 
                ? 'Crea tu cuenta y descubre los secretos de La Convención' 
                : 'Continúa explorando los destinos más increíbles'}
            </p>
          </div>
        </div>

        {/* Beneficios rápidos */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Guarda destinos</p>
            </div>
            <div className="p-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Crea favoritos</p>
            </div>
            <div className="p-2">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Rutas personalizadas</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          {/* Botón de Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 bg-white dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 shadow-sm"
          >
            <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-200">
              Continuar con Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2">O</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>
          </div>
          {isRegistering && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white placeholder-gray-400"
                  placeholder="Ej: Juan Pérez López"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white placeholder-gray-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {!isRegistering && (
              <div className="text-right mt-1.5">
                <button
                  type="button"
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1 mb-1.5">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg"
          >
            {isRegistering ? 'Crear mi cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          {/* Cambiar entre Login/Registro */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {isRegistering ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm hover:underline"
            >
              {isRegistering ? 'Inicia sesión aquí' : 'Crea tu cuenta gratis'}
            </button>
          </div>

          {/* Política de privacidad */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed px-2">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Política de Privacidad
            </a>
          </p>

          {/* Mensaje inspirador */}
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
            <p className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
              🌿 <span className="text-emerald-700 dark:text-emerald-400">La Convención te espera</span> - Aventura, naturaleza y cultura en cada rincón
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
