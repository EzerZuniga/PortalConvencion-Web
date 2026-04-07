import type { Dish, Restaurant, BlogPost } from '@/types';

export const dishes: Dish[] = [
  {
    id: 1,
    name: 'Café de Altura',
    description:
      'El mejor café orgánico cultivado en las montañas de La Convención, reconocido mundialmente por su sabor único y aroma intenso.',
    image: '/images/galeria/comida-asiatica.jpg',
    category: 'Bebidas',
  },
  {
    id: 2,
    name: 'Pachamanca de la Selva',
    description:
      'Plato tradicional cocinado bajo tierra con piedras calientes, combinando carnes, papas nativas y hierbas aromáticas de la región.',
    image: '/images/galeria/fotografia.jpg',
    category: 'Platos Principales',
  },
  {
    id: 3,
    name: 'Trucha a la Parrilla',
    description:
      'Trucha fresca de los ríos andinos, marinada con especias locales y asada a la perfección sobre brasas de leña.',
    image: '/images/destinos/pueblo-magico.jpg',
    category: 'Platos Principales',
  },
  {
    id: 4,
    name: 'Cacao Premium',
    description:
      'Chocolate artesanal elaborado con cacao orgánico de nuestras plantaciones, perfecto para degustar o llevar como recuerdo.',
    image: '/images/viajes/presupuesto.jpg',
    category: 'Postres',
  },
  {
    id: 5,
    name: 'Juane de La Selva',
    description:
      'Arroz con pollo envuelto en hojas de bijao, uno de los platos más emblemáticos de la región selvática.',
    image: '/images/galeria/comida-asiatica.jpg',
    category: 'Platos Principales',
  },
  {
    id: 6,
    name: 'Mazamorra Morada',
    description:
      'Postre tradicional peruano elaborado con maíz morado, frutas y especias, servido con arroz con leche.',
    image: '/images/destinos/andes-trekking.jpg',
    category: 'Postres',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'El Mirador de Quillabamba',
    description:
      'Restaurante con vista panorámica que ofrece lo mejor de la gastronomía local con ingredientes frescos de la región.',
    image: '/images/destinos/pueblo-magico.jpg',
    location: 'Quillabamba Centro',
    rating: 4.8,
    specialty: 'Cocina Fusión',
  },
  {
    id: 2,
    name: 'Café Orgánico Montaña',
    description:
      'Cafetería especializada en café de altura y postres artesanales, ideal para una tarde relajada.',
    image: '/images/galeria/fotografia.jpg',
    location: 'Av. Principal',
    rating: 4.9,
    specialty: 'Café y Repostería',
  },
  {
    id: 3,
    name: 'Sabor Selvático',
    description:
      'Restaurante tradicional que conserva las recetas ancestrales de la cocina amazónica y andina.',
    image: '/images/galeria/comida-asiatica.jpg',
    location: 'Plaza de Armas',
    rating: 4.7,
    specialty: 'Cocina Tradicional',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Los 10 Mejores Destinos de La Convención para 2025',
    excerpt:
      'Descubre los lugares imperdibles que debes visitar este año en nuestra hermosa provincia.',
    image: '/images/destinos/pueblo-magico.jpg',
    author: 'María Rodríguez',
    date: '15 de Enero, 2025',
    category: 'Destinos',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Guía Completa de Trekking en los Andes de La Convención',
    excerpt:
      'Todo lo que necesitas saber para preparar tu aventura de trekking en las montañas.',
    image: '/images/destinos/andes-trekking.jpg',
    author: 'Carlos Mendoza',
    date: '10 de Enero, 2025',
    category: 'Aventura',
    readTime: '10 min',
  },
  {
    id: 3,
    title: 'Festivales y Tradiciones: El Calendario Cultural de La Convención',
    excerpt:
      'Conoce las festividades más importantes y cuándo celebrarlas en nuestra región.',
    image: '/images/galeria/fotografia.jpg',
    author: 'Ana Silva',
    date: '5 de Enero, 2025',
    category: 'Cultura',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Café de Altura: El Oro Verde de La Convención',
    excerpt:
      'Explora las plantaciones de café y aprende sobre el proceso que hace único a nuestro café.',
    image: '/images/galeria/comida-asiatica.jpg',
    author: 'María Rodríguez',
    date: '28 de Diciembre, 2024',
    category: 'Gastronomía',
    readTime: '7 min',
  },
  {
    id: 5,
    title: 'Turismo Comunitario: Experiencias Auténticas',
    excerpt:
      'Vive con las comunidades locales y conoce sus costumbres de primera mano.',
    image: '/images/destinos/pueblo-magico.jpg',
    author: 'Carlos Mendoza',
    date: '20 de Diciembre, 2024',
    category: 'Cultura',
    readTime: '9 min',
  },
  {
    id: 6,
    title: 'Consejos para Viajar en Temporada de Lluvias',
    excerpt:
      'Prepárate adecuadamente y disfruta al máximo tu visita en cualquier época del año.',
    image: '/images/viajes/presupuesto.jpg',
    author: 'Ana Silva',
    date: '15 de Diciembre, 2024',
    category: 'Tips',
    readTime: '5 min',
  },
];

export const blogCategories = [
  'Todos',
  'Destinos',
  'Aventura',
  'Cultura',
  'Gastronomía',
  'Tips',
];
