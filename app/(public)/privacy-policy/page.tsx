import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/metadata";
import { getSiteSettings, mailtoHref, telHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader title="Privacy Policy" />

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
                  Introduction
                </h2>
                <p className="mt-2">
                  {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;) respects your privacy. This policy describes
                  how we collect, use, and protect personal information when you
                  visit our website or use our services.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Information We Collect
                </h2>
                <p className="mt-2">
                  We may collect information you provide directly, including
                  your name, email address, phone number, vehicle information,
                  and messages submitted through our contact or booking forms.
                  We may also collect technical data such as browser type and
                  pages visited for website analytics.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  How We Use Your Information
                </h2>
                <p className="mt-2">
                  We use your information to respond to inquiries, schedule
                  appointments, provide automotive services, process orders
                  (when applicable), and improve our website and services. We do
                  not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Contact
                </h2>
                <p className="mt-2">
                  For privacy-related questions, contact us at{" "}
                  <a
                    href={mailtoHref(settings.contactEmail)}
                    className="text-accent hover:text-accent-hover"
                  >
                    {settings.contactEmail}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={telHref(settings.contactPhone)}
                    className="text-accent hover:text-accent-hover"
                  >
                    {settings.contactPhone}
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
