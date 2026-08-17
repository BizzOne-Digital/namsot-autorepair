import { ApiError } from "@/lib/api/response";
import { getAuthenticatedAdmin } from "./get-session";

export async function requireAdminAuth() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    throw new ApiError(401, "Authentication required.", "UNAUTHORIZED");
  }

  return admin;
}

export async function requireAdminRole() {
  const admin = await requireAdminAuth();

  if (admin.role !== "admin") {
    throw new ApiError(403, "Admin access required.", "FORBIDDEN");
  }

  return admin;
}
