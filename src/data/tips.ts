import type { TipCategory } from '@/types';

export const travelTips: TipCategory[] = [
  {
    category: 'Presupuesto',
    tips: [
      'Viaja en temporada baja para ahorrar en vuelos y alojamiento',
      'Usa aplicaciones de comparación de precios',
      'Cocina algunas comidas en lugar de comer siempre fuera',
    ],
  },
  {
    category: 'Equipaje',
    tips: [
      'Haz una lista de empaque una semana antes',
      'Lleva ropa versátil que puedas combinar',
      'No olvides adaptadores de corriente internacionales',
    ],
  },
  {
    category: 'Cultura',
    tips: [
      'Aprende frases básicas en el idioma local',
      'Investiga costumbres y tradiciones antes de viajar',
      'Respeta las normas de vestimenta local',
    ],
  },
  {
    category: 'Seguridad',
    tips: [
      'Guarda copias digitales de tus documentos importantes',
      'Investiga las zonas seguras de tu destino',
      'Ten siempre un plan de emergencia',
    ],
  },
  {
    category: 'Fotografía',
    tips: [
      'Lleva baterías y tarjetas de memoria de repuesto',
      'Toma fotos durante la hora dorada (amanecer/atardecer)',
      'No solo fotografíes lugares, captura también momentos',
    ],
  },
  {
    category: 'Gastronomía',
    tips: [
      'Prueba la comida callejera local (con precaución)',
      'Visita mercados locales para experiencias auténticas',
      'Aprende sobre los platos típicos antes de viajar',
    ],
  },
];

export const TIP_ICONS: Record<string, string> = {
  Presupuesto: '💰',
  Equipaje: '🎒',
  Cultura: '🌐',
  Seguridad: '🛡️',
  Fotografía: '📷',
  Gastronomía: '🍽️',
};
