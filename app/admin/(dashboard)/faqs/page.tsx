import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { faqsView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "FAQs" };

export default function AdminFaqsPage() {
  return <ResourceManager view={faqsView} />;
}
