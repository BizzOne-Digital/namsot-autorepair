import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings, mailtoHref, mapsHref, telHref } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — call, email, or send us a message.`,
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phoneHref = telHref(settings.contactPhone);
  const emailHref = mailtoHref(settings.contactEmail);

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We're here to help. Reach out by phone, email, or send us a message below."
        imageUrl={images.contactHero.src}
        imageAlt={images.contactHero.alt}
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-6">
              <FadeIn>
                <Card>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                    Phone
                  </h3>
                  <a
                    href={phoneHref}
                    className="mt-3 block text-2xl font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {settings.contactPhone}
                  </a>
                  <p className="mt-2 text-sm text-muted">
                    Call for appointments, estimates, or urgent questions.
                  </p>
                  <a
                    href={phoneHref}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Call Now
                  </a>
                </Card>
              </FadeIn>

              <FadeIn delay={0.05}>
                <Card>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                    Email
                  </h3>
                  <a
                    href={emailHref}
                    className="mt-3 block text-base font-semibold text-foreground hover:text-accent transition-colors break-all"
                  >
                    {settings.contactEmail}
                  </a>
                  <p className="mt-2 text-sm text-muted">
                    We respond within one business day.
                  </p>
                  <a
                    href={emailHref}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                  >
                    Send Email
                  </a>
                </Card>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Card>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                    Hours
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {settings.openingHours.map((item) => (
                      <li
                        key={item.days}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-foreground">{item.days}</span>
                        <span className="text-muted">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>

              <FadeIn delay={0.15}>
                <Card>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                    Location
                  </h3>
                  <a
                    href={mapsHref(settings.address)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 block font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {settings.address}
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    {settings.addressLine}
                  </p>
                  <a
                    href={mapsHref(settings.address)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
                  >
                    Open in Google Maps
                  </a>
                </Card>
              </FadeIn>
            </div>

            <FadeIn delay={0.1} className="lg:col-span-2">
              <Card className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Send a Message
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
