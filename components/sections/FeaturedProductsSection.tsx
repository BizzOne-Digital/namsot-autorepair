import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/data/products";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";

export function FeaturedProductsSection() {
  const products = getFeaturedProducts(3);

  return (
    <section className="section-spacing bg-surface-muted">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Featured Products"
              subtitle="Quality parts and fluids for your vehicle. Full online shop coming soon."
            />
            <Link
              href="/shop"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Visit shop →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.05}>
              <Card padding="none" className="overflow-hidden">
                <div className="relative aspect-square bg-charcoal">
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-surface/90">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-3 font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
