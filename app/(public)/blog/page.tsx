import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getAllBlogPosts } from "@/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Automotive tips, maintenance guides, and industry insights from Namsot Auto Repairs.",
};

const blogHeroImage =
  "https://images.unsplash.com/photo-1676018366904-c083ed678e60?auto=format&fit=crop&w=2400&q=80";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageHeader
        title="Blog & News"
        description="Expert tips and guides to help you maintain your vehicle and stay safe on the road."
        imageUrl={blogHeroImage}
        imageAlt="Technician working at a bench inside the repair workshop"
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
