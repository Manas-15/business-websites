import Image from "next/image";
import { GalleryLightbox, GalleryTileButton, GalleryViewAllButton } from "@/components/common/GalleryLightbox";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryImage } from "@/types/content";

/** One 2x2 photo plus four squares fills two rows of the 4-column bento grid. */
const PREVIEW_COUNT = 5;

/** Bento-style grid: the first photo spans a 2x2 block, the rest fill around it. */
export function ModernGallery({ images }: { images: GalleryImage[] }) {
  const preview = images.slice(0, PREVIEW_COUNT);
  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <SectionHeading id="gallery-heading" eyebrow="Gallery" title="Inside the restaurant" />
      <GalleryLightbox images={images}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {preview.map((image, index) => (
            <li
              key={`${index}-${image.src}`}
              className={`group relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <GalleryTileButton index={index} label={image.alt} />
            </li>
          ))}
        </ul>
        {images.length > PREVIEW_COUNT ? <GalleryViewAllButton count={images.length} className="[&>button]:rounded-full" /> : null}
      </GalleryLightbox>
    </Section>
  );
}
