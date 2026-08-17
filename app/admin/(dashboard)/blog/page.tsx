import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { blogView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Blog posts" };

export default function AdminBlogPage() {
  return <ResourceManager view={blogView} />;
}
