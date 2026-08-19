import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { clientShowcase } from "@/data/images";
import { businessInfo } from "@/data/site";

export function FacilityShowcaseSection() {
  const [featured, ...supporting] = clientShowcase;

  return (
    <section className="section-spacing bg-section-white">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Our Waterloo Shop"
            subtitle={`See where ${businessInfo.name} services premium and everyday vehicles — alignment, tires, diagnostics, and full repairs at ${businessInfo.address}.`}
          />
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <FadeIn className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-5">
            {supporting.map((image, index) => (
              <FadeIn key={image.src} delay={index * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/gallery"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              View full gallery
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Visit our shop
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
