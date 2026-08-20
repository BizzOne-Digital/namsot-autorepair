import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/data/site";
import { images } from "@/data/images";
import { FadeIn } from "@/components/motion/FadeIn";

export function WhyChooseUsSection() {
  return (
    <section className="section-spacing bg-section-dark text-off-white">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Why Choose Namsot"
            subtitle="We combine technical expertise with honest communication to deliver service you can trust."
            align="center"
            className="[&_h2]:text-off-white [&_p]:text-off-white/70"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative mx-auto mt-10 aspect-[4/3] max-w-3xl overflow-hidden rounded-lg bg-charcoal">
            <Image
              src={images.testimonialsHero.src}
              alt={images.testimonialsHero.alt}
              fill
              className="object-cover object-[65%_center]"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {whyChooseUs.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <div className="rounded-lg border border-charcoal-700 bg-charcoal-800/50 p-6 text-center transition-colors hover:border-accent/30">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <span className="font-display text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-off-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
