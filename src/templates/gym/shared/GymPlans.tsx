import { Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { PricingPlan } from "@/types/content";

/** Membership tiers. The highlighted plan is inverted so the eye lands on it. */
export function GymPlans({ plans }: { plans: PricingPlan[] }) {
  return (
    <Section id="plans" labelledBy="plans-heading" tone="muted">
      <SectionHeading id="plans-heading" eyebrow="Membership" title="Pick the level you train at" />
      <ul className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className={`flex flex-col border p-8 ${plan.highlighted ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
          >
            <h3 className="font-heading text-2xl font-black tracking-tight uppercase">{plan.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-black">{plan.price}</span>
              {plan.period ? <span className="text-sm opacity-80">{plan.period}</span> : null}
            </p>
            <p className="mt-4 text-sm leading-relaxed opacity-90">{plan.description}</p>
            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {plan.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button
                href="#contact"
                variant={plan.highlighted ? "secondary" : "primary"}
                className="w-full"
              >
                Choose {plan.name}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
