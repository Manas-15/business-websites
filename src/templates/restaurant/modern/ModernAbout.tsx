import Image from "next/image";
import { Section } from "@/components/common/Section";
import type { AboutCopy } from "@/types/content";

interface ModernAboutProps {
  copy: AboutCopy;
  image: { src: string; alt: string };
}

/** Rounded card with the story on one side and the photo on the other. */
export function ModernAbout({ copy, image }: ModernAboutProps) {
  return (
    <Section id="about" labelledBy="about-heading" tone="muted">
      <div className="grid overflow-hidden rounded-3xl bg-background md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{copy.eyebrow}</p>
          <h2 id="about-heading" className="mt-4 font-heading text-3xl leading-tight font-bold sm:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={1000}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-72 w-full object-cover sm:h-96 md:h-full"
        />
      </div>
    </Section>
  );
}
