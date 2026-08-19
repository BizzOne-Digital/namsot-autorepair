import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getGalleryItems } from "@/lib/content";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FadeIn } from "@/components/motion/FadeIn";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Gallery",
  description: `View our shop, services, and automotive repair work at ${siteConfig.name}.`,
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHeader
        title="Gallery"
        description="A look inside our shop and the quality work we deliver every day."
        imageUrl={images.galleryHero.src}
        imageAlt={images.galleryHero.alt}
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              title="No photos published yet"
              description="We are adding shots of the shop and our recent work. Check back shortly."
            />
          ) : (
            <FadeIn>
              <GalleryGrid items={items} />
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
