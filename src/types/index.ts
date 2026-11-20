/**
 * Tipos compartidos que no pertenecen a un dominio concreto.
 * - Contenido editorial: generado por Velite (`#content`), expuesto como
 *   modelos de vista en `@/lib/content/types`.
 * - Textos de interfaz: inferidos de `messages/es.json` (ver next-intl.d.ts).
 */

export interface User {
  email: string;
  name: string;
  picture?: string;
  provider?: string;
}
