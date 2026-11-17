import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Text-only hero: a centred, generously spaced statement with two quiet actions. No photography above the fold. */
export function ElegantHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="py-20 sm:py-32">
      <Container className="max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">{business.name}</p>
        <h1 className="mt-8 font-heading text-4xl leading-tight font-normal text-balance sm:text-6xl">
          {business.tagline}
        </h1>
        <p className="mx-auto mt-8 max-w-lg text-muted-foreground">{business.description}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Button href="#appointment" size="lg">
            Book an appointment
          </Button>
          <a href="#services" className="text-sm font-medium underline underline-offset-4 hover:text-primary">
            View services
          </a>
        </div>
      </Container>
    </section>
  );
}
