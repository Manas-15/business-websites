import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { mapsSearchLink } from "@/lib/links";
import type { ContactDetails, OpeningHour } from "@/types/client-config";

interface LocationSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  businessName: string;
  contact: ContactDetails;
  /** Pass to list hours beside the address. Omit when hours are shown in their own section. */
  openingHours?: OpeningHour[];
}

/** Address, optional hours and an embedded map. Falls back to a Maps link if no embed URL is set. */
export function LocationSection({ id = "location", eyebrow, title, businessName, contact, openingHours }: LocationSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-muted py-16 sm:py-20">
      <Container>
        <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8 rounded-[var(--radius)] border border-border bg-background p-6 sm:p-8">
            <div className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="mt-1 text-muted-foreground">{contact.address}</p>
              </div>
            </div>
            {openingHours && openingHours.length > 0 ? (
              <div className="flex gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="w-full">
                  <h3 className="font-semibold">Opening hours</h3>
                  <dl className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {openingHours.map((entry) => (
                      <div key={entry.day} className="flex justify-between gap-4">
                        <dt>{entry.day}</dt>
                        <dd>{entry.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ) : null}
            <Button href={mapsSearchLink(contact.address)} variant="outline" external>
              Open in Google Maps
            </Button>
          </div>

          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              title={`Map showing ${businessName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-[var(--radius)] border border-border lg:aspect-auto lg:min-h-96"
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
