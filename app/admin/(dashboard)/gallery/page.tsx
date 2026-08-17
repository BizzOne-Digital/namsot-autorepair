import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { galleryView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Gallery" };

export default function AdminGalleryPage() {
  return <ResourceManager view={galleryView} />;
}
