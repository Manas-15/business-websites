"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/forms/FormField";
import { getInquiryDefinition, type FormValues, type InquiryKind } from "@/lib/inquiries";
import { whatsappLink } from "@/lib/links";
import type { ContactDetails } from "@/types/client-config";

interface InquiryFormProps {
  kind: InquiryKind;
  /** Choice lists for select fields (services, membership plans). */
  options?: string[];
  businessName: string;
  contact: ContactDetails;
}

interface PreparedRequest {
  subject: string;
  message: string;
}

/**
 * Validated form that prepares a request. Nothing is sent from the page: the
 * next step offers WhatsApp or email, so the visitor sends it from their own app.
 */
export function InquiryForm({ kind, options = [], businessName, contact }: InquiryFormProps) {
  const definition = getInquiryDefinition(kind, options);
  const [prepared, setPrepared] = useState<PreparedRequest | null>(null);
  // Keeps the visitor's answers so "Edit details" restores them instead of clearing the form.
  const [values, setValues] = useState<FormValues>(definition.initialValues);

  if (prepared) {
    return <PreparedPanel request={prepared} contact={contact} onEdit={() => setPrepared(null)} />;
  }

  return (
    <Formik<FormValues>
      initialValues={values}
      validationSchema={definition.schema}
      onSubmit={(submitted) => {
        setValues(submitted);
        setPrepared({
          subject: `${definition.title} - ${businessName}`,
          message: definition.buildMessage(submitted, businessName),
        });
      }}
    >
      <Form noValidate className="grid gap-5 md:grid-cols-2">
        {definition.fields.map((spec) => (
          <FormField key={spec.name} spec={spec} />
        ))}
        <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Nothing is sent from this page. You choose how to send your details on the next step.
          </p>
          <Button type="submit" size="lg">
            {definition.submitLabel}
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

function PreparedPanel({
  request,
  contact,
  onEdit,
}: {
  request: PreparedRequest;
  contact: ContactDetails;
  onEdit: () => void;
}) {
  const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.message)}`;

  return (
    <div role="status" className="space-y-6">
      <div>
        <p className="font-heading text-xl">Your request is ready</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Nothing has been sent yet. Check the message below, then choose how to send it.
        </p>
      </div>

      <pre className="rounded-[var(--radius)] bg-muted p-4 text-sm whitespace-pre-wrap text-foreground">{request.message}</pre>

      <div className="flex flex-wrap gap-3">
        {contact.whatsapp ? (
          <Button href={whatsappLink(contact.whatsapp, request.message)} external>
            Send on WhatsApp
          </Button>
        ) : null}
        <Button href={emailHref} variant="outline">
          Send by email
        </Button>
        <Button type="button" variant="ghost" onClick={onEdit}>
          Edit details
        </Button>
      </div>
    </div>
  );
}
