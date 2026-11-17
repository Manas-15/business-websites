import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";
import type { GalleryImage } from "@/types/content";

/** Centred italic headline above two photographs side by side. */
export function PremiumCafeHero({ business, images }: { business: BusinessInfo; images: GalleryImage[] }) {
  const [first, second] = images;
  const sidePhoto = second ?? first;
  return (
    <section className="pt-16 pb-12 sm:pt-24">
      <Container className="text-center">
        <p className="text-sm tracking-[0.35em] text-primary uppercase">{business.name}</p>
        <h1 className="mx-auto mt-6 max-w-4xl font-heading text-5xl leading-[1.05] text-balance italic sm:text-7xl">
          {business.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{business.description}</p>
        <div className="mt-10">
          <Button href="#menu" size="lg">
            Explore the menu
          </Button>
        </div>
      </Container>
      <Container className="mt-14 grid grid-cols-2 gap-4 sm:gap-6">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={business.heroImage} alt={business.name} fill priority sizes="(min-width: 768px) 40vw, 50vw" className="object-cover" />
        </div>
        {sidePhoto ? (
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={sidePhoto.src} alt={sidePhoto.alt} fill sizes="(min-width: 768px) 40vw, 50vw" className="object-cover" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
