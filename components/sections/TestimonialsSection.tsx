import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedTestimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { FadeIn } from "@/components/motion/FadeIn";

export function TestimonialsSection() {
  const testimonials = getFeaturedTestimonials(3);

  return (
    <section className="section-spacing bg-surface-muted">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="What Our Customers Say"
              subtitle="Real feedback from drivers who trust us with their vehicles."
            />
            <Link
              href="/testimonials"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Read all reviews →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.08}>
              <TestimonialCard testimonial={testimonial} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
