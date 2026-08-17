import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedBlogPosts } from "@/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/motion/FadeIn";

export function BlogPreviewSection() {
  const posts = getFeaturedBlogPosts(3);

  return (
    <section className="section-spacing bg-background">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Latest from the Blog"
              subtitle="Tips, guides, and insights to help you maintain your vehicle."
            />
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View all articles →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
