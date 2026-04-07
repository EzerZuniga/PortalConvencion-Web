import React from 'react';
import { MapPin } from 'lucide-react';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';
import { galleryImages } from '@/data/gallery';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Galería de Fotos - La Convención en Imágenes"
        description="Explora nuestra galería fotográfica con los paisajes más impresionantes de La Convención, Cusco y Perú."
        keywords="galería fotos La Convención, fotografía paisajes Perú, imágenes Cusco, fotos viaje"
        url={`${SITE_CONFIG.url}/gallery`}
      />
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              Galería de Fotos
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Un vistazo visual a los destinos más increíbles de La Convención.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden group border-4 border-transparent hover:border-[#4CAF50] transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center">
                      <span className="text-lg font-semibold">Ver más</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#212121] dark:text-white mb-1">{image.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {image.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Quieres ver más fotos de nuestros viajes?
            </p>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B5E20] dark:bg-[#4CAF50] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#4CAF50] dark:hover:bg-[#1B5E20] transition-all duration-200 inline-block"
            >
              Síguenos en Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;