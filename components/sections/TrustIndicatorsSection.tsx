import { Container } from "@/components/ui/Container";
import { trustIndicators } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";

export function TrustIndicatorsSection() {
  return (
    <section className="border-b border-border bg-section-white">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:py-10">
          {trustIndicators.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.05}>
              <div className="text-center md:text-left">
                <p className="font-display text-sm font-bold text-foreground sm:text-base">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">
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
