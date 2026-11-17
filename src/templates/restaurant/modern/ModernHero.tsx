import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo, ContactDetails, OpeningHour } from "@/types/client-config";

interface ModernHeroProps {
  business: BusinessInfo;
  eyebrow?: string;
  contact: ContactDetails;
  openingHours?: OpeningHour[];
}

/** Split layout: bold copy with quick-glance info chips beside a large rounded photo. */
export function ModernHero({ business, contact, openingHours, eyebrow }: ModernHeroProps) {
  const today = openingHours?.[0];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
            {eyebrow ?? business.name}
          </p>
          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-bold text-balance sm:text-5xl lg:text-6xl">
            {business.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {business.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#menu" size="lg">
              Explore the menu
            </Button>
            <Button href="#reservations" size="lg" variant="outline">
              Book a table
            </Button>
          </div>
          <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-[var(--radius)] border border-border p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">{contact.address}</span>
            </li>
            {today ? (
              <li className="flex items-start gap-3 rounded-[var(--radius)] border border-border p-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-muted-foreground">
                  {today.day}: {today.hours}
                </span>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="relative">
          <Image
            src={business.heroImage}
            alt={`${business.name} restaurant`}
            width={1200}
            height={1000}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[5/4] w-full rounded-3xl object-cover lg:aspect-[4/5]"
          />
        </div>
      </Container>
    </section>
  );
}
