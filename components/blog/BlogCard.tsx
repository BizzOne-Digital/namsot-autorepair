import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group block", className)}>
      <Card padding="none" className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="font-medium text-accent">{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
          <p className="mt-3 text-xs font-medium text-accent">Read article →</p>
        </div>
      </Card>
    </Link>
  );
}
