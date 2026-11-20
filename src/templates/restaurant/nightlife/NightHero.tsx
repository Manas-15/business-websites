import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { neonText } from "@/templates/restaurant/nightlife/neon";
import type { BusinessInfo, OpeningHour } from "@/types/client-config";
import type { Highlight } from "@/types/content";

interface NightHeroProps {
  business: BusinessInfo;
  eyebrow?: string;
  openingHours?: OpeningHour[];
  highlights?: Highlight[];
}

/**
 * Full-height, left-aligned hero for bars, lounges and clubs: oversized
 * condensed headline with a neon glow, an "open today" pill and the highlight
 * numbers set into the bottom of the photo instead of a separate strip.
 * Text is fixed white on a dark overlay so any photo stays readable.
 */
export function NightHero({ business, eyebrow, openingHours, highlights }: NightHeroProps) {
  const today = openingHours?.[0];

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-black text-white">
      <Image src={business.heroImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden="true" />

      <Container className="flex flex-1 flex-col justify-center pt-20 pb-12">
        {today ? (
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <Clock className="size-3.5 opacity-80" aria-hidden="true" />
            {today.day}: {today.hours}
          </p>
        ) : null}

        <p className="mt-8 text-sm font-semibold tracking-[0.3em] text-primary uppercase">{eyebrow ?? business.name}</p>
        <h1
          className="mt-4 max-w-4xl font-heading text-6xl leading-[0.9] tracking-wide text-balance uppercase sm:text-7xl lg:text-8xl xl:text-9xl"
          style={neonText}
        >
          {business.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{business.description}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#reservations" size="lg" className="rounded-full">
            Book a table
          </Button>
          <Button href="#menu" size="lg" variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10">
            Food &amp; bar menu
          </Button>
        </div>
      </Container>

      {highlights && highlights.length > 0 ? (
        <div className="border-t border-white/15 bg-black/50 backdrop-blur">
          <Container>
            <dl className="grid grid-cols-2 sm:grid-cols-4">
              {highlights.map((item) => (
                <div key={item.label} className="flex flex-col border-white/15 py-5 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                  <dt className="order-2 text-xs tracking-[0.14em] text-white/70 uppercase">{item.label}</dt>
                  <dd className="font-heading text-3xl tracking-wide text-white sm:text-4xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      ) : null}
    </section>
  );
}
