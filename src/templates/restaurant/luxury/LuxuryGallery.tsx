import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

export function LuxuryGallery({ images }: { images: GalleryImage[] }) {
  return (
    <Section id="gallery" labelledBy="gallery-heading" tone="muted">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="A closer look" align="center" />
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {images.map((image) => (
          <li key={image.src} className="relative aspect-square overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
