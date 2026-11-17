import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Text-first hero: a large headline and one action, with a wide photo below. */
export function CafeHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="pt-14 sm:pt-20">
      <Container>
        <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">{business.name}</p>
        <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-[1.05] text-balance sm:text-6xl">
          {business.tagline}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="#menu" size="lg">
            See the menu
          </Button>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{business.description}</p>
        </div>
      </Container>
      <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden sm:mt-16 sm:aspect-[21/9]">
        <Image src={business.heroImage} alt={business.name} fill priority sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
