import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Bold colour block: a full-width brand-coloured band, big uppercase headline and a photo that bleeds off the bottom edge. */
export function FitnessHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="overflow-hidden bg-primary text-primary-foreground">
      <Container className="grid items-end gap-10 pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div className="pb-16 lg:pb-28">
          <p className="text-sm font-bold tracking-[0.25em] uppercase opacity-90">{business.name}</p>
          <h1 className="mt-4 text-5xl leading-[0.95] font-black text-balance uppercase sm:text-7xl">{business.tagline}</h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed opacity-90 sm:text-lg">{business.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#plans" size="lg" variant="secondary">
              Start training
            </Button>
            <Button
              href="#classes"
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Class schedule
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full translate-y-8 sm:translate-y-12 lg:aspect-auto lg:h-[560px] lg:translate-y-16">
          <Image src={business.heroImage} alt={business.name} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
