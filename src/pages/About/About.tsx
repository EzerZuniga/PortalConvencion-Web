import React from 'react';
import {
  Target, Heart, MapPin, Users,
  Leaf, Star, Lightbulb, ArrowRight, Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';
import { useCounterAnimation } from '@/hooks';
import { teamMembers, values, stats } from '@/data/about';

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin, Users, Heart, Target, Leaf, Star, Lightbulb,
};

const About: React.FC = () => {
  // Hooks de contadores — deben llamarse en el nivel superior (reglas de hooks)
  const c0 = useCounterAnimation(stats[0].value, 1500);
  const c1 = useCounterAnimation(stats[1].value, 2000);
  const c2 = useCounterAnimation(stats[2].value, 2500);
  const c3 = useCounterAnimation(stats[3].value, 1200);
  const counters = [c0, c1, c2, c3];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead
        title="Nuestro Equipo - Explorando la Convención"
        description="Conoce al equipo detrás de Explorando la Convención: cinco quillabambinos apasionados por su tierra, su cultura y el turismo responsable."
        keywords="equipo explorando la convención, Quillabamba, turismo La Convención, misión, visión, sobre nosotros"
        url={`${SITE_CONFIG.url}/about`}
      />

      {/* ── Hero ── */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center text-white overflow-hidden">
        <img
          src="/images/fondohero.jpg"
          alt="La Convención, Cusco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FDD835] mb-3">
            Quiénes somos
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
            Nuestro Equipo
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto font-light text-white/90">
            Somos locales que amamos nuestra tierra y queremos que el mundo la descubra
          </p>
        </div>
      </section>

      {/* ── Estadísticas ── */}
      <section className="bg-[#1B5E20] text-white py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={stat.label} ref={counters[i].counterRef}>
                <div className="text-3xl sm:text-4xl font-bold text-[#FDD835]">
                  {counters[i].count}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-white/75 mt-1.5 font-light leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Misión & Visión ── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Lo que nos mueve cada día
            </h2>
            <div className="w-12 h-1 bg-[#1B5E20] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-8 border-l-4 border-[#1B5E20]">
              <div className="w-11 h-11 bg-[#1B5E20]/10 dark:bg-[#1B5E20]/30 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Nuestra Misión</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Impulsar el turismo sostenible y la difusión cultural en la provincia de La Convención,
                brindando información auténtica, actualizada y de calidad para que cada viajero descubra
                la riqueza natural, histórica y gastronómica de nuestra región.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-8 border-l-4 border-[#4CAF50]">
              <div className="w-11 h-11 bg-[#4CAF50]/10 dark:bg-[#4CAF50]/30 rounded-xl flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-[#4CAF50] dark:text-green-400" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Nuestra Visión</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Ser el referente principal de turismo y cultura en La Convención, reconocidos por nuestro
                contenido auténtico, nuestro compromiso con la comunidad local y la promoción responsable
                del patrimonio natural y cultural de Quillabamba y sus alrededores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestra Historia
            </h2>
            <div className="w-12 h-1 bg-[#1B5E20] mx-auto rounded-full" />
          </div>
          <div className="space-y-5 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-light">
            <p>
              <strong className="text-gray-900 dark:text-white font-semibold">
                Explorando la Convención
              </strong>{' '}
              nació de una pregunta simple: ¿por qué tan pocas personas conocen la maravilla que es
              Quillabamba? Nuestra provincia tiene selva, montañas, ríos cristalinos, una gastronomía
              única y una historia rica… pero muy poca presencia digital.
            </p>
            <p>
              En 2022, un grupo de jóvenes quillabambinos decidió cambiar eso. Armados de cámaras,
              libretas y mucho amor por su tierra, comenzaron a documentar cada rincón de La Convención:
              sus sabores, sus paisajes, sus festividades y su gente.
            </p>
            <p>
              Hoy somos cinco personas comprometidas con mostrarle al mundo que La Convención no es solo
              un destino más en el mapa, sino un lugar donde la naturaleza y la cultura se funden en una
              experiencia verdaderamente inolvidable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-light">
              Los principios que guían cada decisión, cada publicación y cada experiencia que compartimos
            </p>
            <div className="w-12 h-1 bg-[#1B5E20] mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <div
                  key={value.title}
                  className="flex gap-4 p-6 bg-gray-50 dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-[#1B5E20]/10 dark:bg-[#1B5E20]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    {IconComponent && (
                      <IconComponent
                        className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Las personas detrás del portal
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-light">
              Cinco quillabambinos con distintas habilidades, un solo objetivo: poner a La Convención
              en el mapa
            </p>
            <div className="w-12 h-1 bg-[#1B5E20] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center"
              >
                {/* Avatar con iniciales */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-5 flex-shrink-0"
                  style={{ backgroundColor: member.color }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                {/* Nombre */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>

                {/* Rol */}
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#1B5E20] dark:text-emerald-400 bg-[#1B5E20]/10 dark:bg-[#1B5E20]/20 px-3 py-1 rounded-full mb-4">
                  {member.role}
                </span>

                {/* Descripción */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-5">
                  {member.description}
                </p>

                {/* Habilidades */}
                <div className="flex flex-wrap gap-2 justify-center mt-auto">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-[#1B5E20] text-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">¿Quieres ser parte del equipo?</h2>
          <p className="text-white/80 font-light text-base sm:text-lg mb-8 leading-relaxed">
            Si amas La Convención y tienes algo que aportar —ya sea redactando, fotografiando, guiando
            o difundiendo— siempre estamos buscando personas apasionadas por nuestra región.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#FDD835] text-[#212121] font-bold px-8 py-4 rounded-lg hover:bg-[#FBC02D] transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
            Contáctanos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
