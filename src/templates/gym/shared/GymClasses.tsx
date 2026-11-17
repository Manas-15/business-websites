import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ClassSession } from "@/types/content";

/** Weekly schedule as a real table, so screen readers and search engines read it as data. */
export function GymClasses({ classes }: { classes: ClassSession[] }) {
  return (
    <Section id="classes" labelledBy="classes-heading">
      <SectionHeading id="classes-heading" eyebrow="Schedule" title="This week's classes" />
      <div className="overflow-x-auto border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="sr-only">Weekly group class schedule</caption>
          <thead className="bg-muted text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">Day</th>
              <th scope="col" className="px-6 py-4 font-semibold">Time</th>
              <th scope="col" className="px-6 py-4 font-semibold">Class</th>
              <th scope="col" className="px-6 py-4 font-semibold">Coach</th>
              <th scope="col" className="px-6 py-4 font-semibold">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {classes.map((session) => (
              <tr key={`${session.day}-${session.time}`} className="transition-colors hover:bg-muted/60">
                <td className="px-6 py-4 font-semibold">{session.day}</td>
                <td className="px-6 py-4 text-primary">{session.time}</td>
                <td className="px-6 py-4 font-medium">{session.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.instructor ?? "-"}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.level ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
