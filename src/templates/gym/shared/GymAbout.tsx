import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import type { AboutCopy } from "@/types/content";

/** Two columns: a condensed headline beside the body copy. */
export function GymAbout({ copy }: { copy: AboutCopy }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase">{copy.eyebrow}</p>
          <h2 id="about-heading" className="mt-4 font-heading text-4xl leading-[1] font-black tracking-tight uppercase sm:text-5xl">
            {copy.title}
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground md:pt-10">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
