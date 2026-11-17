import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeatureIcon } from "@/components/common/FeatureIcon";
import type { Feature } from "@/types/content";

export function LuxuryWhyUs({ features }: { features: Feature[] }) {
  return (
    <Section id="why-us" labelledBy="why-us-heading">
      <SectionHeading id="why-us-heading" eyebrow="Why choose us" title="What makes the evening" align="center" />
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li key={feature.title} className="border-t border-primary/40 pt-6 text-center">
            <FeatureIcon name={feature.icon} className="mx-auto size-8 text-primary" />
            <h3 className="mt-5 font-heading text-xl">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
