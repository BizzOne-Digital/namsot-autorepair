import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/metadata";
import { businessInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund policy for ${siteConfig.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader title="Refund Policy" />

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
                  Service Refunds
                </h2>
                <p className="mt-2">
                  {siteConfig.name} is committed to customer satisfaction. If you
                  are not satisfied with a service, contact us within 7 days of
                  the service date. We will review your concern and, where
                  appropriate, offer a re-inspection, correction of work, or
                  partial refund at our discretion.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Parts & Products
                </h2>
                <p className="mt-2">
                  Parts installed as part of a repair service carry manufacturer
                  or supplier warranties. Unused parts purchased separately may
                  be returned within 14 days in original packaging. Installed
                  parts are not eligible for return unless defective.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Online Orders
                </h2>
                <p className="mt-2">
                  When online ordering becomes available, refund terms for
                  e-commerce purchases will be published here. Until then,
                  product inquiries should be directed to our shop directly.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Contact
                </h2>
                <p className="mt-2">
                  For refund requests, contact{" "}
                  <a
                    href={businessInfo.emailHref}
                    className="text-accent hover:text-accent-hover"
                  >
                    {businessInfo.email}
                  </a>{ " "}
                  or call{" "}
                  <a
                    href={businessInfo.phoneHref}
                    className="text-accent hover:text-accent-hover"
                  >
                    {businessInfo.phone}
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
