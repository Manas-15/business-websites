import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { BusinessInfo } from "@/types/client-config";

/** Two columns: italic serif headline beside an arch-cropped portrait photo. */
export function SalonHero({ business }: { business: BusinessInfo }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="text-center lg:text-left">
          <p className="text-sm tracking-[0.3em] text-primary uppercase">{business.name}</p>
          <h1 className="mt-5 font-heading text-5xl leading-[1.05] text-balance italic sm:text-6xl">{business.tagline}</h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {business.description}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="#appointment" size="lg">
              Book an appointment
            </Button>
            <Button href="#services" size="lg" variant="outline">
              Our services
            </Button>
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-full bg-secondary">
          <Image src={business.heroImage} alt={business.name} fill priority sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
