import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** Menu as colourful cards: each dish is a tile with a bold price tag. Easy to scan on a phone. */
export function CasualMenu({ categories, note }: { categories: MenuCategory[]; note?: string }) {
  return (
    <Section id="menu" labelledBy="menu-heading">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="Something for everyone" />
      <div className="space-y-14">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-2xl font-black">{category.name}</h3>
            {category.description ? <p className="mt-1 text-sm text-muted-foreground">{category.description}</p> : null}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <li key={item.name} className="flex flex-col rounded-3xl bg-muted p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold">
                      {item.name}
                      {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                    </p>
                    <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  {item.vegetarian || item.tag ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tag ? (
                        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{item.tag}</span>
                      ) : null}
                      {item.vegetarian ? (
                        <span className="rounded-full border border-primary px-2.5 py-0.5 text-xs font-semibold text-primary">Vegetarian</span>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {note ? <p className="mt-10 text-sm text-muted-foreground">{note}</p> : null}
    </Section>
  );
}
