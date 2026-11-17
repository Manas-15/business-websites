import Image from "next/image";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";
import type { ChefProfile } from "@/types/content";

interface ChefSectionProps {
  chef: ChefProfile;
  /** "editorial" is a quiet serif layout; "cards" is a rounded, bolder one. */
  style?: "editorial" | "cards";
}

/** Portrait beside a large pull-quote from the chef or founder. */
export function ChefSection({ chef, style = "editorial" }: ChefSectionProps) {
  const editorial = style === "editorial";

  return (
    <Section id="chef" labelledBy="chef-heading" tone={editorial ? "default" : "muted"}>
      <div className={cn("grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20", !editorial && "overflow-hidden rounded-3xl bg-background")}>
        {chef.image ? (
          <div className={cn("relative", editorial ? "mx-auto w-full max-w-sm lg:max-w-none" : "")}>
            <Image
              src={chef.image}
              alt={`${chef.name}, ${chef.title}`}
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={cn("w-full object-cover", editorial ? "aspect-[4/5] rounded-t-[12rem]" : "aspect-[4/5] md:aspect-auto md:h-full")}
            />
          </div>
        ) : null}
        <div className={cn(!editorial && "p-8 sm:p-12", editorial && "lg:pr-8")}>
          <p className={cn("text-sm font-semibold uppercase text-primary", editorial ? "tracking-[0.3em] font-medium" : "tracking-[0.18em]")}>
            Meet the chef
          </p>
          <blockquote
            id="chef-heading"
            className={cn("mt-5 font-heading leading-snug text-balance", editorial ? "text-3xl italic sm:text-4xl" : "text-3xl font-bold sm:text-4xl")}
          >
            “{chef.quote}”
          </blockquote>
          {chef.bio ? <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{chef.bio}</p> : null}
          <p className="mt-8 font-semibold">{chef.name}</p>
          <p className="text-sm text-muted-foreground">{chef.title}</p>
        </div>
      </div>
    </Section>
  );
}
