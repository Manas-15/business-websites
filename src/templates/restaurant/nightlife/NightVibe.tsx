import { FeatureIcon } from "@/components/common/FeatureIcon";
import { Section } from "@/components/common/Section";
import type { Feature } from "@/types/content";

/** "Why choose us" as numbered dark tiles whose border lights up on hover. */
export function NightVibe({ features }: { features: Feature[] }) {
  return (
    <Section id="why-us" labelledBy="vibe-heading" tone="muted">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">The vibe</p>
          <h2 id="vibe-heading" className="mt-3 font-heading text-5xl leading-none tracking-wide uppercase sm:text-6xl">
            Made for big nights
          </h2>
        </div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className="group relative overflow-hidden rounded-[var(--radius)] border border-border bg-background p-7 transition-colors duration-300 hover:border-primary"
          >
            <span className="absolute top-5 right-6 font-heading text-5xl text-foreground/10 transition-colors group-hover:text-primary/30" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <FeatureIcon name={feature.icon} className="size-6" />
            </span>
            <h3 className="mt-6 font-heading text-3xl tracking-wide uppercase">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
