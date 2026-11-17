import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Full-bleed photo under a heavy uppercase headline. Built for dark themes. */
export function GymHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-background">
      <Image src={business.heroImage} alt={business.name} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
      <Container className="relative pb-16 pt-32">
        <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase">{business.name}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-[0.95] font-black tracking-tight text-balance uppercase sm:text-7xl lg:text-8xl">
          {business.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{business.description}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="#plans" size="lg">
            Join now
          </Button>
          <Button href="#classes" size="lg" variant="outline">
            View classes
          </Button>
        </div>
      </Container>
    </section>
  );
}
