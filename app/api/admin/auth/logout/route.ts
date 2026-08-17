import { apiError, apiSuccess } from "@/lib/api/response";
import { destroyAdminSession } from "@/lib/auth/get-session";

export async function POST() {
  try {
    await destroyAdminSession();
    return apiSuccess({ signedOut: true });
  } catch (error) {
    return apiError(error);
  }
}
