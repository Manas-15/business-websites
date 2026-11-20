import { Sparkles } from "lucide-react";

/** A scrolling ticker of short phrases in the brand colour. Stops for visitors who prefer reduced motion. */
export function NightMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  // Repeat short lists so one copy is always wider than the screen.
  const base = items.length < 6 ? [...items, ...items, ...items] : items;
  const track = [...base, ...base];

  return (
    <div className="overflow-hidden bg-primary py-4 text-primary-foreground" aria-label={items.join(", ")} role="marquee">
      <ul className="animate-marquee flex w-max items-center" aria-hidden="true">
        {track.map((item, index) => (
          <li key={index} className="flex items-center gap-6 pr-6 font-heading text-2xl tracking-wider whitespace-nowrap uppercase sm:text-3xl">
            {item}
            <Sparkles className="size-5 opacity-70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
