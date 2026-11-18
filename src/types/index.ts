/**
 * Tipos compartidos que no pertenecen a un dominio concreto.
 * Los tipos del contenido editorial se generan desde el esquema de Velite
 * (`#content`) y se exponen como modelos de vista en `@/lib/content/types`.
 */

export interface User {
  email: string;
  name: string;
  picture?: string;
  provider?: string;
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
