import type { Metadata } from "next";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { teamView } from "@/lib/admin/views";

export const metadata: Metadata = { title: "Team" };

export default function AdminTeamPage() {
  return <ResourceManager view={teamView} />;
}
