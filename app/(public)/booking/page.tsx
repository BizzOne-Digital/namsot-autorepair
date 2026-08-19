import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { BookingForm } from "@/components/forms/BookingForm";
import { getServices, getSiteSettings, telHref } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { Loading } from "@/components/ui/Loading";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Book a Service",
  description: `Schedule your automotive service appointment online with ${siteConfig.name}.`,
};

export default async function BookingPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const serviceOptions = services.map((service) => ({
    slug: service.slug,
    name: service.name,
  }));

  return (
    <>
      <PageHeader
        title="Book a Service"
        description="Schedule your appointment online. Select your service, choose a date and time, and we'll confirm your booking."
        imageUrl={images.bookingHero.src}
        imageAlt={images.bookingHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <Card className="p-6 sm:p-8">
                <Suspense fallback={<Loading className="py-12" />}>
                  <BookingForm services={serviceOptions} />
                </Suspense>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <Card>
                  <h3 className="font-display font-semibold text-foreground">
                    Need Help?
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Call us directly to book or ask questions about your
                    service.
                  </p>
                  <a
                    href={telHref(settings.contactPhone)}
                    className="mt-4 block text-lg font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    {settings.contactPhone}
                  </a>
                </Card>

                <Card>
                  <h3 className="font-display font-semibold text-foreground">
                    What to Expect
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    <li className="flex gap-2">
                      <span className="font-semibold text-accent">1.</span>
                      Submit your booking request
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-accent">2.</span>
                      We confirm your appointment by phone or email
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-accent">3.</span>
                      Drop off your vehicle at the scheduled time
                    </li>
                  </ul>
                </Card>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
