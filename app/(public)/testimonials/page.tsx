import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getAllTestimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our customers say about Namsot Auto Repairs.",
};

const testimonialsHeroImage =
  "https://images.unsplash.com/photo-1727893327548-031c0f831cdb?auto=format&fit=crop&w=2400&q=80";

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <>
      <PageHeader
        title="Customer Testimonials"
        description="Real reviews from drivers who trust us with their vehicles."
        imageUrl={testimonialsHeroImage}
        imageAlt="Technician reviewing customer vehicles in the service centre"
        imageClassName="object-[35%_center]"
      />

      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.03}>
                <TestimonialCard testimonial={testimonial} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
