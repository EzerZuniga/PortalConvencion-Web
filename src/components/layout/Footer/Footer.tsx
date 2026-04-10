import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOOTER_NAVIGATION } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-900 via-primary-950 to-primary-900 text-primary-50 dark:from-[#0F1D18] dark:via-[#13261F] dark:to-[#0F1D18] transition-colors duration-300 text-base">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-start">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <Link to="/" className="flex justify-center items-center mb-3 group">
            <img
              src="/images/logo footer.png"
              alt="Logo Explorando La Convención"
              className="w-48 sm:w-56 md:w-64 h-auto shadow-lg transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <p className="text-primary-100/90 max-w-md text-center sm:text-left leading-relaxed text-sm">
            Portal informativo dedicado a mostrar la riqueza natural, cultural y turística de la provincia de La Convención, Cusco. Explora destinos, consejos y experiencias únicas para viajeros y curiosos.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Navegación principal" className="mb-6 md:mb-0">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">Navegación</h3>
          <ul className="flex flex-col gap-2 text-base">
            {FOOTER_NAVIGATION.main.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="flex items-center gap-2 px-2 py-1 text-primary-100/90 hover:text-accent-300 transition-colors">
                  <span className="text-accent-400 text-lg">›</span>{item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Info */}
        <nav aria-label="Información legal" className="mb-6 md:mb-0">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">Información</h3>
          <ul className="flex flex-col gap-2 text-base">
            {FOOTER_NAVIGATION.info.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="flex items-center gap-2 px-2 py-1 text-primary-100/90 hover:text-accent-300 transition-colors">
                  <span className="text-accent-400 text-lg">›</span>{item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-heading uppercase tracking-[0.08em] mb-4 text-white">Síguenos</h3>
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
            <a href={SITE_CONFIG.social.facebook} className="group rounded-full p-2 bg-primary-800/70 border border-white/25 hover:bg-accent-500 hover:border-accent-400 transition-colors duration-200" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} className="text-white group-hover:text-primary-950 transition-colors duration-200" />
            </a>
            <a href={SITE_CONFIG.social.instagram} className="group rounded-full p-2 bg-primary-800/70 border border-white/25 hover:bg-accent-500 hover:border-accent-400 transition-colors duration-200" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} className="text-white group-hover:text-primary-950 transition-colors duration-200" />
            </a>
            <a href={SITE_CONFIG.social.youtube} className="group rounded-full p-2 bg-primary-800/70 border border-white/25 hover:bg-accent-500 hover:border-accent-400 transition-colors duration-200" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube size={22} className="text-white group-hover:text-primary-950 transition-colors duration-200" />
            </a>
            <a href={`mailto:${SITE_CONFIG.social.email}`} className="group rounded-full p-2 bg-primary-800/70 border border-white/25 hover:bg-accent-500 hover:border-accent-400 transition-colors duration-200" aria-label="Email">
              <Mail size={22} className="text-white group-hover:text-primary-950 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-primary-700/60 mb-0" />
      <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-primary-100/80 gap-1">
        <span className="w-full text-center sm:text-left">© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.</span>
        <span className="w-full text-center sm:w-auto sm:text-right mt-1 sm:mt-0 whitespace-nowrap">
          Desarrollado por{' '}
          <a href="https://www.instagram.com/ezerzuniga.oficial16/" target="_blank" rel="noopener noreferrer"
            className="text-accent-400 relative transition-colors duration-200 hover:text-accent-300 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
            Ezer Zuniga
          </a>
        </span>
      </div>
    </footer>
  );
}


