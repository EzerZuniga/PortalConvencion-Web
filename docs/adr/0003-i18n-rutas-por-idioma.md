# ADR 0003 — i18n con rutas por idioma y URLs traducidas

- **Estado:** Aceptado (implementación en Fase 3)
- **Fecha:** 2026-11-17

## Contexto

El idioma se guarda hoy en `localStorage` y se aplica en el cliente: Google solo
indexa español y se envían los tres idiomas al navegador. La audiencia es
internacional y es/en/pt deben posicionar.

## Decisión

- `next-intl` con rutas `app/[locale]/…` y `pathnames` traducidos
  (`/es/destinos`, `/en/destinations`, `/pt/destinos`). Base en español.
- Mensajes de UI en `messages/{es,en,pt}.json`, cargados en el servidor.
- `hreflang` + `x-default` en cada página y sitemap multilenguaje.
- Detección por `Accept-Language` solo en la primera visita; después manda la URL.

## Consecuencias

- Cada idioma es indexable y enlazable.
- La mayoría de componentes pasan a Server Components (menos JS en el cliente).

## Alternativas descartadas

- **Mantener i18n en cliente:** incompatible con SEO por idioma.
- **Subdominios por idioma:** requieren dominio propio.
