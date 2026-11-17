import { Check } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { PricingPlan } from "@/types/content";

/** Packages with arch-topped cards. The featured package is filled with the brand colour. */
export function SalonPricing({ packages }: { packages: PricingPlan[] }) {
  return (
    <Section id="pricing" labelledBy="pricing-heading" tone="muted">
      <SectionHeading id="pricing-heading" eyebrow="Packages" title="Full-day and occasion packages" align="center" />
      <ul className="grid gap-6 md:grid-cols-3">
        {packages.map((plan) => (
          <li
            key={plan.name}
            className={`flex flex-col rounded-t-[10rem] border p-10 text-center ${plan.highlighted ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
          >
            <h3 className="font-heading text-2xl italic">{plan.name}</h3>
            <p className="mt-4 font-heading text-4xl">
              {plan.price}
              {plan.period ? <span className="ml-2 text-sm font-sans opacity-80">{plan.period}</span> : null}
            </p>
            <p className="mt-4 text-sm leading-relaxed opacity-90">{plan.description}</p>
            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-center justify-center gap-2">
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
