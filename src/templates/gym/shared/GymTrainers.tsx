import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Trainer } from "@/types/content";

/** Portraits start in greyscale and colour on hover, keeping the palette restrained. */
export function GymTrainers({ trainers }: { trainers: Trainer[] }) {
  return (
    <Section id="trainers" labelledBy="trainers-heading">
      <SectionHeading id="trainers-heading" eyebrow="Coaches" title="People who will push you" />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <li key={trainer.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
              />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-black uppercase">{trainer.name}</h3>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">{trainer.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{trainer.bio}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
