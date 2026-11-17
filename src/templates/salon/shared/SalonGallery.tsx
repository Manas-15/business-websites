import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** Arch-shaped tiles in a two-up grid on phones and a four-up row on desktop. */
export function SalonGallery({ images }: { images: GalleryImage[] }) {
  return (
    <Section id="gallery" labelledBy="gallery-heading" tone="muted">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="Our studio" align="center" />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image) => (
          <li key={image.src} className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-secondary">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
