import * as yup from "yup";

/*
 * Form definitions for the site's four inquiry types. Nothing here sends data:
 * a valid form produces a message that the visitor sends via WhatsApp or email.
 * This module is client-safe and is imported by InquiryForm, so server components
 * pass only the kind and option lists, never the functions.
 */

export type InquiryKind = "contact" | "reservation" | "appointment" | "inquiry";

export type FormValues = Record<string, string>;

export interface FieldSpec {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "time" | "select" | "textarea";
  autoComplete?: string;
  options?: string[];
  placeholder?: string;
  /** "today" fills in the earliest selectable date after mount, never during render. */
  min?: "today";
  optional?: boolean;
  /** Spans both columns on desktop. */
  wide?: boolean;
}

export interface InquiryDefinition {
  /** Used as the email subject and in the prepared message. */
  title: string;
  submitLabel: string;
  fields: FieldSpec[];
  initialValues: FormValues;
  schema: yup.AnyObjectSchema;
  buildMessage: (values: FormValues, businessName: string) => string;
}

const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const PARTY_SIZES = Array.from({ length: 12 }, (_, index) => String(index + 1));

/** Today's date in the visitor's local time zone, as YYYY-MM-DD. */
export function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

const nameRule = yup.string().trim().required("Enter your name").max(80, "Keep it under 80 characters");

const phoneRule = yup
  .string()
  .trim()
  .required("Enter your phone number")
  .test(
    "phone",
    "Enter a valid phone number",
    (value) => !!value && PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= 7,
  );

const emailRule = yup.string().trim().email("Enter a valid email address").max(120, "Keep it under 120 characters");

const dateRule = yup
  .string()
  .required("Choose a date")
  .test("not-past", "Choose today or a later date", (value) => !!value && value >= todayIso());

const timeRule = yup.string().required("Choose a time");

function choiceRule(options: string[], message: string): yup.StringSchema<string> {
  const base = yup.string().required(message);
  return options.length > 0 ? base.oneOf(options, "Choose one of the listed options") : base;
}

function lines(...parts: (string | undefined)[]): string {
  return parts.filter((part): part is string => Boolean(part)).join("\n");
}

function contactLines(values: FormValues): string {
  return lines(
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : undefined,
  );
}

function definitionFor(kind: InquiryKind, options: string[]): InquiryDefinition {
  switch (kind) {
    case "contact":
      return {
        title: "Website enquiry",
        submitLabel: "Prepare my message",
        fields: [
          { name: "name", label: "Name", type: "text", autoComplete: "name" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "email", label: "Email", type: "email", autoComplete: "email", optional: true },
          { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?", wide: true },
        ],
        initialValues: { name: "", phone: "", email: "", message: "" },
        schema: yup.object({
          name: nameRule,
          phone: phoneRule,
          email: emailRule,
          message: yup
            .string()
            .trim()
            .required("Tell us how we can help")
            .min(10, "Add a few more details (at least 10 characters)")
            .max(1000, "Keep it under 1000 characters"),
        }),
        buildMessage: (values, businessName) =>
          lines(
            `Hello ${businessName}, I'd like to get in touch.`,
            "",
            contactLines(values),
            "",
            values.message,
          ),
      };

    case "reservation":
      return {
        title: "Table reservation request",
        submitLabel: "Prepare my request",
        fields: [
          { name: "name", label: "Name", type: "text", autoComplete: "name" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "email", label: "Email", type: "email", autoComplete: "email", optional: true },
          { name: "date", label: "Date", type: "date", min: "today" },
          { name: "time", label: "Time", type: "time" },
          { name: "guests", label: "Party size", type: "select", options: PARTY_SIZES },
        ],
        initialValues: { name: "", phone: "", email: "", date: "", time: "", guests: "" },
        schema: yup.object({
          name: nameRule,
          phone: phoneRule,
          email: emailRule,
          date: dateRule,
          time: timeRule,
          guests: yup.string().required("Choose the party size").oneOf(PARTY_SIZES, "Choose a party size from the list"),
        }),
        buildMessage: (values, businessName) =>
          lines(
            `Table request for ${businessName}: ${values.date} at ${values.time}, ${values.guests} guest(s).`,
            "",
            contactLines(values),
          ),
      };

    case "appointment":
      return {
        title: "Appointment request",
        submitLabel: "Prepare my request",
        fields: [
          { name: "name", label: "Name", type: "text", autoComplete: "name" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "email", label: "Email", type: "email", autoComplete: "email", optional: true },
          { name: "service", label: "Service", type: "select", options, wide: true },
          { name: "date", label: "Preferred date", type: "date", min: "today" },
          { name: "time", label: "Preferred time", type: "time" },
          { name: "notes", label: "Notes", type: "textarea", placeholder: "Allergies, skin concerns or anything we should know", optional: true, wide: true },
        ],
        initialValues: { name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" },
        schema: yup.object({
          name: nameRule,
          phone: phoneRule,
          email: emailRule,
          service: choiceRule(options, "Choose a service"),
          date: dateRule,
          time: timeRule,
          notes: yup.string().trim().max(500, "Keep it under 500 characters"),
        }),
        buildMessage: (values, businessName) =>
          lines(
            `Appointment request for ${businessName}: ${values.service} on ${values.date} at ${values.time}.`,
            "",
            contactLines(values),
            values.notes ? `\nNotes: ${values.notes}` : undefined,
          ),
      };

    case "inquiry":
      return {
        title: "Membership enquiry",
        submitLabel: "Prepare my enquiry",
        fields: [
          { name: "name", label: "Name", type: "text", autoComplete: "name" },
          { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
          { name: "email", label: "Email", type: "email", autoComplete: "email", optional: true },
          { name: "interest", label: "I'm interested in", type: "select", options, wide: true },
          { name: "message", label: "Message", type: "textarea", placeholder: "Goals, schedule or questions", optional: true, wide: true },
        ],
        initialValues: { name: "", phone: "", email: "", interest: "", message: "" },
        schema: yup.object({
          name: nameRule,
          phone: phoneRule,
          email: emailRule,
          interest: choiceRule(options, "Choose what you are interested in"),
          message: yup.string().trim().max(1000, "Keep it under 1000 characters"),
        }),
        buildMessage: (values, businessName) =>
          lines(
            `Enquiry for ${businessName}: interested in ${values.interest}.`,
            "",
            contactLines(values),
            values.message ? `\nMessage: ${values.message}` : undefined,
          ),
      };
  }
}

export function getInquiryDefinition(kind: InquiryKind, options: string[] = []): InquiryDefinition {
  return definitionFor(kind, options);
}
