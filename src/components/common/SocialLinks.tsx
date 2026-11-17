import type { SocialLinks as SocialLinksConfig } from "@/types/client-config";

interface SocialLinksProps {
  links: SocialLinksConfig;
  className?: string;
}

const LABELS: Record<keyof SocialLinksConfig, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};

/** Text links for each configured social profile. Empty profiles are skipped. */
export function SocialLinks({ links, className }: SocialLinksProps) {
  const entries = (Object.keys(LABELS) as (keyof SocialLinksConfig)[]).flatMap((key) => {
    const href = links[key];
    return href ? [{ key, href, label: LABELS[key] }] : [];
  });

  if (entries.length === 0) return null;

  return (
    <ul className={className ?? "flex flex-wrap gap-x-5 gap-y-2 text-sm"}>
      {entries.map((entry) => (
        <li key={entry.key}>
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {entry.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
