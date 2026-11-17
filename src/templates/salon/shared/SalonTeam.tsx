import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { TeamMember } from "@/types/content";

/** Arch-cropped portraits in a row, matching the hero shape. */
export function SalonTeam({ team }: { team: TeamMember[] }) {
  return (
    <Section id="team" labelledBy="team-heading">
      <SectionHeading id="team-heading" eyebrow="The team" title="Hands you can trust" align="center" />
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <li key={member.name} className="text-center">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-full bg-secondary">
              <Image src={member.image} alt={member.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw" className="object-cover" />
            </div>
            <h3 className="mt-6 font-heading text-2xl italic">{member.name}</h3>
            <p className="mt-1 text-sm tracking-wider text-primary uppercase">{member.role}</p>
            {member.bio ? <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{member.bio}</p> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
