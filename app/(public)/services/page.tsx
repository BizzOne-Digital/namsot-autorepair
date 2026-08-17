import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getServices } from "@/lib/content";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Complete automotive repair and maintenance services — oil changes, brakes, diagnostics, tires, and more.",
};

const servicesHeroImage =
  "https://images.unsplash.com/photo-1771340012319-0b4fca008b54?auto=format&fit=crop&w=2400&q=80";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Our Services"
        description="Professional automotive repair and maintenance for every need. Quality parts, skilled technicians, and honest recommendations."
        imageUrl={servicesHeroImage}
        imageAlt="Technician servicing a vehicle in a modern repair bay"
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing">
        <Container>
          {services.length === 0 ? (
            <EmptyState
              title="Service list coming soon"
              description="We are updating our service menu. Call the shop and we will talk you through what your vehicle needs."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <FadeIn key={service._id} delay={index * 0.03}>
                  <ServiceCard service={service} />
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
