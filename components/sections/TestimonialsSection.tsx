import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/content";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { FadeIn } from "@/components/motion/FadeIn";

export async function TestimonialsSection() {
  const testimonials = (await getTestimonials()).slice(0, 3);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-section-dark">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="What Our Customers Say"
              subtitle="Real feedback from drivers who trust us with their vehicles."
              className="[&_h2]:text-off-white [&_p]:text-off-white/70"
            />
            <Link
              href="/testimonials"
              className="text-sm font-medium text-accent-light hover:text-off-white transition-colors"
            >
              Read all reviews →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial._id} delay={index * 0.08}>
              <TestimonialCard testimonial={testimonial} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
