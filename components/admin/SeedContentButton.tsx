"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { adminRequest } from "@/lib/admin/client";

interface SeedReport {
  seeded: boolean;
  inserted: Record<string, number>;
}

/**
 * Imports the bundled launch content into empty collections. Existing records are
 * never touched, so this stays available as a recovery action.
 */
export function SeedContentButton() {
  const router = useRouter();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleClick = async () => {
    setIsSeeding(true);

    try {
      const report = await adminRequest<SeedReport>("/api/admin/seed", {
        method: "POST",
      });

      const added = Object.values(report.inserted).reduce(
        (total, count) => total + count,
        0,
      );

      toast.success(
        added > 0
          ? `Imported ${added} records into empty collections.`
          : "Nothing to import — every collection already has content.",
      );
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "The import failed.",
      );
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      isLoading={isSeeding}
      onClick={() => void handleClick()}
    >
      Import starter content
    </Button>
  );
}
