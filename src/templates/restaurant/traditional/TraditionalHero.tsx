import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Centred classic hero: a double-ruled frame around the headline, with a wide photograph below. */
export function TraditionalHero({ business, eyebrow }: { business: BusinessInfo; eyebrow?: string }) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="border border-primary/60 p-2 sm:p-3">
          <div className="border border-primary/30 px-6 py-14 text-center sm:px-12 sm:py-20">
            <p className="text-sm tracking-[0.3em] text-primary uppercase">{eyebrow ?? business.name}</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl leading-tight text-balance uppercase sm:text-5xl lg:text-6xl">
              {business.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {business.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="#menu" size="lg">
                View the menu
              </Button>
              <Button href="#reservations" size="lg" variant="outline">
                Reserve a table
              </Button>
            </div>
          </div>
        </div>
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden sm:mt-14">
          <Image src={business.heroImage} alt={business.name} fill priority sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
