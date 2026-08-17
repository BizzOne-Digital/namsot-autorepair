import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getPlaceholderProducts } from "@/data/products";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Quality automotive parts and fluids. Full e-commerce shop coming soon.",
};

const shopHeroImage =
  "https://images.unsplash.com/photo-1590227763209-821c686b932f?auto=format&fit=crop&w=2400&q=80";

export default function ShopPage() {
  const products = getPlaceholderProducts();

  return (
    <>
      <PageHeader
        title="Shop"
        description="Quality parts and fluids for your vehicle. Online ordering and checkout coming in a future update."
        imageUrl={shopHeroImage}
        imageAlt="Shelves of motor oil and automotive fluids in a parts store"
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing">
        <Container>
          <FadeIn>
            <Card className="mb-10 border-accent/20 bg-accent/5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge variant="accent" className="mb-2">Coming Soon</Badge>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    E-Commerce Launching Soon
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Browse our product catalog below. Online ordering, cart, and
                    Stripe payments will be available in a future phase.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                >
                  Request a Product
                </Link>
              </div>
            </Card>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05}>
                <Card padding="none" className="overflow-hidden">
                  <div className="relative aspect-square bg-charcoal">
                    <Image
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-surface/90 text-xs">
                        Preview
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {product.category}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-3 font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      disabled
                      className="mt-4 w-full rounded-md border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-muted cursor-not-allowed"
                    >
                      Add to Cart — Soon
                    </button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
