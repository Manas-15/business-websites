import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { FeaturedDish } from "@/templates/restaurant/shared/featured-dishes";

interface ModernDishesProps {
  dishes: FeaturedDish[];
}

/** Featured dishes as cards: a horizontal swipe row on phones, a grid on larger screens. */
export function ModernDishes({ dishes }: ModernDishesProps) {
  return (
    <Section id="dishes" labelledBy="dishes-heading">
      <SectionHeading id="dishes-heading" eyebrow="Featured" title="Most-loved right now" />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {dishes.map((dish) => (
          <li key={dish.name} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-background sm:w-auto">
            <div className="relative">
              <Image
                src={dish.image}
                alt={dish.name}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute top-3 right-3 rounded-full bg-background px-3 py-1 text-sm font-semibold text-primary shadow">
                {dish.price}
              </span>
              {dish.tag ? (
                <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {dish.tag}
                </span>
              ) : null}
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold">{dish.name}</h3>
              {dish.description ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dish.description}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
