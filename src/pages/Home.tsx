import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Camera, Compass, TrendingUp, Utensils, Heart, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';
import { SEO } from '../components/SEO';

// Hook personalizado para animación de contadores
const useCounterAnimation = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function para animación suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - start) + start);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration, start]);

  return { count, counterRef };
};

const Home: React.FC = () => {
  const featuredPosts = posts.filter(post => post.featured);
  
  // Contadores animados
  const counter1 = useCounterAnimation(30, 2000);
  const counter2 = useCounterAnimation(50, 2500);
  const counter3 = useCounterAnimation(100, 3000);
  const counter4 = useCounterAnimation(365, 3500);
  const counter5 = useCounterAnimation(500, 2500);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <SEO 
        title="Explorando la Convención - Blog de Viajes y Turismo en Perú | Guías Completas"
        description="Descubre los mejores destinos turísticos de La Convención, Cusco y Perú. Guías de viaje, consejos prácticos, gastronomía y experiencias únicas de aventura."
        keywords="La Convención, turismo Cusco, viajes Perú, destinos turísticos, blog de viajes, guías de viaje, aventuras, gastronomía peruana"
        url="https://explorando-la-convencion-web-eta.vercel.app/"
      />
      {/* Hero Section - Colores Oficiales La Convención */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image sin overlay verde */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtLmESg9m4Ye5KSBetVfv5AqKodquKb3oMg&s" 
            alt="La Convención - Cusco" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-4 tracking-tight">
              Descubre la magia de
              <span className="block bg-gradient-to-r from-[#FDD835] via-[#4CAF50] to-[#FDD835] bg-clip-text text-transparent mt-2 drop-shadow-lg">
                La Convención
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md font-light">
              Explora destinos increíbles, conoce nuestra rica cultura y vive experiencias inolvidables en el corazón de Cusco
            </p>
            
            {/* CTA Buttons - Colores Oficiales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 px-4">
              <Link
                to="/destinations"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#FDD835] text-[#212121] font-bold rounded-lg transition-all duration-500 shadow-xl hover:shadow-2xl uppercase tracking-wide overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#C62828] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explorar Destinos</span>
                <Compass className="relative z-10 w-5 h-5 group-hover:rotate-180 group-hover:text-white transition-all duration-500" />
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#1B5E20] font-bold rounded-lg border-3 border-white transition-all duration-500 shadow-xl hover:shadow-2xl uppercase tracking-wide overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#1B5E20] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                <Camera className="relative z-10 w-5 h-5 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Ver Galería</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Información sobre La Convención - Colores Oficiales */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              ATENCIÓN AL VISITANTE
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-4"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Información y servicios disponibles para hacer de tu visita una experiencia inolvidable
            </p>
          </div>

          {/* Características Principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {/* Destinos Naturales */}
            <Link to="/destinations" className="group block h-full">
              <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl border-2 border-[#E8F5E9] dark:border-slate-700 overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Animación de color desde el centro */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20] via-[#4CAF50] to-[#1B5E20] transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out origin-center"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-700 group-hover:bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 shadow-lg border-3 border-[#212121] dark:border-white group-hover:border-[#1B5E20]">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#212121] dark:text-white group-hover:text-[#1B5E20]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1B5E20] dark:text-white group-hover:text-white mb-2 sm:mb-3 transition-colors duration-500 uppercase tracking-wide">
                    Destinos Naturales
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121] dark:text-gray-300 group-hover:text-white/95 leading-relaxed transition-colors duration-500">
                    Cascadas, bosques tropicales y paisajes únicos
                  </p>
                </div>
              </div>
            </Link>

            {/* Gastronomía Regional */}
            <Link to="/gastronomia" className="group block h-full">
              <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl border-2 border-[#FFF9C4] dark:border-slate-700 overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Animación de color desde el centro */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDD835] via-[#FBC02D] to-[#FDD835] transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out origin-center"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-700 group-hover:bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 shadow-lg border-3 border-[#212121] dark:border-white group-hover:border-[#212121]">
                    <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-[#212121] dark:text-white group-hover:text-[#212121]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1B5E20] dark:text-white group-hover:text-[#1B5E20] mb-2 sm:mb-3 transition-colors duration-500 uppercase tracking-wide">
                    Gastronomía Regional
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121] dark:text-gray-300 group-hover:text-[#1B5E20]/95 leading-relaxed transition-colors duration-500">
                    Sabores auténticos con productos locales
                  </p>
                </div>
              </div>
            </Link>

            {/* Cultura Andina */}
            <Link to="/about" className="group block h-full">
              <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl border-2 border-[#FFEBEE] dark:border-slate-700 overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Animación de color desde el centro */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C62828] via-[#E53935] to-[#C62828] transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out origin-center"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-700 group-hover:bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 shadow-lg border-3 border-[#212121] dark:border-white group-hover:border-[#C62828]">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#212121] dark:text-white group-hover:text-[#C62828]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1B5E20] dark:text-white group-hover:text-white mb-2 sm:mb-3 transition-colors duration-500 uppercase tracking-wide">
                    Cultura Andina
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121] dark:text-gray-300 group-hover:text-white/95 leading-relaxed transition-colors duration-500">
                    Tradiciones ancestrales vivas y únicas
                  </p>
                </div>
              </div>
            </Link>

            {/* Guías y Consejos */}
            <Link to="/tips" className="group block h-full">
              <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl border-2 border-[#E8F5E9] dark:border-slate-700 overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Animación de color desde el centro */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50] via-[#66BB6A] to-[#4CAF50] transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out origin-center"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-700 group-hover:bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 shadow-lg border-3 border-[#212121] dark:border-white group-hover:border-[#4CAF50]">
                    <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#212121] dark:text-white group-hover:text-[#4CAF50]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1B5E20] dark:text-white group-hover:text-white mb-2 sm:mb-3 transition-colors duration-500 uppercase tracking-wide">
                    Guías y Consejos
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121] dark:text-gray-300 group-hover:text-white/95 leading-relaxed transition-colors duration-500">
                    Información útil para tu viaje seguro
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas y Datos - Diseño Alternado Horizontal */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F5F5F5] dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              LA CONVENCIÓN EN CIFRAS
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-4"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Datos destacados que reflejan la riqueza y diversidad de nuestra provincia
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Estadística 1: Distritos - Imagen Izquierda */}
            <div ref={counter1.counterRef} className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 border-[#4CAF50] dark:border-[#4CAF50]">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen */}
                <div className="relative h-48 md:h-auto overflow-hidden">
                  <img 
                    src="" 
                    alt="Distritos de La Convención" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/20 to-transparent"></div>
                </div>
                
                {/* Contenido */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-700 border-3 border-[#212121] dark:border-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] dark:text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212121] dark:text-white tracking-tight">
                      {counter1.count}+
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#212121] dark:text-white mb-3 uppercase tracking-wide">
                    Distritos
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cada uno con su propia identidad cultural y atractivos únicos que reflejan la riqueza de nuestra provincia.
                  </p>
                </div>
              </div>
            </div>

            {/* Estadística 2: Atractivos - Imagen Derecha */}
            <div ref={counter2.counterRef} className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-r-4 border-[#FDD835] dark:border-[#FDD835]">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Contenido - Orden invertido en desktop */}
                <div className="p-6 sm:p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-700 border-3 border-[#212121] dark:border-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] dark:text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212121] dark:text-white tracking-tight">
                      {counter2.count}+
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#212121] dark:text-white mb-3 uppercase tracking-wide">
                    Atractivos Turísticos
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Destinos turísticos que te conectan con la naturaleza y te invitan a descubrir paisajes inolvidables.
                  </p>
                </div>
                
                {/* Imagen */}
                <div className="relative h-48 md:h-auto overflow-hidden order-1 md:order-2">
                  <img 
                    src="/images/destinos/andes-trekking.jpg" 
                    alt="Atractivos Turísticos" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#FDD835]/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Estadística 3: Platos Típicos - Imagen Izquierda */}
            <div ref={counter3.counterRef} className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 border-[#C62828] dark:border-[#C62828]">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen */}
                <div className="relative h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/images/galeria/comida-asiatica.jpg" 
                    alt="Platos Típicos" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C62828]/20 to-transparent"></div>
                </div>
                
                {/* Contenido */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-700 border-3 border-[#212121] dark:border-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Utensils strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] dark:text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212121] dark:text-white tracking-tight">
                      {counter3.count}+
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#212121] dark:text-white mb-3 uppercase tracking-wide">
                    Platos Típicos
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Sabores auténticos de la selva que deleitan tu paladar con ingredientes frescos y recetas ancestrales.
                  </p>
                </div>
              </div>
            </div>

            {/* Estadística 4: Días de Aventura - Imagen Derecha */}
            <div ref={counter4.counterRef} className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-r-4 border-[#1B5E20] dark:border-[#4CAF50]">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Contenido - Orden invertido en desktop */}
                <div className="p-6 sm:p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-700 border-3 border-[#212121] dark:border-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] dark:text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212121] dark:text-white tracking-tight">
                      {counter4.count}
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-[#212121] dark:text-white mb-3 uppercase tracking-wide">
                    Días de Aventura
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Clima tropical perfecto para explorar todo el año y vivir experiencias únicas en cada temporada.
                  </p>
                </div>
                
                {/* Imagen */}
                <div className="relative h-48 md:h-auto overflow-hidden order-1 md:order-2">
                  <img 
                    src="/images/galeria/fotografia.jpg" 
                    alt="Aventura todo el año" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#1B5E20]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dato Curioso Destacado */}
          <div ref={counter5.counterRef} className="mt-8 sm:mt-10">
            <div className="group bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] dark:from-[#1B5E20] dark:to-[#2E7D32] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-3 border-[#FDD835]">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Imagen */}
                <div className="relative h-48 md:h-auto overflow-hidden">
                  <img 
                    src="/images/viajes/tren-europa.jpg" 
                    alt="Biodiversidad de La Convención" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1B5E20]/30"></div>
                </div>
                
                {/* Contenido - Ocupa 2 columnas */}
                <div className="md:col-span-2 p-6 sm:p-8 flex items-center">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                      {/* Ícono */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-slate-800 border-3 border-[#212121] dark:border-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles strokeWidth={2.5} className="w-6 h-6 sm:w-7 sm:h-7 text-[#212121] dark:text-white" />
                      </div>
                      
                      {/* Texto */}
                      <div className="text-white text-center sm:text-left space-y-2 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold leading-tight">
                          La provincia más verde de Cusco
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                          Hogar de más de <span className="font-bold text-[#FDD835] text-base sm:text-lg">{counter5.count}+</span> especies de aves y una biodiversidad incomparable que la convierte en un paraíso natural.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trámites y Servicios - Colores Oficiales */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F5F5F5] to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              ATENCIÓN AL VISITANTE
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-4"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Todo lo que necesitas saber para disfrutar tu visita
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/destinations" className="group bg-white dark:bg-slate-800 border-2 border-[#E8F5E9] dark:border-slate-700 hover:border-[#4CAF50] dark:hover:border-emerald-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#4CAF50] transition-all duration-300 shadow-md">
                  <MapPin className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#4CAF50]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Destinos Naturales
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cascadas, bosques tropicales y paisajes únicos
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/gastronomia" className="group bg-white dark:bg-slate-800 border-2 border-[#FFF9C4] dark:border-slate-700 hover:border-[#FDD835] dark:hover:border-orange-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#FDD835] transition-all duration-300 shadow-md">
                  <Utensils className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#FDD835]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Gastronomía Regional
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Sabores auténticos con productos locales
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/gallery" className="group bg-white dark:bg-slate-800 border-2 border-[#E8F5E9] dark:border-slate-700 hover:border-[#4CAF50] dark:hover:border-blue-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#1B5E20] transition-all duration-300 shadow-md">
                  <Camera className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#1B5E20]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Cultura Andina
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Tradiciones ancestrales vivas y únicas
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/tips" className="group bg-white dark:bg-slate-800 border-2 border-[#E8F5E9] dark:border-slate-700 hover:border-[#1B5E20] dark:hover:border-purple-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#1B5E20] transition-all duration-300 shadow-md">
                  <Compass className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#1B5E20]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Guías y Consejos
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Información útil para tu viaje seguro
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/about" className="group bg-white dark:bg-slate-800 border-2 border-[#FFEBEE] dark:border-slate-700 hover:border-[#C62828] dark:hover:border-pink-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#C62828] transition-all duration-300 shadow-md">
                  <Heart className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#C62828]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Cultura y Tradición
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Conoce nuestras costumbres ancestrales
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/blog" className="group bg-white dark:bg-slate-800 border-2 border-[#E8F5E9] dark:border-slate-700 hover:border-[#4CAF50] dark:hover:border-teal-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 border-3 border-[#212121] dark:border-white group-hover:border-[#4CAF50] transition-all duration-300 shadow-md">
                  <TrendingUp className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#4CAF50]" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">
                    Noticias y Blog
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Artículos y novedades sobre la región
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog y Contenido Destacado */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              ÚLTIMAS PUBLICACIONES
            </h2>
            <div className="w-24 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Guías, historias y consejos para aprovechar al máximo tu visita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-10 sm:mt-12">
            <Link 
              to="/blog" 
              className="group relative inline-flex items-center gap-2 px-10 py-4 bg-[#FDD835] text-[#212121] font-bold rounded-lg uppercase tracking-wide transition-all duration-500 shadow-xl hover:shadow-2xl text-sm overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#1B5E20] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Descubre Más</span>
              <TrendingUp className="relative z-10 w-5 h-5 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recomendaciones para Viajeros */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#4CAF50] dark:from-emerald-800 dark:via-emerald-700 dark:to-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
              PREPARA TU VIAJE
            </h2>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-light">
              Consejos esenciales para una experiencia segura e inolvidable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mb-5 border-3 border-[#212121] dark:border-white shadow-lg">
                <CheckCircle className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-4 uppercase tracking-wide">Planifica</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Investiga destinos, verifica el clima y reserva con anticipación para una mejor experiencia.
              </p>
            </div>

            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mb-5 border-3 border-[#212121] dark:border-white shadow-lg">
                <Compass className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-4 uppercase tracking-wide">Explora</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Descubre cascadas, bosques tropicales y paisajes únicos con guías locales certificados.
              </p>
            </div>

            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mb-5 border-3 border-[#212121] dark:border-white shadow-lg">
                <Heart className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-4 uppercase tracking-wide">Disfruta</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Vive la cultura, gastronomía y hospitalidad única de La Convención.
              </p>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link 
              to="/tips" 
              className="group relative inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1B5E20] font-bold rounded-lg uppercase tracking-wide transition-all duration-500 shadow-xl hover:shadow-2xl text-sm overflow-hidden border-3 border-white"
            >
              <span className="absolute inset-0 bg-[#FDD835] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
              <span className="relative z-10 group-hover:text-[#212121] transition-colors duration-500">Más Consejos de Viaje</span>
              <Compass className="relative z-10 w-5 h-5 group-hover:text-[#212121] group-hover:rotate-180 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ubicación y Contacto - Estilo Institucional */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F5F5F5] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#212121] dark:text-white mb-6 uppercase tracking-tight">
              ENCUÉNTRANOS
            </h2>
            <div className="w-24 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              Capital de la Provincia de La Convención
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Mapa */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#4CAF50] dark:border-slate-800 h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps?q=Quillabamba,+Cusco,+Peru&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Quillabamba"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Información */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 border-2 border-[#E8F5E9] dark:border-slate-800 rounded-xl p-6 group hover:border-[#1B5E20] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 border-3 border-[#212121] dark:border-white group-hover:border-[#1B5E20] transition-all duration-300 shadow-md">
                    <MapPin className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#1B5E20]" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">Ubicación</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Provincia de La Convención, Región Cusco, Perú
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border-2 border-[#E8F5E9] dark:border-slate-800 rounded-xl p-6 group hover:border-[#4CAF50] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 border-3 border-[#212121] dark:border-white group-hover:border-[#4CAF50] transition-all duration-300 shadow-md">
                    <Compass className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#4CAF50]" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">Acceso</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      4-5 horas en transporte terrestre desde la ciudad del Cusco
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border-2 border-[#FFF9C4] dark:border-slate-800 rounded-xl p-6 group hover:border-[#FDD835] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 border-3 border-[#212121] dark:border-white group-hover:border-[#FDD835] transition-all duration-300 shadow-md">
                    <CheckCircle className="w-7 h-7 text-[#212121] dark:text-white group-hover:text-[#FDD835]" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2 uppercase tracking-wide">Altitud</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      1,050 m.s.n.m. - Clima cálido y tropical
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link 
                  to="/destinations" 
                  className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FDD835] text-[#212121] font-bold rounded-lg uppercase tracking-wide transition-all duration-500 shadow-lg hover:shadow-xl text-sm overflow-hidden"
                >
                  <span className="absolute inset-0 bg-[#C62828] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                  <MapPin className="relative z-10 w-4 h-4 group-hover:text-white transition-colors duration-500" strokeWidth={2.5} />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-bold">Destinos</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 text-[#1B5E20] dark:text-white font-bold rounded-lg border-3 border-[#4CAF50] dark:border-slate-700 uppercase tracking-wide transition-all duration-500 shadow-lg hover:shadow-xl text-sm overflow-hidden"
                >
                  <span className="absolute inset-0 bg-[#1B5E20] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                  <Camera className="relative z-10 w-4 h-4 group-hover:text-white transition-colors duration-500" strokeWidth={2.5} />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-bold">Contacto</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;