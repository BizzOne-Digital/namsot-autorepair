import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/data/images";
import { businessInfo } from "@/data/site";
import { telHref } from "@/lib/content/links";

export function StorefrontPosterSection() {
  const phoneHref = telHref(businessInfo.phone);

  return (
    <section className="section-spacing bg-section-white">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Visit Namsot Auto Repairs & Tire Works"
            subtitle={`Our shop at ${businessInfo.address} — oil changes, tires, brakes, A/C, suspension, transmission, and full auto repair.`}
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-xl border border-border bg-white shadow-lg">
            <Image
              src={images.storefrontPoster.src}
              alt={images.storefrontPoster.alt}
              width={images.storefrontPoster.width ?? 1024}
              height={images.storefrontPoster.height ?? 576}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Call {businessInfo.phone}
            </a>
            <Link
              href="/booking"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Book a service
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Get directions
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
