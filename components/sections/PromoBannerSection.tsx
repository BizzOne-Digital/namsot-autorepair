import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { images } from "@/data/images";

export function PromoBannerSection() {
  const banner = images.promoBannerCars;

  return (
    <section className="bg-charcoal py-6 sm:py-8">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-charcoal-700 shadow-2xl">
            <Image
              src={banner.src}
              alt={banner.alt}
              width={banner.width ?? 1024}
              height={banner.height ?? 341}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
