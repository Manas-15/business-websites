"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/types/content";

interface NightMenuProps {
  categories: MenuCategory[];
  note?: string;
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <div className="min-w-0">
        <h4 className="font-sans text-base font-medium">
          {item.vegetarian ? (
            <span
              className="mr-2 inline-flex size-3.5 translate-y-[1px] items-center justify-center border border-green-500"
              role="img"
              aria-label="Vegetarian"
            >
              <span className="size-1.5 rounded-full bg-green-500" />
            </span>
          ) : null}
          {item.name}
          {item.tag ? (
            <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 align-middle text-[0.65rem] font-bold tracking-[0.12em] text-primary uppercase">
              {item.tag}
            </span>
          ) : null}
        </h4>
        {item.description ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
      </div>
      {item.price ? <span className="shrink-0 text-right font-semibold text-primary tabular-nums">{item.price}</span> : null}
    </li>
  );
}

function hasLongPrices(category: MenuCategory): boolean {
  return category.items.some((item) => (item.price?.split("/").length ?? 0) > 2);
}

/**
 * Long food and bar menus as tabs: one category at a time, picked from a row of
 * pills that scrolls sideways on phones. Every category stays in the HTML (only
 * hidden), so search engines and no-JavaScript visitors still get the full menu.
 */
export function NightMenu({ categories, note }: NightMenuProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % categories.length,
      ArrowLeft: (index - 1 + categories.length) % categories.length,
      Home: 0,
      End: categories.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="menu" labelledBy="menu-heading">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">Kitchen &amp; bar</p>
        <h2 id="menu-heading" className="mt-3 font-heading text-5xl leading-none tracking-wide uppercase sm:text-6xl">
          The menu
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Menu categories"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {categories.map((category, index) => {
          const selected = index === active;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-[var(--radius)] border border-border bg-muted p-5 sm:p-8">
        {categories.map((category, index) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`${baseId}-panel-${category.id}`}
            aria-labelledby={`${baseId}-tab-${category.id}`}
            hidden={index !== active}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/40 pb-4">
              <h3 className="font-heading text-4xl tracking-wide uppercase">{category.name}</h3>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{category.items.length} items</span>
            </div>
            {category.description ? <p className="mt-3 text-sm text-muted-foreground">{category.description}</p> : null}
            {/* Bar lists with three or more prices per line need the full width. */}
            <ul className={cn("mt-2 grid gap-x-10", !hasLongPrices(category) && "md:grid-cols-2")}>
              {category.items.map((item) => (
                <MenuRow key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {note ? <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
    </Section>
  );
}
