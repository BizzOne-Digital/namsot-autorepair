import { apiError, apiSuccess } from "@/lib/api/response";
import { getAdminStats } from "@/lib/admin/stats";
import { requireAdminAuth } from "@/lib/auth/guards";

export async function GET() {
  try {
    await requireAdminAuth();
    return apiSuccess(await getAdminStats());
  } catch (error) {
    return apiError(error);
  }
}
