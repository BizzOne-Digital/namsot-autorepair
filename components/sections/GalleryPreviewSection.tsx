import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { clientShowcase } from "@/data/images";

export function GalleryPreviewSection() {
  return (
    <section className="section-spacing bg-section-light">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Inside the Workshop"
              subtitle="Real photos from our bays, outdoor service station, and team at work."
            />
            <Link
              href="/gallery"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View all photos →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clientShowcase.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.04}>
              <Link
                href="/gallery"
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-charcoal"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/20" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
