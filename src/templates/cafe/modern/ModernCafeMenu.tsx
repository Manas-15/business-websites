import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

/** A dark "menu board" panel with the categories set in columns. */
export function ModernCafeMenu({ categories }: { categories: MenuCategory[] }) {
  return (
    <Section id="menu" labelledBy="menu-heading">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="The board" />
      <div className="rounded-3xl bg-foreground p-6 text-background sm:p-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">{category.name}</h3>
              <ul className="mt-5 space-y-5">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold">
                        {item.name}
                        {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
                      </p>
                      <span className="shrink-0 text-sm font-bold opacity-80">{item.price}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed opacity-70">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
