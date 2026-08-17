import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { messagesView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Messages" };

export default function AdminMessagesPage() {
  return <ResourceManager view={messagesView} />;
}
