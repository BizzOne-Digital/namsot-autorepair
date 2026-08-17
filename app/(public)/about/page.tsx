import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Namsot Auto Repairs — professional automotive repair built on trust, quality workmanship, and customer satisfaction.",
};

const aboutHeroImage =
  "https://images.unsplash.com/photo-1597986346643-d54491ef85bb?auto=format&fit=crop&w=2400&q=80";

const aboutImage =
  "https://images.unsplash.com/photo-1730461747788-ced66cb36434?auto=format&fit=crop&w=1200&q=80";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Namsot Auto Repairs"
        description="Professional automotive repair built on trust, quality workmanship, and a commitment to keeping you safe on the road."
        imageUrl={aboutHeroImage}
        imageAlt="Service bays and vehicle lifts inside the Namsot Auto Repairs workshop"
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                <Image
                  src={aboutImage}
                  alt="Vehicle raised on a two-post lift for underbody repair work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Your Vehicle Deserves Expert Care
              </h2>
              <div className="mt-6 space-y-4 text-muted leading-relaxed">
                <p>
                  Namsot Auto Repairs was founded with a simple belief: every
                  driver deserves honest, skilled automotive service without
                  unnecessary upsells or confusing jargon. We serve London,
                  Ontario and surrounding communities with the same integrity
                  we would expect for our own families&apos; vehicles.
                </p>
                <p>
                  Our shop handles everything from routine oil changes to
                  complex engine diagnostics. We invest in modern diagnostic
                  equipment and ongoing training so our technicians stay
                  current with evolving automotive technology.
                </p>
                <p>
                  Customer trust is earned through transparency. We explain
                  what we find, what we recommend, and why — before any work
                  begins. You approve every repair and understand every charge
                  on your invoice.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-spacing bg-surface-muted">
        <Container>
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl text-center">
              What We Stand For
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quality Workmanship",
                text: "Every repair meets rigorous standards. We use quality parts and follow manufacturer specifications.",
              },
              {
                title: "Reliable Service",
                text: "We complete work on schedule and communicate clearly if timelines change. Your time matters.",
              },
              {
                title: "Vehicle Safety",
                text: "Safety-critical systems receive priority attention. We never cut corners on brakes, steering, or structural integrity.",
              },
              {
                title: "Customer Satisfaction",
                text: "We follow up to ensure you're satisfied. If something isn't right, we make it right.",
              },
              {
                title: "Fair Pricing",
                text: "Transparent estimates with no hidden fees. You know the cost before we start.",
              },
              {
                title: "Long-Term Relationships",
                text: "Many customers have trusted us for years. We value that loyalty and work to earn it every visit.",
              },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="rounded-lg border border-border bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container size="md">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Ready to Experience the Difference?
              </h2>
              <p className="mt-4 text-muted">
                Join the drivers who trust {siteConfig.name} for reliable,
                professional automotive care.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
