export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  borderColor: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'María Rodríguez',
    role: 'Fundadora y Directora',
    description: 'Apasionada por el turismo sostenible y la cultura local',
    image: '/images/autores/maria-rodriguez.jpg',
    borderColor: '#1B5E20',
  },
  {
    name: 'Carlos Mendoza',
    role: 'Guía y Fotógrafo',
    description: 'Experto en rutas de trekking y fotografía de naturaleza',
    image: '/images/autores/carlos-mendoza.jpg',
    borderColor: '#4CAF50',
  },
  {
    name: 'Ana Silva',
    role: 'Editora de Contenido',
    description: 'Especialista en cultura y gastronomía regional',
    image: '/images/autores/ana-silva.jpg',
    borderColor: '#FDD835',
  },
];

export const values: ValueItem[] = [
  {
    icon: 'MapPin',
    title: 'Autenticidad',
    description: 'Información real y verificada de primera mano',
  },
  {
    icon: 'Users',
    title: 'Comunidad',
    description: 'Compromiso con el desarrollo local',
  },
  {
    icon: 'Heart',
    title: 'Pasión',
    description: 'Amor por nuestra tierra y cultura',
  },
  {
    icon: 'Target',
    title: 'Sostenibilidad',
    description: 'Turismo responsable y ecológico',
  },
];
