import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { FeaturedDish } from "@/templates/restaurant/shared/featured-dishes";

interface LuxuryDishesProps {
  dishes: FeaturedDish[];
}

/** Signature dishes as framed portraits with serif names and prices. */
export function LuxuryDishes({ dishes }: LuxuryDishesProps) {
  return (
    <Section id="dishes" labelledBy="dishes-heading" tone="muted">
      <SectionHeading id="dishes-heading" eyebrow="Signature dishes" title="The dishes guests come back for" align="center" />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <li key={dish.name} className="group">
            <div className="relative overflow-hidden">
              {dish.tag ? (
                <span className="absolute top-3 left-3 z-10 bg-background/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-foreground uppercase">
                  {dish.tag}
                </span>
              ) : null}
              <Image
                src={dish.image}
                alt={dish.name}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 font-heading text-xl">{dish.name}</h3>
            {dish.price ? <p className="mt-1 text-sm font-semibold text-primary">{dish.price}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
