import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import type { Highlight } from "@/types/content";

interface HighlightsProps {
  items: Highlight[];
  /** "editorial" is a ruled strip for serif templates; "cards" uses tinted tiles. */
  style?: "editorial" | "cards";
}

/** A strip of number-led facts (years open, seats, rating) shown right under the hero. */
export function Highlights({ items, style = "editorial" }: HighlightsProps) {
  if (items.length === 0) return null;

  return (
    <section aria-label="Highlights" className={cn(style === "editorial" ? "border-y border-border bg-background" : "bg-background py-6")}>
      <Container>
        <dl
          className={cn(
            "grid grid-cols-2 gap-px",
            style === "editorial" ? "divide-border sm:grid-cols-4 sm:divide-x" : "gap-4 sm:grid-cols-4",
          )}
        >
          {items.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col text-center",
                style === "editorial" ? "px-4 py-7" : "rounded-2xl bg-secondary px-4 py-6 text-secondary-foreground",
              )}
            >
              <dt className="order-2 mt-1 text-xs font-medium tracking-[0.14em] uppercase opacity-75">{item.label}</dt>
              <dd className={cn("font-heading text-2xl sm:text-3xl", style === "editorial" ? "text-primary" : "font-bold")}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
