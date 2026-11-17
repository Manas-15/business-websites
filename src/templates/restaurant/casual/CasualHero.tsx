import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Bold, friendly hero: heavy headline, a secondary colour block behind the photo, and two clear actions. */
export function CasualHero({ business, eyebrow }: { business: BusinessInfo; eyebrow?: string }) {
  return (
    <section className="overflow-hidden py-12 sm:py-16 lg:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-md bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
            {eyebrow ?? business.name}
          </span>
          <h1 className="mt-6 text-5xl leading-[1] font-black tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {business.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{business.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#menu" size="lg">
              See what&apos;s cooking
            </Button>
            <Button href="#reservations" size="lg" variant="secondary">
              Book a table
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-primary/15 sm:translate-x-5 sm:translate-y-5" aria-hidden="true" />
          <Image
            src={business.heroImage}
            alt={business.name}
            width={1200}
            height={1200}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="relative aspect-square w-full rounded-[2rem] object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
