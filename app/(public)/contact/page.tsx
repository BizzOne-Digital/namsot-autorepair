import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings, mailtoHref, telHref } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Namsot Auto Repairs — call, email, or send us a message.",
};

const contactHeroImage =
  "https://images.unsplash.com/photo-1565580743984-49bf8ef4daa6?auto=format&fit=crop&w=2400&q=80";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phoneHref = telHref(settings.contactPhone);
  const emailHref = mailtoHref(settings.contactEmail);

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We're here to help. Reach out by phone, email, or send us a message below."
        imageUrl={contactHeroImage}
        imageAlt="Street view of an automotive service shop front"
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing">
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
                  <p className="mt-3 font-medium text-foreground">
                    {settings.address}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {settings.addressLine}
                  </p>
                  <div className="mt-4 flex h-40 items-center justify-center rounded-md border border-dashed border-border bg-surface-muted text-sm text-muted">
                    Map integration coming soon
                  </div>
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
