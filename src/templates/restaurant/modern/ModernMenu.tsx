import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory } from "@/types/content";

interface ModernMenuProps {
  categories: MenuCategory[];
  note?: string;
}

/** Category pills jump to each block; each category is a card with price badges. */
export function ModernMenu({ categories, note }: ModernMenuProps) {
  return (
    <Section id="menu" labelledBy="menu-heading" tone="muted">
      <SectionHeading id="menu-heading" eyebrow="Menu" title="Eat well, share often" />
      <nav aria-label="Menu categories" className="mb-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#menu-${category.id}`}
                className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category.id} id={`menu-${category.id}`} aria-labelledby={`menu-${category.id}-title`} className="rounded-2xl bg-background p-6 sm:p-8">
            <h3 id={`menu-${category.id}-title`} className="font-heading text-2xl font-bold">
              {category.name}
            </h3>
            {category.description ? <p className="mt-1 text-sm text-muted-foreground">{category.description}</p> : null}
            <ul className="mt-6 divide-y divide-border">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold">
                      {item.name}
                      {item.vegetarian ? (
                        <span className="ml-2 inline-block size-2.5 rounded-full bg-primary align-middle" aria-label="Vegetarian" role="img" />
                      ) : null}
                      {item.tag ? (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 align-middle text-[0.65rem] font-semibold tracking-wider text-primary uppercase">
                          {item.tag}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{note ?? "Dots mark vegetarian dishes. Tell us about any allergies when you order."}</p>
    </Section>
  );
}
