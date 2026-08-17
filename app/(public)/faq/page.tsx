import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFaqs } from "@/lib/content";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about automotive repair and our services.",
};

const faqHeroImage =
  "https://images.unsplash.com/photo-1730461748617-1ad7e6e56db2?auto=format&fit=crop&w=2400&q=80";

export default async function FAQPage() {
  const items = await getFaqs();

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Answers to common questions about our services, scheduling, and vehicle maintenance."
        imageUrl={faqHeroImage}
        imageAlt="Shelf of automotive repair manuals and technical references"
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing">
        <Container size="md">
          {items.length === 0 ? (
            <EmptyState
              title="No questions published yet"
              description="Have a question about your vehicle? Get in touch and we will answer it directly."
            />
          ) : (
            <FadeIn>
              <FAQAccordion items={items} />
            </FadeIn>
          )}
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
