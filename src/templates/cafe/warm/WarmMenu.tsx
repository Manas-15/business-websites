import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** Menu as soft rounded panels, one per category, with the description under each name. */
export function WarmMenu({ categories }: { categories: MenuCategory[] }) {
  return (
    <Section id="menu" labelledBy="menu-heading">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="Warm drinks and fresh bakes" />
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category.id} className="rounded-[2rem] bg-secondary/40 p-8 sm:p-10">
            <h3 className="font-heading text-2xl">{category.name}</h3>
            <ul className="mt-6 space-y-5">
              {category.items.map((item) => (
                <li key={item.name} className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold">
                      {item.name}
                      {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-primary">{item.price}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
