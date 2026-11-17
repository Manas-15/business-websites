import { Star } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Testimonial } from "@/types/content";

export function LuxuryTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow="Guest notes" title="Kind words from our tables" align="center" />
      <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={`${index}-${testimonial.author}`} className="text-center">
            <div className="flex justify-center gap-1 text-primary" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-4" fill={index < testimonial.rating ? "currentColor" : "none"} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 font-heading text-xl leading-relaxed italic">“{testimonial.quote}”</blockquote>
            <p className="mt-5 text-sm font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
