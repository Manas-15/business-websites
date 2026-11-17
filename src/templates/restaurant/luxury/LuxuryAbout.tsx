import Image from "next/image";
import { Section } from "@/components/common/Section";
import type { AboutCopy } from "@/types/content";

interface LuxuryAboutProps {
  copy: AboutCopy;
  image: { src: string; alt: string };
}

/** Editorial two-column layout: an offset photo frame beside a large serif lead paragraph. */
export function LuxuryAbout({ copy, image }: LuxuryAboutProps) {
  const [lead, ...rest] = copy.paragraphs;
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative pr-4 pb-4 sm:pr-6 sm:pb-6">
          <div className="absolute inset-0 border border-primary/40" aria-hidden="true" />
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={1200}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="relative aspect-square w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase">{copy.eyebrow}</p>
          <h2 id="about-heading" className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-6 font-heading text-xl leading-relaxed text-foreground/85 sm:text-2xl">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-5 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
