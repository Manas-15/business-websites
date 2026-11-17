import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { PricingPlan } from "@/types/content";

/** Memberships as ruled rows rather than cards: name and description on the left, price and action on the right. */
export function MinimalGymPlans({ plans }: { plans: PricingPlan[] }) {
  return (
    <Section id="plans" labelledBy="plans-heading">
      <SectionHeading id="plans-heading" eyebrow="Memberships" title="Simple plans" />
      <ul className="divide-y divide-border border-y border-border">
        {plans.map((plan) => (
          <li key={plan.name} className="grid gap-5 py-8 md:grid-cols-[1fr_2fr_auto] md:items-center">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <div>
              <p className="text-muted-foreground">{plan.description}</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-5 md:justify-end">
              <p className="font-heading text-3xl">
                {plan.price}
                {plan.period ? <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span> : null}
              </p>
              <Button href="#contact" variant="outline">
                Choose {plan.name}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
