import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import type { OpeningHour } from "@/types/client-config";

/** Opening hours as a plain ruled table, the one thing guests look up most. */
export function CafeHours({ hours }: { hours: OpeningHour[] }) {
  return (
    <Section id="hours" labelledBy="hours-heading">
      <Container className="max-w-2xl">
        <h2 id="hours-heading" className="font-heading text-3xl sm:text-4xl">
          Opening hours
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {hours.map((entry) => (
            <div key={entry.day} className="flex justify-between gap-6 py-4">
              <dt className="font-medium">{entry.day}</dt>
              <dd className="text-muted-foreground">{entry.hours}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
