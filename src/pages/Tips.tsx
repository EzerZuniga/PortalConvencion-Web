import React from 'react';

const Tips: React.FC = () => {
  const travelTips = [
    {
      category: "💰 Presupuesto",
      tips: [
        "Viaja en temporada baja para ahorrar en vuelos y alojamiento",
        "Usa aplicaciones de comparación de precios",
        "Cocina algunas comidas en lugar de comer siempre fuera"
      ]
    },
    {
      category: "🎒 Equipaje",
      tips: [
        "Haz una lista de empaque una semana antes",
        "Lleva ropa versátil que puedas combinar",
        "No olvides adaptadores de corriente internacionales"
      ]
    },
    {
      category: "🌐 Cultura",
      tips: [
        "Aprende frases básicas en el idioma local",
        "Investiga costumbres y tradiciones antes de viajar",
        "Respeta las normas de vestimenta local"
      ]
    },
    {
      category: "🛡️ Seguridad",
      tips: [
        "Guarda copias digitales de tus documentos importantes",
        "Investiga las zonas seguras de tu destino",
        "Ten siempre un plan de emergencia"
      ]
    },
    {
      category: "📷 Fotografía",
      tips: [
        "Lleva baterías y tarjetas de memoria de repuesto",
        "Toma fotos durante la hora dorada (amanecer/atardecer)",
        "No solo fotografíes lugares, captura también momentos"
      ]
    },
    {
      category: "🍽️ Gastronomía",
      tips: [
        "Prueba la comida callejera local (con precaución)",
        "Visita mercados locales para experiencias auténticas",
        "Aprende sobre los platos típicos antes de viajar"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
              Consejos de Viaje
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Aprende de nuestras experiencias y evita errores comunes con estos consejos prácticos para viajeros.
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelTips.map((category, index) => (
              <div key={category.category} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 fade-in border-t-4 border-[#1B5E20] hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold text-[#212121] dark:text-white mb-4 flex items-center">
                  <span className="mr-3">
                    {category.category === "💰 Presupuesto" && "💰"}
                    {category.category === "🎒 Equipaje" && "🎒"}
                    {category.category === "🌐 Cultura" && "🌐"}
                    {category.category === "🛡️ Seguridad" && "🛡️"}
                    {category.category === "📷 Fotografía" && "📷"}
                    {category.category === "🍽️ Gastronomía" && "🍽️"}
                  </span>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-[#1B5E20] dark:text-[#4CAF50] mr-2 mt-1 font-bold">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center border-4 border-[#4CAF50]">
            <h2 className="text-2xl font-bold text-[#212121] dark:text-white mb-4">
              ¿Necesitas más ayuda?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter semanal y recibe consejos exclusivos, 
              ofertas de viaje y guías detalladas directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#212121] dark:text-white rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              />
              <button className="bg-[#1B5E20] dark:bg-[#4CAF50] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#4CAF50] dark:hover:bg-[#1B5E20] transition-all duration-200 whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;