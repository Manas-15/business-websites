import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { MenuCategory, MenuItem } from "@/types/content";

interface LuxuryMenuProps {
  categories: MenuCategory[];
  note?: string;
}

function MenuLine({ item }: { item: MenuItem }) {
  return (
    <li>
      <div className="flex items-baseline gap-3">
        <h4 className="font-heading text-lg">
          {item.name}
          {item.vegetarian ? <span className="sr-only"> (vegetarian)</span> : null}
          {/* Without a description line, the V mark sits next to the name. */}
          {item.vegetarian && !item.description ? (
            <span aria-hidden="true" className="ml-2 align-middle font-sans text-xs font-medium tracking-wider text-primary uppercase">V</span>
          ) : null}
          {item.tag ? (
            <span className="ml-2 align-middle font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">{item.tag}</span>
          ) : null}
        </h4>
        {item.price ? (
          <>
            <span className="flex-1 translate-y-[-0.3em] border-b border-dotted border-foreground/30" aria-hidden="true" />
            <span className="font-semibold text-primary">{item.price}</span>
          </>
        ) : null}
      </div>
      {item.description ? (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
          {item.vegetarian ? <span aria-hidden="true" className="ml-2 text-xs font-medium tracking-wider text-primary uppercase">V</span> : null}
        </p>
      ) : null}
    </li>
  );
}

/** Two-column printed-menu style layout with dotted leaders between names and prices. */
export function LuxuryMenu({ categories, note }: LuxuryMenuProps) {
  return (
    <Section id="menu" labelledBy="menu-heading">
      <SectionHeading id="menu-heading" eyebrow="The menu" title="Crafted in small batches" align="center" />
      <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="font-heading text-2xl text-primary">{category.name}</h3>
            {category.description ? <p className="mt-1 text-sm text-muted-foreground">{category.description}</p> : null}
            <div className="mt-2 mb-6 h-px bg-border" aria-hidden="true" />
            <ul className="space-y-6">
              {category.items.map((item) => (
                <MenuLine key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-xs tracking-wider text-muted-foreground uppercase">{note ?? "V = vegetarian. Please tell us about any allergies."}</p>
    </Section>
  );
}
