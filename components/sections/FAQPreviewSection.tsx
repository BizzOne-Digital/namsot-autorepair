import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFAQItems } from "@/data/faq";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FadeIn } from "@/components/motion/FadeIn";

export function FAQPreviewSection() {
  const items = getAllFAQItems().slice(0, 5);

  return (
    <section className="section-spacing bg-surface-muted">
      <Container size="md">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Common questions about our services, scheduling, and vehicle maintenance."
            />
            <Link
              href="/faq"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View all FAQs →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10">
            <FAQAccordion items={items} />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
