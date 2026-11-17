import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";
import type { GalleryImage } from "@/types/content";

/** Editorial hero: a large sans headline above a three-photo collage. */
export function ModernCafeHero({ business, images }: { business: BusinessInfo; images: GalleryImage[] }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{business.name}</p>
            <h1 className="mt-4 text-5xl leading-[1.02] font-black tracking-tight text-balance sm:text-6xl">
              {business.tagline}
            </h1>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{business.description}</p>
            <div className="mt-6">
              <Button href="#menu" size="lg">
                Explore the menu
              </Button>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
          {images.slice(0, 3).map((image) => (
            <li key={image.src} className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 33vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
