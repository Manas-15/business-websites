import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { JsonLd } from "@/components/common/JsonLd";
import { getNavigation } from "@/config/navigation";
import { buildThemeStyle } from "@/config/theme";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/site-url";
import type { ClientConfig } from "@/types/client-config";

interface SiteShellProps {
  config: ClientConfig;
  children: ReactNode;
  /** Shown above the site, e.g. the admin's "previewing" strip. */
  banner?: ReactNode;
}

/**
 * The complete public site for one business: theme, announcement bar, header,
 * page content, footer and the WhatsApp button. The theme is applied on this
 * wrapper (not <html>), so the same build can render any business per request.
 */
export function SiteShell({ config, children, banner }: SiteShellProps) {
  const { business, contact, announcement } = config;
  const navigation = getNavigation(config);

  return (
    <div id="top" style={buildThemeStyle(config.theme)} className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <JsonLd data={buildLocalBusinessJsonLd(config, getSiteUrl())} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      {banner}
      {announcement ? <AnnouncementBar announcement={announcement} /> : null}
      <SiteHeader business={business} navigation={navigation} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter config={config} navigation={navigation} />
      {contact.whatsapp ? <WhatsAppButton number={contact.whatsapp} businessName={business.name} /> : null}
    </div>
  );
}
