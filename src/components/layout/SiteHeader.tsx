import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { MobileNav } from "@/components/navigation/MobileNav";
import { NavLinks } from "@/components/navigation/NavLinks";
import { monogram } from "@/lib/monogram";
import type { BusinessInfo, NavItem } from "@/types/client-config";

interface SiteHeaderProps {
  business: BusinessInfo;
  navigation: NavItem[];
}

export function SiteHeader({ business, navigation }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex h-18 items-center justify-between gap-6">
        {/* Back to the top of this page, so demo links (/s/<slug>) never jump to another business. */}
        <a href="#top" aria-label={`${business.name}, back to top`} className="flex items-center gap-3 rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          {business.logo ? (
            <Image src={business.logo} alt="" width={40} height={40} className="size-10 object-contain" priority />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-[var(--radius)] bg-primary font-heading text-base font-semibold text-primary-foreground"
            >
              {monogram(business.name)}
            </span>
          )}
          <span className="font-heading text-lg leading-tight font-semibold">{business.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={navigation} />
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#reservations" size="md" className="hidden sm:inline-flex">
            Reserve a table
          </Button>
          <MobileNav items={navigation} businessName={business.name} />
        </div>
      </Container>
    </header>
  );
}
