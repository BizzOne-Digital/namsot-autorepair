import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/content";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FadeIn } from "@/components/motion/FadeIn";

interface ServicesSectionProps {
  showViewAll?: boolean;
  limit?: number;
}

export async function ServicesSection({
  showViewAll = true,
  limit = 6,
}: ServicesSectionProps) {
  const services = (await getServices()).slice(0, limit);

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-section-light">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Our Services"
              subtitle="From routine maintenance to complex repairs, we keep your vehicle performing at its best."
            />
            {showViewAll ? (
              <Link
                href="/services"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                View all services →
              </Link>
            ) : null}
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service._id} delay={index * 0.05}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
