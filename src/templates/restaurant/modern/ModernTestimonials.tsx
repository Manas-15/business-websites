import { Star } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Testimonial } from "@/types/content";

/** Review cards in a swipeable row on phones and a three-up grid on desktop. */
export function ModernTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading" tone="muted">
      <SectionHeading id="testimonials-heading" eyebrow="Reviews" title="What guests say" />
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={`${index}-${testimonial.author}`} className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl bg-background p-6 sm:w-auto">
            <div className="flex gap-0.5 text-primary" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-4" fill={index < testimonial.rating ? "currentColor" : "none"} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 leading-relaxed">“{testimonial.quote}”</blockquote>
            <footer className="mt-6">
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.context}</p>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
