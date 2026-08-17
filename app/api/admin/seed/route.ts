import { apiError, apiSuccess } from "@/lib/api/response";
import { requireAdminRole } from "@/lib/auth/guards";
import { seedInitialContent } from "@/lib/db/seed";

/**
 * Fills empty collections with the bundled launch content. Collections that
 * already hold records are skipped, so this is always safe to run.
 */
export async function POST() {
  try {
    await requireAdminRole();
    const report = await seedInitialContent();
    return apiSuccess(report);
  } catch (error) {
    return apiError(error);
  }
}
