import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** Bento-style grid: the first photo spans a 2x2 block, the rest fill around it. */
export function ModernGallery({ images }: { images: GalleryImage[] }) {
  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="Inside the restaurant" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {images.map((image, index) => (
          <li
            key={image.src}
            className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={index === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
