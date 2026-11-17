"use client";

import { useSyncExternalStore } from "react";
import { useField } from "formik";
import { todayIso, type FieldSpec } from "@/lib/inquiries";
import { cn } from "@/lib/utils";

const noSubscribe = () => () => {};

const controlClass =
  "w-full rounded-[var(--radius)] border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[invalid=true]:border-red-700";

/** A labelled input wired to Formik, with an accessible error message. */
export function FormField({ spec }: { spec: FieldSpec }) {
  const [field, meta] = useField(spec.name);
  // The earliest selectable date depends on the visitor's clock. It is read on the
  // client only, so the server renders no date and the page stays static.
  const minDate = useSyncExternalStore(
    noSubscribe,
    () => (spec.min === "today" ? todayIso() : undefined),
    () => undefined,
  );
  const id = `field-${spec.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(meta.touched && meta.error);

  const control = {
    ...field,
    id,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? errorId : undefined,
  };

  return (
    <div className={cn("flex flex-col", spec.wide && "md:col-span-2")}>
      <label htmlFor={id} className="mb-1.5 text-sm font-medium">
        {spec.label}
        {spec.optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
      </label>

      {spec.type === "select" ? (
        <select {...control} className={controlClass}>
          <option value="">Select an option</option>
          {spec.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : spec.type === "textarea" ? (
        <textarea {...control} rows={4} placeholder={spec.placeholder} className={cn(controlClass, "resize-y")} />
      ) : (
        <input
          {...control}
          type={spec.type}
          autoComplete={spec.autoComplete}
          placeholder={spec.placeholder}
          min={minDate}
          className={controlClass}
        />
      )}

      {invalid ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
}
