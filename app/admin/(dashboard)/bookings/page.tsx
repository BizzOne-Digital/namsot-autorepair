import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { bookingsView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Bookings" };

export default function AdminBookingsPage() {
  return <ResourceManager view={bookingsView} />;
}
