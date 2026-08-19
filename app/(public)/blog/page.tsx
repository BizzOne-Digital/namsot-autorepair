import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getBlogPosts } from "@/lib/content";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/motion/FadeIn";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Blog",
  description: `Automotive tips, maintenance guides, and industry insights from ${siteConfig.name}.`,
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog & News"
        description="Expert tips and guides to help you maintain your vehicle and stay safe on the road."
        imageUrl={images.blogHero.src}
        imageAlt={images.blogHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          {posts.length === 0 ? (
            <EmptyState
              title="No articles published yet"
              description="We are working on our first guides. Check back soon for maintenance tips and shop news."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {posts.map((post, index) => (
                <FadeIn key={post._id} delay={index * 0.05}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
