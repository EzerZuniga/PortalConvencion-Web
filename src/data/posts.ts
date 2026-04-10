import type { Post } from '@/types';

export const posts: Post[] = [
  {
    id: 1,
    title: "Quillabamba y sus Rincones Imperdibles",
    excerpt: "Una ruta práctica por miradores, barrios tradicionales y espacios culturales de La Convención.",
    content: "Quillabamba combina clima cálido, historia local y naturaleza cercana. En esta guía te mostramos paradas clave para conocer su esencia...",
    image: "/images/destinos/pueblo-magico.jpg",
    category: "Destinos",
    author: "Mariela Ramos",
    date: "2024-01-15",
    readTime: "5 min",
    featured: true
  },
  {
    id: 2,
    title: "Cómo Visitar La Convención con Presupuesto Inteligente",
    excerpt: "Consejos claros para ahorrar en transporte, alojamiento y actividades sin perder calidad de experiencia.",
    content: "Viajar a La Convención también puede ser accesible. Aquí encontrarás recomendaciones para optimizar gastos y organizar mejor tu itinerario...",
    image: "/images/viajes/presupuesto.jpg",
    category: "Consejos",
    author: "Carlos Huamán",
    date: "2024-01-12",
    readTime: "7 min",
    featured: true
  },
  {
    id: 3,
    title: "Sabores de La Convención: Café, Cacao y Cocina Local",
    excerpt: "Descubre productos emblemáticos y platos que reflejan la identidad gastronómica de la selva cusqueña.",
    content: "La gastronomía local se construye con café de altura, cacao fino y recetas familiares. Te contamos qué probar y dónde empezar...",
    image: "/images/galeria/comida-asiatica.jpg",
    category: "Gastronomía",
    author: "Ana Paredes",
    date: "2024-01-10",
    readTime: "4 min",
    featured: true
  },
  {
    id: 4,
    title: "Trekking en los Andes: Una Aventura Inolvidable",
    excerpt: "Experiencias y recomendaciones para hacer senderismo en la cordillera de los Andes.",
    content: "Los Andes ofrecen algunos de los paisajes más espectaculares para el trekking...",
    image: "/images/destinos/andes-trekking.jpg",
    category: "Aventura",
    author: "Luis Fernández",
    date: "2024-01-08",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Fotografía de Viajes: Captura Momentos Únicos",
    excerpt: "Técnicas y consejos para mejorar tus fotografías durante tus viajes.",
    content: "Una buena fotografía puede capturar la esencia de un lugar y preservar recuerdos...",
    image: "/images/galeria/fotografia.jpg",
    category: "Fotografía",
    author: "Sofia Chen",
    date: "2024-01-05",
    readTime: "8 min"
  },
  {
    id: 6,
    title: "Europa en Tren: El Viaje Más Pintoresco",
    excerpt: "Descubre la belleza de Europa a través de sus rutas ferroviarias más espectaculares.",
    content: "Viajar en tren por Europa es una experiencia única que combina comodidad y paisajes increíbles...",
    image: "/images/viajes/tren-europa.jpg",
    category: "Destinos",
    author: "David Miller",
    date: "2024-01-03",
    readTime: "5 min"
  }
];

export const categories = [
  "Todos",
  "Destinos",
  "Consejos",
  "Gastronomía",
  "Aventura",
  "Fotografía"
];
