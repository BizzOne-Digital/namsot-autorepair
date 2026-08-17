import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { promoContent } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";

export function PromoSection() {
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
                {promoContent.title}
              </h2>
              <p className="mt-3 text-sm text-off-white/75 sm:text-base">
                {promoContent.description}
              </p>
            </div>
            <Link
              href={promoContent.cta.href}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {promoContent.cta.label}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
