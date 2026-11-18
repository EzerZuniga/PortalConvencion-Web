import { NotFoundView } from "@/components/feedback/NotFoundView";

export const metadata = {
  title: "Página no encontrada | Explorando la Convención",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
