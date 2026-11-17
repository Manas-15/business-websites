import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import type { AboutCopy } from "@/types/content";

/** Centered, narrow reading column with a hairline above. */
export function CafeAbout({ copy }: { copy: AboutCopy }) {
  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="max-w-3xl text-center">
        <div className="mx-auto mb-10 h-px w-12 bg-foreground/30" aria-hidden="true" />
        <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">{copy.eyebrow}</p>
        <h2 id="about-heading" className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">
          {copy.title}
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
