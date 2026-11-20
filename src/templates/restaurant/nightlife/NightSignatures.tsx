import Image from "next/image";
import { Section } from "@/components/common/Section";
import type { FeaturedDish } from "@/templates/restaurant/shared/featured-dishes";

/**
 * Featured dishes and drinks as tall photo cards with the name over the image.
 * Swipes sideways on phones, becomes a grid on wider screens.
 */
export function NightSignatures({ dishes }: { dishes: FeaturedDish[] }) {
  return (
    <Section id="dishes" labelledBy="dishes-heading">
      <div className="mb-12">
        <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">House favourites</p>
        <h2 id="dishes-heading" className="mt-3 font-heading text-5xl leading-none tracking-wide uppercase sm:text-6xl">
          What the table orders
        </h2>
      </div>
      <ul
        className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 ${
          dishes.length % 3 === 0 ? "lg:grid-cols-3" : dishes.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
        }`}
      >
        {dishes.map((dish) => (
          <li
            key={dish.name}
            className="group relative aspect-[3/4] w-[75%] shrink-0 snap-start overflow-hidden rounded-[var(--radius)] bg-black text-white sm:w-auto"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 75vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" aria-hidden="true" />
            {dish.tag ? (
              <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-primary-foreground uppercase">
                {dish.tag}
              </span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-heading text-3xl leading-none tracking-wide uppercase">{dish.name}</h3>
              {dish.description ? <p className="mt-2 line-clamp-3 text-sm leading-snug text-white/80">{dish.description}</p> : null}
              {dish.price ? <p className="mt-3 text-sm font-bold text-primary">{dish.price}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
