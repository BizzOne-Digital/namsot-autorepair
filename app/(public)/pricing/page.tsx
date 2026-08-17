import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPricingPlans } from "@/lib/content";
import { PricingCard } from "@/components/pricing/PricingCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for automotive services and maintenance packages at Namsot Auto Repairs.",
};

const pricingHeroImage =
  "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=2400&q=80";

export default async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <>
      <PageHeader
        title="Service Pricing"
        description="Clear, upfront pricing for our most popular services. Final costs may vary based on vehicle type and condition."
        imageUrl={pricingHeroImage}
        imageAlt="Organised wall of hand tools in the repair workshop"
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing">
        <Container>
          <FadeIn>
            <p className="mb-10 max-w-2xl text-sm text-muted">
              Prices shown are starting rates. We provide a detailed estimate
              before any work begins. Package pricing and seasonal promotions
              may apply — contact us for current offers.
            </p>
          </FadeIn>

          {plans.length === 0 ? (
            <EmptyState
              title="Pricing is being updated"
              description="Contact the shop for a current quote while we refresh our published rates."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <FadeIn key={plan._id} delay={index * 0.05}>
                  <PricingCard plan={plan} />
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-muted">
                Need a custom quote for your vehicle?
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Request an estimate →
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
