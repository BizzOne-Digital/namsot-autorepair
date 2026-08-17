import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { ordersView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Orders" };

export default function AdminOrdersPage() {
  return <ResourceManager view={ordersView} />;
}
