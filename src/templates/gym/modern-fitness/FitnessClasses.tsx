import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ClassSession } from "@/types/content";

/** Classes as cards with the day and time as bold chips. Cards fade in as they scroll into view. */
export function FitnessClasses({ classes }: { classes: ClassSession[] }) {
  return (
    <Section id="classes" labelledBy="classes-heading" tone="muted">
      <SectionHeading id="classes-heading" eyebrow="Schedule" title="Classes this week" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((session, index) => (
          <li key={`${session.day}-${session.time}`}>
            <Reveal delay={Math.min(index, 3) * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-background p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground uppercase">
                    {session.day}
                  </span>
                  <span className="font-bold text-primary">{session.time}</span>
                </div>
                <h3 className="mt-6 text-xl font-black uppercase">{session.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {[session.instructor ? `Coach ${session.instructor}` : null, session.level ?? null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
