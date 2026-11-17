import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** Two-column fine-dining style: serif item names, prices on the line, italic descriptions. */
export function PremiumCafeMenu({ categories }: { categories: MenuCategory[] }) {
  return (
    <Section id="menu" labelledBy="menu-heading" tone="muted">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="Coffee and pastry, refined" align="center" />
      <div className="grid gap-x-20 gap-y-16 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="font-heading text-3xl italic">{category.name}</h3>
            <ul className="mt-8 space-y-8">
              {category.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-primary/30 pb-2">
                    <p className="font-heading text-2xl">
                      {item.name}
                      {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                    </p>
                    <span className="font-heading text-xl text-primary">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground italic">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
