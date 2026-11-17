import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** Four quiet portrait photos in one row, no captions or overlays. */
export function CafeGallery({ images }: { images: GalleryImage[] }) {
  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="The room, the counter, the cup" />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image) => (
          <li key={image.src} className="relative aspect-[4/5] overflow-hidden">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
