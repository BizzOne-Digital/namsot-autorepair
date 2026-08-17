import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { pricingView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Pricing plans" };

export default function AdminPricingPage() {
  return <ResourceManager view={pricingView} />;
}
