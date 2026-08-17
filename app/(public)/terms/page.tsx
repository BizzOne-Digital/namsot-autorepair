import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/metadata";
import { getSiteSettings, mailtoHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader title="Terms of Service" />

      <section className="section-spacing">
        <Container size="md">
          <FadeIn>
            <div className="space-y-6 text-sm text-muted leading-relaxed">
              <p>
                <strong className="text-foreground">Last updated:</strong>{" "}
                March 2026
              </p>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Acceptance of Terms
                </h2>
                <p className="mt-2">
                  By accessing or using the {siteConfig.name} website and
                  services, you agree to these Terms of Service. If you do not
                  agree, please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Services
                </h2>
                <p className="mt-2">
                  We provide automotive repair and maintenance services as
                  described on our website. Service estimates are provided
                  before work begins. Final costs may vary based on vehicle
                  condition and parts required. We reserve the right to refuse
                  service for safety or operational reasons.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Website Use
                </h2>
                <p className="mt-2">
                  You agree to use this website only for lawful purposes. You may
                  not attempt to gain unauthorized access to our systems, submit
                  false information, or interfere with website operation.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Contact
                </h2>
                <p className="mt-2">
                  Questions about these terms may be directed to{" "}
                  <a
                    href={mailtoHref(settings.contactEmail)}
                    className="text-accent hover:text-accent-hover"
                  >
                    {settings.contactEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
