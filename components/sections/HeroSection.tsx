import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { images } from "@/data/images";
import { getSiteSettings } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

const heroImage = images.hero.src;

export async function HeroSection() {
  const settings = await getSiteSettings();

  return (
    <section className="relative overflow-hidden bg-charcoal text-off-white">
      <Image
        src={heroImage}
        alt={images.hero.alt}
        fill
        priority
        className="object-cover object-[center_35%] opacity-55 sm:object-[center_30%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/40" />

      <Container className="relative">
        <div className="flex min-h-[520px] flex-col justify-center py-16 md:min-h-[600px] md:py-24 lg:min-h-[680px]">
          <FadeIn>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
              Professional Auto Repair
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {settings.heroHeadline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-base text-off-white/80 sm:text-lg md:max-w-2xl">
              {settings.heroSubheadline}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {settings.heroPrimaryCtaLabel ? (
                <Link
                  href={settings.heroPrimaryCtaHref || "/booking"}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg"
                >
                  {settings.heroPrimaryCtaLabel}
                </Link>
              ) : null}
              {settings.heroSecondaryCtaLabel ? (
                <Link
                  href={settings.heroSecondaryCtaHref || "/shop"}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-off-white/30 px-6 text-sm font-semibold text-off-white transition-colors hover:border-off-white hover:bg-off-white/10"
                >
                  {settings.heroSecondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
