import React from 'react';
import { Utensils, Coffee, Pizza, MapPin, Star } from 'lucide-react';
import SEOHead from '@/components/features/seo';
import { SITE_CONFIG } from '@/config/site';
import { dishes, restaurants } from '@/data/gastronomia';

const Gastronomia: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <SEOHead 
        title="Gastronomía de La Convención - Sabores Auténticos del Perú"
        description="Descubre la gastronomía de La Convención: café de altura, cacao premium, platos típicos y los mejores restaurantes de Quillabamba."
        keywords="gastronomía La Convención, café Quillabamba, cacao perú, comida típica cusco, restaurantes Quillabamba"
        url={`${SITE_CONFIG.url}/gastronomia`}
      />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white">
        <img 
          src="/images/galeria/comida-asiatica.jpg" 
          alt="Gastronomía" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-white mx-auto mb-4">
            <Utensils className="w-10 h-10 text-[#212121]" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg tracking-tight">Gastronomía</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 font-light">
            Sabores auténticos de La Convención
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#212121] dark:text-white mb-6 tracking-tight">Un Viaje de Sabores</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-light">
            La gastronomía de La Convención es un reflejo de su diversidad geográfica y cultural. 
            Desde las alturas andinas hasta la selva tropical, cada plato cuenta una historia de 
            tradición, innovación y respeto por los ingredientes locales.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            Nuestro café de altura y cacao fino son reconocidos internacionalmente, mientras que 
            nuestros platos tradicionales mantienen vivas las recetas ancestrales de nuestros pueblos.
          </p>
        </div>
      </section>

      {/* Platos Típicos */}
      <section className="section-padding bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-700 rounded-full border-4 border-[#212121] dark:border-white mx-auto mb-4">
              <Pizza className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">Platos Típicos</h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Descubre los sabores que hacen única a nuestra región
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map(dish => (
              <div key={dish.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#1B5E20]">
                <div className="relative h-48">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-[#212121] dark:bg-white text-white dark:text-[#212121] px-3 py-1 rounded-full text-sm font-semibold">
                    {dish.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#212121] dark:text-white mb-3">{dish.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Café y Cacao */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-700 rounded-full border-4 border-[#212121] dark:border-white mb-4">
                <Coffee className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={3} />
              </div>
              <h2 className="text-4xl font-bold text-[#212121] dark:text-white mb-6">Café y Cacao de Altura</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                La Convención es reconocida mundialmente por la calidad excepcional de su café 
                y cacao. Cultivados en las laderas de los Andes, entre 1,200 y 2,000 metros sobre 
                el nivel del mar, nuestros productos son el resultado de prácticas agrícolas sostenibles 
                y el cuidado de generaciones de productores.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Visita nuestras plantaciones, aprende sobre el proceso de cosecha y tostado, 
                y degusta el verdadero sabor del oro verde y marrón de La Convención.
              </p>
              <button className="bg-[#1B5E20] dark:bg-[#4CAF50] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#4CAF50] dark:hover:bg-[#1B5E20] transition-colors duration-200">
                Tour de Café y Cacao
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/galeria/comida-asiatica.jpg" 
                alt="Café" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="/images/destinos/pueblo-magico.jpg" 
                alt="Cacao" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="/images/galeria/fotografia.jpg" 
                alt="Plantación" 
                className="rounded-lg shadow-md w-full h-48 object-cover col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurantes Recomendados */}
      <section className="section-padding bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-700 rounded-full border-4 border-[#212121] dark:border-white mx-auto mb-4">
              <MapPin className="w-7 h-7 text-[#212121] dark:text-white" strokeWidth={3} />
            </div>
            <h2 className="text-4xl font-bold text-[#212121] dark:text-white mb-4">Restaurantes Recomendados</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Los mejores lugares para disfrutar de la gastronomía local
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#C62828]">
                <div className="relative h-48">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#212121] dark:text-white">{restaurant.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-[#FDD835] fill-current" />
                      <span className="font-semibold text-[#212121] dark:text-white">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#212121] dark:text-white font-medium mb-3">{restaurant.specialty}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{restaurant.description}</p>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para probar nuestros sabores?</h2>
          <p className="text-lg mb-8">
            Reserva un tour gastronómico y descubre los secretos culinarios de La Convención
          </p>
          <button className="bg-white text-[#1B5E20] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg">
            Reservar Tour Gastronómico
          </button>
        </div>
      </section>
    </div>
  );
};

export default Gastronomia;
