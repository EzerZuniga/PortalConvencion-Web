import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";

type MdxComponents = Record<string, ComponentType<never>>;
type MdxRender = (props: { components?: MdxComponents }) => ReactNode;
type MdxModule = { default: MdxRender };

/**
 * Estilos del cuerpo de los artículos. Se aplican a los elementos que genera
 * el Markdown, así el contenido no necesita clases.
 */
const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mb-4 mt-10 font-heading text-2xl font-bold text-brand-text" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-brand-text" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-brand-text/85 mb-5 text-base leading-relaxed md:text-lg" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="text-brand-text/85 mb-5 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="text-brand-text/85 mb-5 list-decimal space-y-2 pl-6" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="text-brand-text/80 my-6 border-l-4 border-brand-primary pl-4 italic"
      {...props}
    />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className = "font-semibold text-brand-primary underline-offset-4 hover:underline";
    // Enlaces internos con navegación del cliente; externos en pestaña nueva.
    return href.startsWith("/") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
  hr: () => <hr className="my-10 border-gray-200" />,
} as unknown as MdxComponents;

/**
 * Evalúa el MDX compilado por Velite (cuerpo de función) y devuelve su función
 * de render. El código proviene de archivos del repositorio validados en
 * build, nunca de entrada de usuarios.
 */
function getMdxRender(code: string): MdxRender {
  const mdxModule = new Function(code)({ ...runtime }) as MdxModule;
  return mdxModule.default;
}

/**
 * Renderiza en el servidor el cuerpo MDX de un artículo.
 *
 * Se invoca como función (no como `<Content />`): el render de MDX es puro y
 * sin hooks, y así no se crea un tipo de componente nuevo en cada render.
 */
export function MdxContent({ code }: { code: string }) {
  return getMdxRender(code)({ components });
}
