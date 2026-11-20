import Image from "next/image";
import { Section } from "@/components/common/Section";
import { neonBox } from "@/templates/restaurant/nightlife/neon";
import type { AboutCopy, GalleryImage } from "@/types/content";

interface NightAboutProps {
  copy: AboutCopy;
  image: GalleryImage;
  /** Optional second photo, overlapped on the first for a layered collage. */
  secondImage?: GalleryImage;
}

/** Story beside a layered pair of photos, the front one framed in a neon outline. */
export function NightAbout({ copy, image, secondImage }: NightAboutProps) {
  return (
    <Section id="about" labelledBy="about-heading" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">{copy.eyebrow}</p>
          <h2 id="about-heading" className="mt-4 font-heading text-5xl leading-[0.95] tracking-wide text-balance uppercase sm:text-6xl">
            {copy.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={secondImage ? "relative pb-16 sm:pb-24" : "relative"}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          {secondImage ? (
            <div
              className="absolute right-0 bottom-0 aspect-[4/5] w-[45%] overflow-hidden rounded-[var(--radius)] border-4 border-background sm:-right-6"
              style={neonBox}
            >
              <Image src={secondImage.src} alt={secondImage.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
