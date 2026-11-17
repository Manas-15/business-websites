import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SocialLinks } from "@/components/common/SocialLinks";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { telLink } from "@/lib/links";
import type { ContactDetails, SocialLinks as SocialLinksConfig } from "@/types/client-config";

interface ContactSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  businessName: string;
  contact: ContactDetails;
  social?: SocialLinksConfig;
  /** "inquiry" adds a choice of interest, e.g. membership plans. */
  formKind?: "contact" | "inquiry";
  formOptions?: string[];
}

/** Contact details beside a message form. */
export function ContactSection({
  id = "contact",
  eyebrow = "Contact",
  title = "Questions? Get in touch",
  description = "Send us a message, call, or email. We will get back to you.",
  businessName,
  contact,
  social,
  formKind = "contact",
  formOptions,
}: ContactSectionProps) {
  const details = [
    { icon: MapPin, label: "Address", value: contact.address, href: undefined },
    { icon: Phone, label: "Phone", value: contact.phone, href: telLink(contact.phone) },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} description={description} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-muted-foreground">{label}</span>
                    <span className="font-semibold break-all">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 rounded-[var(--radius)] border border-border p-5 transition-colors hover:border-primary"
                >
                  {body}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 rounded-[var(--radius)] border border-border p-5">
                  {body}
                </div>
              );
            })}
            {social ? <SocialLinks links={social} className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm font-medium" /> : null}
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-background p-6 sm:p-8">
            <h3 className="mb-6 font-heading text-2xl">Send a message</h3>
            <InquiryForm kind={formKind} options={formOptions} businessName={businessName} contact={contact} />
          </div>
        </div>
      </Container>
    </section>
  );
}
