import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFaqs } from "@/lib/content";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/data/images";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about automotive repair and our services.",
};

export default async function FAQPage() {
  const items = await getFaqs();

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Answers to common questions about our services, scheduling, and vehicle maintenance."
        imageUrl={images.faqHero.src}
        imageAlt={images.faqHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
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
