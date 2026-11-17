import Image from "next/image";
import { GalleryLightbox, GalleryTileButton, GalleryViewAllButton } from "@/components/common/GalleryLightbox";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** Photos shown on the page; the rest open from "View all photos". Six fills the 3-column grid. */
const PREVIEW_COUNT = 6;

export function LuxuryGallery({ images }: { images: GalleryImage[] }) {
  const preview = images.slice(0, PREVIEW_COUNT);
  return (
    <Section id="gallery" labelledBy="gallery-heading" tone="muted">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="A closer look" align="center" />
      <GalleryLightbox images={images}>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {preview.map((image, index) => (
            <li key={`${index}-${image.src}`} className="group relative aspect-square overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <GalleryTileButton index={index} label={image.alt} />
            </li>
          ))}
        </ul>
        {images.length > PREVIEW_COUNT ? <GalleryViewAllButton count={images.length} /> : null}
      </GalleryLightbox>
    </Section>
  );
}
