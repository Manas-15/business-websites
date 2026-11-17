import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Testimonial } from "@/types/content";

/** Stacked quotes in a single column, separated by hairlines. */
export function CafeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading" tone="muted">
      <SectionHeading id="testimonials-heading" eyebrow="Guests" title="In their words" />
      <ul className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {testimonials.map((testimonial, index) => (
          <li key={`${index}-${testimonial.author}`} className="py-10">
            <blockquote className="font-heading text-2xl leading-snug">“{testimonial.quote}”</blockquote>
            <p className="mt-5 text-sm">
              <span className="font-semibold">{testimonial.author}</span>
              <span className="text-muted-foreground"> · {testimonial.context}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
