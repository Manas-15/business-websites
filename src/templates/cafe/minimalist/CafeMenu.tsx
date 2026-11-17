import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** Plain two-column list. Each category is a label over hairline-separated rows. */
export function CafeMenu({ categories }: { categories: MenuCategory[] }) {
  return (
    <Section id="menu" labelledBy="menu-heading">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="Coffee, tea and small plates" />
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{category.name}</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-6 py-4">
                  <div>
                    <p className="font-medium">
                      {item.name}
                      {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
