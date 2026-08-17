import { apiError, apiSuccess } from "@/lib/api/response";
import { requireAdminAuth } from "@/lib/auth/guards";

export async function GET() {
  try {
    const admin = await requireAdminAuth();
    return apiSuccess(admin);
  } catch (error) {
    return apiError(error);
  }
}
