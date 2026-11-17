import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ServiceCategory } from "@/types/content";

/** Services as a single column of hairline-separated rows, grouped under small quiet headings. */
export function ElegantServices({ categories }: { categories: ServiceCategory[] }) {
  return (
    <Section id="services" labelledBy="services-heading" tone="muted">
      <SectionHeading id="services-heading" eyebrow="Services" title="Treatments" align="center" />
      <div className="mx-auto max-w-2xl space-y-14">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-sm tracking-[0.3em] text-muted-foreground uppercase">{category.name}</h3>
            <ul className="mt-6 divide-y divide-border">
              {category.items.map((service) => (
                <li key={service.name} className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    {service.duration ? <p className="mt-1 text-xs text-muted-foreground">{service.duration}</p> : null}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                  <span className="shrink-0 font-heading text-lg">{service.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
