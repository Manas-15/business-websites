import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/**
 * Full-bleed photograph with centered serif headline. Text sits on a dark
 * overlay for legibility. The overlay and text are fixed black and white rather
 * than theme colours, so the hero stays readable on dark themes too.
 */
export function LuxuryHero({ business, eyebrow }: { business: BusinessInfo; eyebrow?: string }) {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-black text-white">
      <Image
        src={business.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" aria-hidden="true" />
      <Container className="relative py-24 text-center">
        <p className="text-sm font-medium tracking-[0.35em] uppercase opacity-90">{eyebrow ?? business.name}</p>
        <div className="mx-auto mt-6 h-px w-16 bg-white/60" aria-hidden="true" />
        <h1 className="mx-auto mt-8 max-w-4xl font-heading text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
          {business.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">
          {business.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="#menu" size="lg" variant="secondary">
            View the menu
          </Button>
          <Button href="#reservations" size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
            Reserve a table
          </Button>
        </div>
      </Container>
    </section>
  );
}
