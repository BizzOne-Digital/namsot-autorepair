import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getServices } from "@/lib/content";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/data/images";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Complete automotive repair and maintenance services — oil changes, brakes, diagnostics, tires, and more.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Our Services"
        description="Professional repair and maintenance in our full-service workshop — from Porsche, BMW, and Mercedes to SUVs and everyday vehicles."
        imageUrl={images.servicesHero.src}
        imageAlt={images.servicesHero.alt}
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          {services.length === 0 ? (
            <EmptyState
              title="Service list coming soon"
              description="We are updating our service menu. Call the shop and we will talk you through what your vehicle needs."
            />
          ) : (
            <>
              <p className="mb-10 max-w-3xl text-base text-muted leading-relaxed">
                Every service is performed in our workshop by certified technicians.
                We work on premium European brands, sports cars, SUVs, and daily
                drivers — the same professional care no matter what you drive.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <FadeIn key={service._id} delay={index * 0.03}>
                  <ServiceCard service={service} />
                </FadeIn>
              ))}
              </div>
            </>
          )}
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
