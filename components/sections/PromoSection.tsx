import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

export async function PromoSection() {
  const settings = await getSiteSettings();

  // Clearing the title in the dashboard removes the banner from the homepage.
  if (!settings.promoTitle) {
    return null;
  }

  return (
    <section className="section-spacing border-y border-border bg-surface">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-border bg-charcoal p-8 text-center md:flex-row md:p-10 md:text-left">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Special Offer
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-off-white sm:text-3xl">
                {settings.promoTitle}
              </h2>
              {settings.promoDescription ? (
                <p className="mt-3 text-sm text-off-white/75 sm:text-base">
                  {settings.promoDescription}
                </p>
              ) : null}
            </div>
            {settings.promoCtaLabel ? (
              <Link
                href={settings.promoCtaHref || "/booking"}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                {settings.promoCtaLabel}
              </Link>
            ) : null}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
