import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getGalleryItems } from "@/lib/content";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our shop, services, and automotive repair work at Namsot Auto Repairs.",
};

const galleryHeroImage =
  "https://images.unsplash.com/photo-1669437921238-76df6d82668a?auto=format&fit=crop&w=2400&q=80";

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHeader
        title="Gallery"
        description="A look inside our shop and the quality work we deliver every day."
        imageUrl={galleryHeroImage}
        imageAlt="Vehicle raised on a lift in a dimly lit service bay"
        imageClassName="object-[65%_center]"
      />

      <section className="section-spacing">
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
