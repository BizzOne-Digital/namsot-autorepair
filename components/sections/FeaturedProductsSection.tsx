import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { getFeaturedProducts } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts(3);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-section-white">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Featured Products"
              subtitle="Quality parts and fluids for your vehicle, kept in stock and ready to fit."
            />
            <Link
              href="/shop"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Visit shop →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <FadeIn key={product._id} delay={index * 0.05}>
              <ProductCard
                product={product}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
