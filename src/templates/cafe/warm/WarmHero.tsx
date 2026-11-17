import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Cosy hero: a tinted band, a warm headline beside a tall rounded photograph. */
export function WarmHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="bg-secondary/60 py-14 sm:py-20">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm tracking-[0.2em] text-primary uppercase">{business.name}</p>
          <h1 className="mt-4 font-heading text-5xl leading-tight text-balance sm:text-6xl">{business.tagline}</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{business.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#menu" size="lg">
              See the menu
            </Button>
            <Button href="#location" size="lg" variant="outline">
              Plan your visit
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <Image
            src={business.heroImage}
            alt={business.name}
            width={1200}
            height={1500}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lg"
          />
        </div>
      </Container>
    </section>
  );
}
