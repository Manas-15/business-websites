import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** Single centred column: each course is a heading over a stack of centred dishes. */
export function TraditionalMenu({ categories, note }: { categories: MenuCategory[]; note?: string }) {
  return (
    <Section id="menu" labelledBy="menu-heading" tone="muted">
      <SectionHeading id="menu-heading" eyebrow="Our menu" title="From the kitchen" align="center" />
      <div className="mx-auto max-w-3xl space-y-16">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-center font-heading text-2xl tracking-[0.2em] text-primary uppercase">{category.name}</h3>
            {category.description ? (
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">{category.description}</p>
            ) : null}
            <ul className="mt-8 space-y-7">
              {category.items.map((item) => (
                <li key={item.name} className="text-center">
                  <p className="font-heading text-lg">
                    {item.name}
                    {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                    <span className="ml-3 font-semibold text-primary">{item.price}</span>
                  </p>
                  {item.tag ? (
                    <p className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase">{item.tag}</p>
                  ) : null}
                  {item.description ? <p className="mx-auto mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {note ? <p className="mt-14 text-center text-xs tracking-wider text-muted-foreground uppercase">{note}</p> : null}
    </Section>
  );
}
