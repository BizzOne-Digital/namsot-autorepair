import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { businessInfo } from "@/data/site";
import { images } from "@/data/images";

export function AboutPreviewSection() {
  return (
    <section className="section-spacing bg-section-light">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="right">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-lg bg-charcoal sm:max-w-md lg:mx-0 lg:max-w-none">
              <Image
                src={images.aboutPreview.src}
                alt={images.aboutPreview.alt}
                fill
                className="object-cover object-[22%_42%]"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <SectionHeading
              title="Built on Trust & Quality"
              subtitle={`${businessInfo.name} is a professional automotive shop dedicated to honest service, skilled workmanship, and keeping your vehicle safe on the road.`}
            />
            <div className="mt-6 space-y-4 text-sm text-muted leading-relaxed sm:text-base">
              <p>
                We believe every customer deserves clear communication, fair
                pricing, and repairs done right the first time. Our team treats
                every vehicle with the same care they would give their own.
              </p>
              <p>
                From oil changes to complex diagnostics, we combine modern
                equipment with experienced technicians to deliver reliable
                results you can count on.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Learn more about us →
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
