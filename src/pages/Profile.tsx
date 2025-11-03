import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Shield, Settings, Bell, Eye, Lock, LogOut, ArrowLeft, CheckCircle, Heart, BookmarkCheck, MessageSquare } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string; picture?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 sm:mb-8 transition-all duration-200 hover:gap-3"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold">Volver al inicio</span>
        </button>

        {/* Header de perfil con diseño mejorado */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 border border-gray-100 dark:border-slate-700 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
            {/* Avatar grande */}
            <div className="relative">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-emerald-500 dark:border-emerald-400 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center border-4 border-emerald-500 shadow-lg">
                  <span className="text-white font-bold text-5xl sm:text-6xl lg:text-7xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                <CheckCircle size={20} className="text-white" />
              </div>
            </div>

            {/* Información del usuario */}
            <div className="flex-1 text-center lg:text-left w-full">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight leading-tight">
                {user.name}
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-gray-600 dark:text-gray-400">
                <Mail size={18} className="flex-shrink-0" />
                <p className="text-sm sm:text-base break-all font-light">{user.email}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-5">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle size={18} />
                  <span className="font-semibold">Cuenta verificada</span>
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">
                  <Shield size={18} />
                  <span className="font-semibold">Google Account</span>
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
                Bienvenido a tu perfil personal. Aquí puedes gestionar tu información, preferencias y configuración de cuenta.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs mejorados */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 min-w-fit py-5 sm:py-6 px-8 sm:px-10 text-center font-medium transition-all duration-200 text-base sm:text-lg ${
                  activeTab === 'profile'
                    ? 'border-b-3 border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/30'
                }`}
              >
                <User className="inline-block mr-2.5" size={22} />
                <span className="hidden sm:inline font-semibold">Mi Perfil</span>
                <span className="sm:hidden font-semibold">Perfil</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 min-w-fit py-5 sm:py-6 px-8 sm:px-10 text-center font-medium transition-all duration-200 text-base sm:text-lg ${
                  activeTab === 'settings'
                    ? 'border-b-3 border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/30'
                }`}
              >
                <Settings className="inline-block mr-2.5" size={22} />
                <span className="hidden sm:inline font-semibold">Configuración</span>
                <span className="sm:hidden font-semibold">Config</span>
              </button>
            </nav>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            {activeTab === 'profile' ? (
              /* Pestaña de Perfil */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                    Información de la cuenta
                  </h2>
                  <div className="space-y-5">
                    {/* Nombre completo */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <User className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Nombre completo</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white break-words">{user.name}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-blue-600 dark:text-blue-400" size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Correo electrónico</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white break-all">{user.email}</p>
                        <div className="flex items-center gap-1.5 mt-3">
                          <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Verificado</p>
                        </div>
                      </div>
                    </div>

                    {/* Proveedor */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Shield className="text-purple-600 dark:text-purple-400" size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Proveedor de autenticación</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">Google</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-light">Tu cuenta está protegida por Google</p>
                      </div>
                    </div>

                    {/* Fecha de registro */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-orange-600 dark:text-orange-400" size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Miembro desde</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                    Tu actividad
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 sm:p-7 text-white shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <BookmarkCheck size={24} />
                        </div>
                      </div>
                      <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-3">Artículos guardados</p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 sm:p-7 text-white shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                          <MessageSquare size={26} />
                        </div>
                      </div>
                      <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-3">Comentarios</p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 sm:p-7 text-white shadow-md sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                          <Heart size={26} />
                        </div>
                      </div>
                      <p className="text-purple-100 text-sm font-medium uppercase tracking-wider mb-3">Me gusta dados</p>
                      <p className="text-5xl font-bold">0</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Pestaña de Configuración */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                    Preferencias
                  </h2>
                  <div className="space-y-5">
                    {/* Notificaciones */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Bell className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Notificaciones</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">Gestiona tus alertas y recordatorios</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg w-full sm:w-auto transition-colors">
                        Configurar
                      </button>
                    </div>

                    {/* Privacidad */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                          <Eye className="text-purple-600 dark:text-purple-400" size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Privacidad</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">Controla quién puede ver tu información</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg w-full sm:w-auto transition-colors">
                        Ver opciones
                      </button>
                    </div>

                    {/* Seguridad */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
                      <div className="flex items-start sm:items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                          <Lock className="text-orange-600 dark:text-orange-400" size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Seguridad</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">Protege tu cuenta con opciones avanzadas</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 text-base font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg w-full sm:w-auto transition-colors">
                        Revisar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zona de peligro */}
                <div className="pt-4">
                  <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2 tracking-tight">
                    <Shield size={22} />
                    Zona de peligro
                  </h2>
                  <div className="space-y-5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-700/50 rounded-xl border-2 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <LogOut className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-semibold text-red-600 dark:text-red-400">Cerrar sesión</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">Salir de tu cuenta de forma segura</p>
                        </div>
                      </div>
                      <LogOut size={22} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
