import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Testimonial } from "@/types/content";

/** Centered italic quotes, one per column. */
export function SalonTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow="Kind words" title="From our clients" align="center" />
      <ul className="grid gap-12 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={`${index}-${testimonial.author}`} className="text-center">
            <blockquote className="font-heading text-xl leading-relaxed italic">“{testimonial.quote}”</blockquote>
            <p className="mt-6 text-sm">
              <span className="font-semibold">{testimonial.author}</span>
              <span className="text-muted-foreground"> · {testimonial.context}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
