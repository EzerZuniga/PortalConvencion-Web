export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

/** Vista previa de un Post (sin contenido completo). Usada en listas y widgets. */
export type BlogPost = Omit<Post, "content" | "featured">;

export interface User {
  email: string;
  name: string;
  picture?: string;
  provider?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
}

export interface TipCategory {
  category: string;
  tips: string[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  specialty: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  initials: string;
  color: string;
  image: string;
  skills: string[];
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
