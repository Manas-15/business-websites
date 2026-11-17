import Image from "next/image";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Quiet hero: a medium-weight headline, a text-link menu and a wide, low-contrast photograph. */
export function MinimalGymHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="pt-16 sm:pt-24">
      <Container className="max-w-4xl">
        <p className="text-sm text-muted-foreground">{business.name}</p>
        <h1 className="mt-6 font-heading text-4xl leading-tight font-medium text-balance sm:text-6xl">{business.tagline}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{business.description}</p>
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
          <a href="#plans" className="border-b-2 border-primary pb-1">
            Memberships
          </a>
          <a href="#classes" className="pb-1 hover:border-b-2 hover:border-primary">
            Classes
          </a>
          <a href="#trainers" className="pb-1 hover:border-b-2 hover:border-primary">
            Coaches
          </a>
        </nav>
      </Container>
      <Container className="mt-14">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image src={business.heroImage} alt={business.name} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
