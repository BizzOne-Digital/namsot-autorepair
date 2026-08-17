import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getBlogPostBySlug } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <PageHeader title={post.title} description={post.excerpt}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </PageHeader>

      <article className="section-spacing">
        <Container size="md">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="font-medium text-accent">{post.category}</span>
              {formattedDate ? (
                <>
                  <span>·</span>
                  <time dateTime={post.publishedAt ?? undefined}>
                    {formattedDate}
                  </time>
                </>
              ) : null}
              {post.readTime ? (
                <>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </>
              ) : null}
              <span>·</span>
              <span>By {post.author}</span>
            </div>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            <div className="prose prose-neutral mt-10 max-w-none">
              {post.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-base text-muted leading-relaxed last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/blog"
                className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                ← Back to all articles
              </Link>
            </div>
          </FadeIn>
        </Container>
      </article>
    </>
  );
}
