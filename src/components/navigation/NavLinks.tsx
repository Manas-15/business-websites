import type { NavItem } from "@/types/client-config";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  items: NavItem[];
  /** Layout for desktop bar or mobile sheet. */
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

/** Primary navigation list. Used by both the desktop bar and the mobile sheet. */
export function NavLinks({ items, orientation = "horizontal", onNavigate }: NavLinksProps) {
  return (
    <ul className={cn(orientation === "horizontal" ? "flex items-center gap-8" : "flex flex-col gap-1")}>
      {items.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <a
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-[var(--radius)] text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              orientation === "vertical" && "px-3 py-3 text-base",
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
