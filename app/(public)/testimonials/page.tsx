import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getTestimonials } from "@/lib/content";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Read what our customers say about ${siteConfig.name}.`,
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader
        title="Customer Testimonials"
        description="Real reviews from drivers who trust us with their vehicles."
        imageUrl={images.testimonialsHero.src}
        imageAlt={images.testimonialsHero.alt}
        imageClassName="object-[35%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          {testimonials.length === 0 ? (
            <EmptyState
              title="No reviews published yet"
              description="Been in for a service? We would love to hear how it went — get in touch and tell us."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <FadeIn key={testimonial._id} delay={index * 0.03}>
                  <TestimonialCard testimonial={testimonial} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
