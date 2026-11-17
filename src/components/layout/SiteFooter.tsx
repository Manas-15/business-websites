import { Container } from "@/components/common/Container";
import { SocialLinks } from "@/components/common/SocialLinks";
import { Separator } from "@/components/ui/separator";
import { telLink } from "@/lib/links";
import type { ClientConfig, NavItem } from "@/types/client-config";

interface SiteFooterProps {
  config: ClientConfig;
  navigation: NavItem[];
}

export function SiteFooter({ config, navigation }: SiteFooterProps) {
  const { business, contact, openingHours, social } = config;

  return (
    <footer className="bg-muted text-foreground">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-heading text-xl font-semibold">{business.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{business.tagline}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-semibold">Contact</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href={telLink(contact.phone)} className="hover:text-primary">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>

        {openingHours && openingHours.length > 0 ? (
          <div className="space-y-3 text-sm">
            <h2 className="font-semibold">Opening hours</h2>
            <ul className="space-y-2 text-muted-foreground">
              {openingHours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-3 text-sm">
          <h2 className="font-semibold">Explore</h2>
          <ul className="space-y-2 text-muted-foreground">
            {navigation.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <a href={item.href} className="hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {social ? <SocialLinks links={social} className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm" /> : null}
        </div>
      </Container>

      <Separator />
      <Container className="py-6 text-center text-xs text-muted-foreground sm:text-left">
        © {business.name}. All rights reserved.
      </Container>
    </footer>
  );
}
