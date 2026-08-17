import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businessInfo, openingHours } from "@/data/site";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";

export function ContactPreviewSection() {
  return (
    <section className="section-spacing bg-surface">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Visit or Contact Us"
            subtitle="We're here to help with your automotive needs. Reach out or stop by during business hours."
          />
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <FadeIn delay={0.05}>
            <Card>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
                Phone
              </h3>
              <a
                href={businessInfo.phoneHref}
                className="mt-3 block text-xl font-semibold text-foreground hover:text-accent transition-colors"
              >
                {businessInfo.phone}
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
                href={businessInfo.emailHref}
                className="mt-3 block text-base font-semibold text-foreground hover:text-accent transition-colors break-all"
              >
                {businessInfo.email}
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
                {openingHours.map((item) => (
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
              <p className="font-medium text-foreground">
                {businessInfo.address}
              </p>
              <p className="mt-1 text-sm text-muted">
                {businessInfo.addressLine} · {businessInfo.mapPlaceholder}
              </p>
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
