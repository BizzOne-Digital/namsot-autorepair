import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings, mailtoHref, mapsHref, telHref } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/data/images";

export async function ContactPreviewSection() {
  const settings = await getSiteSettings();

  return (
    <section className="section-spacing bg-section-dark">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Visit or Contact Us"
            subtitle="We're here to help with your automotive needs. Reach out or stop by during business hours."
            className="[&_h2]:text-off-white [&_p]:text-off-white/70"
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-lg bg-charcoal sm:aspect-[16/7]">
            <Image
              src={images.contactHero.src}
              alt={images.contactHero.alt}
              fill
              className="object-cover object-[65%_center]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-off-white/80">
                Our location
              </p>
              <p className="mt-2 font-display text-xl font-bold text-off-white sm:text-2xl">
                {settings.address}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <FadeIn delay={0.05}>
            <Card>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                Phone
              </h3>
              <a
                href={telHref(settings.contactPhone)}
                className="mt-3 block text-xl font-semibold text-foreground hover:text-accent transition-colors"
              >
                {settings.contactPhone}
              </a>
              <p className="mt-2 text-sm text-muted">
                Call us for appointments, estimates, or questions.
              </p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                Email
              </h3>
              <a
                href={mailtoHref(settings.contactEmail)}
                className="mt-3 block text-base font-semibold text-foreground hover:text-accent transition-colors break-all"
              >
                {settings.contactEmail}
              </a>
              <p className="mt-2 text-sm text-muted">
                We respond to emails within one business day.
              </p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                Hours
              </h3>
              <ul className="mt-3 space-y-1">
                {settings.openingHours.map((item) => (
                  <li
                    key={item.days}
                    className="flex justify-between text-sm text-foreground"
                  >
                    <span>{item.days}</span>
                    <span className="text-muted">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-dashed border-border bg-surface-muted p-8 text-center sm:flex-row sm:text-left">
            <div>
              <a
                href={mapsHref(settings.address)}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-foreground hover:text-accent transition-colors"
              >
                {settings.address}
              </a>
              <p className="mt-1 text-sm text-muted">{settings.addressLine}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Contact Us
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
