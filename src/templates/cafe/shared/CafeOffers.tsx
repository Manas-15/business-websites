import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Offer } from "@/types/content";

export function CafeOffers({ offers }: { offers: Offer[] }) {
  return (
    <Section id="offers" labelledBy="offers-heading" tone="muted">
      <SectionHeading id="offers-heading" eyebrow="Offers" title="Little things that add up" />
      <ul className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {offers.map((offer) => (
          <li key={offer.title} className="flex flex-col bg-background p-8">
            {offer.badge ? (
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{offer.badge}</p>
            ) : null}
            <h3 className="mt-4 font-heading text-2xl">{offer.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
            {offer.price ? <p className="mt-6 text-sm font-semibold">{offer.price}</p> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
