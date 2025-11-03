import React from 'react';
import { MapPin, Users, Heart, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/destinos/pueblo-magico.jpg" 
          alt="Sobre Nosotros" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg tracking-tight">Sobre Nosotros</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 font-light">Conectando viajeros con la magia de La Convención</p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border-l-4 border-[#1B5E20]">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-700 rounded-full border-3 border-[#212121] dark:border-white mb-4">
                <Target className="w-6 h-6 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">Nuestra Misión</h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Impulsar el turismo sostenible y la difusión cultural en la provincia de La Convención, 
                proporcionando información confiable, actualizada y de calidad para que cada viajero 
                descubra la riqueza natural, histórica y cultural de nuestra región.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border-l-4 border-[#4CAF50]">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-700 rounded-full border-3 border-[#212121] dark:border-white mb-4">
                <Heart className="w-6 h-6 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">Nuestra Visión</h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Ser el referente principal de información turística y cultural de La Convención, 
                reconocido por la calidad de nuestro contenido, el compromiso con la comunidad local 
                y la promoción responsable del patrimonio natural y cultural de la región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#212121] dark:text-white mb-6 tracking-tight">Nuestra Historia</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-light">
            Explorando la Convención nació del amor por nuestra tierra y la pasión por compartir 
            sus maravillas con el mundo. En 2020, un grupo de entusiastas locales decidió crear 
            una plataforma que conectara a viajeros con los tesoros escondidos de La Convención.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            Desde entonces, hemos crecido junto con nuestra comunidad, documentando destinos, 
            preservando tradiciones y promoviendo el turismo responsable. Cada artículo, fotografía 
            y recomendación refleja nuestro compromiso con la excelencia y el respeto por nuestra región.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#212121] dark:text-white mb-10 tracking-tight">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full border-4 border-[#212121] dark:border-white flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-[#212121] dark:text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-2 tracking-tight">Autenticidad</h3>
              <p className="text-base text-gray-600 dark:text-gray-300 font-light">Información real y verificada de primera mano</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full border-3 border-[#212121] dark:border-white flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">Comunidad</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Compromiso con el desarrollo local</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full border-3 border-[#212121] dark:border-white flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">Pasión</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Amor por nuestra tierra y cultura</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full border-3 border-[#212121] dark:border-white flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#212121] dark:text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">Sostenibilidad</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Turismo responsable y ecológico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section-padding bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#212121] dark:text-white mb-6 tracking-tight">Nuestro Equipo</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Somos un equipo multidisciplinario de guías, fotógrafos, escritores y amantes de La Convención, 
            dedicados a compartir la belleza y cultura de nuestra región con el mundo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-t-4 border-[#1B5E20]">
              <img 
                src="/images/autores/maria-rodriguez.jpg" 
                alt="María Rodríguez" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#212121] dark:border-white"
              />
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">María Rodríguez</h3>
              <p className="text-[#212121] dark:text-white font-semibold mb-2">Fundadora y Directora</p>
              <p className="text-gray-600 dark:text-gray-300">Apasionada por el turismo sostenible y la cultura local</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-t-4 border-[#4CAF50]">
              <img 
                src="/images/autores/carlos-mendoza.jpg" 
                alt="Carlos Mendoza" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#212121] dark:border-white"
              />
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">Carlos Mendoza</h3>
              <p className="text-[#212121] dark:text-white font-semibold mb-2">Guía y Fotógrafo</p>
              <p className="text-gray-600 dark:text-gray-300">Experto en rutas de trekking y fotografía de naturaleza</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-t-4 border-[#FDD835]">
              <img 
                src="/images/autores/ana-silva.jpg" 
                alt="Ana Silva" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#212121] dark:border-white"
              />
              <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">Ana Silva</h3>
              <p className="text-[#212121] dark:text-white font-semibold mb-2">Editora de Contenido</p>
              <p className="text-gray-600 dark:text-gray-300">Especialista en cultura y gastronomía regional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
