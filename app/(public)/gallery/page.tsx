import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getAllGalleryItems } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our shop, services, and automotive repair work at Namsot Auto Repairs.",
};

const galleryHeroImage =
  "https://images.unsplash.com/photo-1669437921238-76df6d82668a?auto=format&fit=crop&w=2400&q=80";

export default function GalleryPage() {
  const items = getAllGalleryItems();

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
          <FadeIn>
            <GalleryGrid items={items} />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
