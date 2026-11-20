import { Quote, Star } from "lucide-react";
import { Section } from "@/components/common/Section";
import type { Testimonial } from "@/types/content";

/** Guest reviews as dark cards with an oversized quote mark in the brand colour. */
export function NightTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <div className="mb-12">
        <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase">Word on the street</p>
        <h2 id="testimonials-heading" className="mt-3 font-heading text-5xl leading-none tracking-wide uppercase sm:text-6xl">
          What guests say
        </h2>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li
            key={`${index}-${testimonial.author}`}
            className="flex flex-col rounded-[var(--radius)] border border-border bg-muted p-7"
          >
            <Quote className="size-10 text-primary" aria-hidden="true" />
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed">{testimonial.quote}</blockquote>
            <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.context}</p>
              </div>
              <div className="flex gap-0.5 text-primary" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} className="size-4" fill={star < testimonial.rating ? "currentColor" : "none"} aria-hidden="true" />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
