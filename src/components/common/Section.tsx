import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "primary";

interface SectionProps {
  id?: string;
  /** id of the heading that labels this section, for screen readers. */
  labelledBy?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  primary: "bg-primary text-primary-foreground",
};

export function Section({ id, labelledBy, tone = "default", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
