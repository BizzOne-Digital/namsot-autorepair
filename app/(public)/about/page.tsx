import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";
import { businessInfo } from "@/data/site";
import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — professional automotive repair built on trust, quality workmanship, and customer satisfaction.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${siteConfig.name}`}
        description="Professional automotive repair built on trust, quality workmanship, and a commitment to keeping you safe on the road."
        imageUrl={images.aboutHero.src}
        imageAlt={images.aboutHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                <Image
                  src={images.aboutStory.src}
                  alt={images.aboutStory.alt}
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
                  {businessInfo.name} was founded with a simple belief: every
                  driver deserves honest, skilled automotive service without
                  unnecessary upsells or confusing jargon. {businessInfo.addressLine}{" "}
                  with the same integrity we would expect for our own
                  families&apos; vehicles.
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

      <section className="section-spacing bg-section-white">
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

      <section className="section-spacing bg-section-dark">
        <Container size="md">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-off-white">
                Ready to Experience the Difference?
              </h2>
              <p className="mt-4 text-off-white/75">
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
