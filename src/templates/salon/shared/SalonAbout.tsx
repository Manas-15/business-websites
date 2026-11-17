import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import type { AboutCopy } from "@/types/content";

/** Centered editorial block, framed by thin rules. */
export function SalonAbout({ copy }: { copy: AboutCopy }) {
  return (
    <Section id="about" labelledBy="about-heading" tone="muted">
      <Container className="max-w-3xl text-center">
        <p className="text-sm tracking-[0.3em] text-primary uppercase">{copy.eyebrow}</p>
        <h2 id="about-heading" className="mt-4 font-heading text-3xl leading-tight italic sm:text-4xl">
          {copy.title}
        </h2>
        <div className="mx-auto my-8 h-px w-16 bg-primary/50" aria-hidden="true" />
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
