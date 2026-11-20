import Image from "next/image";
import { GalleryLightbox, GalleryTileButton, GalleryViewAllButton } from "@/components/common/GalleryLightbox";
import { Section } from "@/components/common/Section";
import type { GalleryImage } from "@/types/content";

/** Photos shown on the page; the rest open from "View all photos". */
const PREVIEW_COUNT = 7;

/** Tile sizes for the bento grid, in order. The first photo is the large feature tile. */
const TILE_CLASSES = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2 sm:col-span-1",
  "",
  "col-span-2",
];

/** Bento-style photo wall on a dark band, opening the shared full-screen gallery. */
export function NightGallery({ images }: { images: GalleryImage[] }) {
  const preview = images.slice(0, PREVIEW_COUNT);

  return (
    <Section id="gallery" labelledBy="gallery-heading" tone="muted">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">Gallery</p>
        <h2 id="gallery-heading" className="mt-3 font-heading text-5xl leading-none tracking-wide uppercase sm:text-6xl">
          Inside the night
        </h2>
      </div>
      <GalleryLightbox images={images}>
        <ul className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 lg:auto-rows-[13rem]">
          {preview.map((image, index) => (
            <li
              key={`${index}-${image.src}`}
              className={`group relative overflow-hidden rounded-[var(--radius)] bg-black ${TILE_CLASSES[index] ?? ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
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
