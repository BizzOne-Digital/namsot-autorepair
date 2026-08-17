import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { servicesView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Services" };

export default function AdminServicesPage() {
  return <ResourceManager view={servicesView} />;
}
