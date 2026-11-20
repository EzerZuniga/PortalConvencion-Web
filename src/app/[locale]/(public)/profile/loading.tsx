/** Única ruta dinámica (depende de la sesión). Un loading global convertiría los 404 en "soft 404" (estado 200) al hacer streaming. */
import { PageLoader } from "@/components/ui";

export default function Loading() {
  return <PageLoader />;
}
