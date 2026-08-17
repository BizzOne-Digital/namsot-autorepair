import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { categoriesView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Categories" };

export default function AdminCategoriesPage() {
  return <ResourceManager view={categoriesView} />;
}
