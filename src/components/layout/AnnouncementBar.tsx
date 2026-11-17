import type { Announcement } from "@/types/client-config";

interface AnnouncementBarProps {
  announcement: Announcement;
}

/** Optional top strip for promotions or notices. Rendered only when configured. */
export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const content = announcement.href ? (
    <a href={announcement.href} className="underline-offset-4 hover:underline">
      {announcement.text}
    </a>
  ) : (
    announcement.text
  );

  return (
    <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
      {content}
    </div>
  );
}
