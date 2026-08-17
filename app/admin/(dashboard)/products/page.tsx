import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { getCategoryChoices } from "@/lib/admin/options";
import { productsView } from "@/lib/admin/views";
import { isDbConfigured } from "@/lib/db";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const categories = isDbConfigured() ? await getCategoryChoices() : [];

  return <ResourceManager view={productsView} choices={{ categories }} />;
}
