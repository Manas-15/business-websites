import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** Edge-to-edge tiles with thin gaps, like a training-floor contact sheet. */
export function GymGallery({ images }: { images: GalleryImage[] }) {
  return (
    <Section id="gallery" labelledBy="gallery-heading" tone="muted">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="The floor, up close" />
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {images.map((image) => (
          <li key={image.src} className="relative aspect-square overflow-hidden">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
