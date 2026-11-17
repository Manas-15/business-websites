import { Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { telLink } from "@/lib/links";
import type { InquiryKind } from "@/lib/inquiries";
import type { ContactDetails } from "@/types/client-config";

interface InquirySectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  kind: Extract<InquiryKind, "reservation" | "appointment">;
  /** Service names for appointment requests. */
  options?: string[];
  businessName: string;
  contact: ContactDetails;
  tone?: "default" | "primary";
}

/** Heading and short copy beside a request form, with a phone fallback. */
export function InquirySection({
  id,
  eyebrow,
  title,
  description,
  kind,
  options,
  businessName,
  contact,
  tone = "default",
}: InquirySectionProps) {
  const onPrimary = tone === "primary";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={onPrimary ? "bg-primary py-16 text-primary-foreground sm:py-20" : "bg-muted py-16 text-foreground sm:py-20"}
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-80">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed opacity-90">{description}</p>
          <a
            href={telLink(contact.phone)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            <Phone className="size-4" aria-hidden="true" />
            Prefer to call? {contact.phone}
          </a>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-background p-6 text-foreground sm:p-8">
          <InquiryForm kind={kind} options={options} businessName={businessName} contact={contact} />
        </div>
      </Container>
    </section>
  );
}
