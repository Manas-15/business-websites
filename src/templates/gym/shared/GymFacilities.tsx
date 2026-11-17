import { FeatureIcon } from "@/components/common/FeatureIcon";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Feature } from "@/types/content";

export function GymFacilities({ facilities }: { facilities: Feature[] }) {
  return (
    <Section id="facilities" labelledBy="facilities-heading" tone="muted">
      <SectionHeading id="facilities-heading" eyebrow="Facilities" title="Everything you need, nothing you don't" />
      <ul className="grid gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <li key={facility.title} className="bg-muted p-8">
            <FeatureIcon name={facility.icon} className="size-8 text-primary" />
            <h3 className="mt-6 font-heading text-xl font-bold uppercase">{facility.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{facility.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
