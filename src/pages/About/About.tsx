import React from 'react';
import { MapPin, Users, Heart, Target } from 'lucide-react';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';
import { teamMembers, values } from '@/data/about';

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Users,
  Heart,
  Target,
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Nuestro Equipo - Explorando la Convención"
        description="Conoce al equipo detrás de Explorando la Convención: nuestra misión, visión, valores y las personas que hacen posible este proyecto."
        keywords="equipo explorando la convención, misión, visión, sobre nosotros, turismo La Convención"
        url={`${SITE_CONFIG.url}/about`}
      />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/destinos/pueblo-magico.jpg" 
          alt="Nuestro Equipo" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg tracking-tight">Nuestro Equipo</h1>
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
            {values.map((value) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <div key={value.title} className="text-center">
                  <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full border-4 border-[#212121] dark:border-white flex items-center justify-center mx-auto mb-4">
                    {IconComponent && <IconComponent className="w-10 h-10 text-[#212121] dark:text-white" strokeWidth={2.5} />}
                  </div>
                  <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-2 tracking-tight">{value.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 font-light">{value.description}</p>
                </div>
              );
            })}
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
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6" style={{ borderTop: `4px solid ${member.borderColor}` }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#212121] dark:border-white"
                />
                <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-2">{member.name}</h3>
                <p className="text-[#212121] dark:text-white font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
