import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FeatureIcon } from "@/components/common/FeatureIcon";
import type { Feature } from "@/types/content";

export function ModernWhyUs({ features }: { features: Feature[] }) {
  return (
    <Section id="why-us" labelledBy="why-us-heading" tone="muted">
      <SectionHeading id="why-us-heading" eyebrow="Why us" title="Simple things, done properly" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li key={feature.title} className="rounded-2xl bg-background p-6">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FeatureIcon name={feature.icon} className="size-6" />
            </span>
            <h3 className="mt-5 font-heading text-lg font-bold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
