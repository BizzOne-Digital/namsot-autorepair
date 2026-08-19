import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/content";
import { images } from "@/data/images";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Quality automotive parts and fluids. Full e-commerce shop coming soon.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        title="Shop"
        description="Quality parts and fluids for your vehicle. Online ordering and checkout coming in a future update."
        imageUrl={images.shopHero.src}
        imageAlt={images.shopHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          <FadeIn>
            <Card className="mb-10 border-accent/20 bg-accent/5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge variant="accent" className="mb-2">
                    Coming Soon
                  </Badge>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Online checkout launching soon
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Browse the catalogue below and get in touch to reserve any
                    part. Cart and card payments arrive in a future update.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                >
                  Request a product
                </Link>
              </div>
            </Card>
          </FadeIn>

          {products.length === 0 ? (
            <EmptyState
              title="No products listed yet"
              description="Our parts catalogue is being updated. Call us and we will source what you need."
              action={
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Contact us
                </Link>
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <FadeIn key={product._id} delay={index * 0.05}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
