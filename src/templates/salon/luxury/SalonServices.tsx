import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ServiceCategory } from "@/types/content";

/** Three treatment groups side by side. Durations sit under each name, prices on the right. */
export function SalonServices({ categories }: { categories: ServiceCategory[] }) {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading id="services-heading" eyebrow="Services" title="Treatments, considered" align="center" />
      <div className="grid gap-12 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="border-b border-primary/40 pb-3 text-center font-heading text-2xl italic">{category.name}</h3>
            <ul className="mt-6 space-y-7">
              {category.items.map((service) => (
                <li key={service.name} className="text-center">
                  <div className="flex items-baseline justify-center gap-3">
                    <p className="font-semibold">{service.name}</p>
                    <span className="text-sm font-semibold text-primary">{service.price}</span>
                  </div>
                  {service.duration ? (
                    <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">{service.duration}</p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
