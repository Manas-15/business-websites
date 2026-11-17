import { Star } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Testimonial } from "@/types/content";

export function GymTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow="Member stories" title="Results members talk about" />
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={`${index}-${testimonial.author}`} className="flex flex-col border border-border bg-muted p-8">
            <div className="flex gap-1 text-primary" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-4" fill={index < testimonial.rating ? "currentColor" : "none"} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-heading text-lg leading-snug">“{testimonial.quote}”</blockquote>
            <p className="mt-6 text-sm">
              <span className="font-bold">{testimonial.author}</span>
              <span className="text-muted-foreground"> · {testimonial.context}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
