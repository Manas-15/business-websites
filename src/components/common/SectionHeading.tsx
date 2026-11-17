import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Heading id, so the enclosing Section can reference it via `labelledBy`. */
  id?: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  id,
  eyebrow,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="mt-3 font-heading text-3xl leading-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
