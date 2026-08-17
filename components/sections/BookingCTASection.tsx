import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function BookingCTASection() {
  return (
    <section className="section-spacing bg-accent">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to Book Your Service?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Schedule your appointment online. Choose your service, pick a date,
              and we&apos;ll take care of the rest.
            </p>
            <Link
              href="/booking"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-charcoal px-8 text-sm font-semibold text-white transition-colors hover:bg-charcoal-800"
            >
              Book a Service
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
