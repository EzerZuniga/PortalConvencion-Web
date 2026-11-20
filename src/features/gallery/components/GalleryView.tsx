import Image from "next/image";
import { MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SectionHeader } from "@/components/ui";
import { getMessages } from "next-intl/server";
import type { GalleryItem } from "@/features/gallery/queries";

interface GalleryViewProps {
  images: GalleryItem[];
}

export async function GalleryView({ images }: GalleryViewProps) {
  const content = await getMessages();
  const page = content.pages.gallery;

  return (
    <div className="wp-shell">
      <div className="wp-section">
        <div className="wp-container">
          {/* Header */}
          <SectionHeader title={page.title} subtitle={page.subtitle} />

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="wp-card wp-card-interactive group overflow-hidden border-2 border-transparent hover:border-brand-primary"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="bg-brand-text/0 group-hover:bg-brand-text/35 absolute inset-0 flex items-center justify-center transition-all duration-300">
                    <div className="translate-y-4 transform text-center text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-lg font-semibold">{content.common.viewMore}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-heading text-xl font-semibold text-brand-text">
                    {image.title}
                  </h3>
                  <p className="text-brand-text/75 flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {image.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-brand-text/75 mb-4">{page.ctaText}</p>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="wp-btn-primary inline-flex"
            >
              {page.ctaAction}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
