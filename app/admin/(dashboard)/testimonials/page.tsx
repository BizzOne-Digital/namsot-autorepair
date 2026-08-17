import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { testimonialsView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Testimonials" };

export default function AdminTestimonialsPage() {
  return <ResourceManager view={testimonialsView} />;
}
