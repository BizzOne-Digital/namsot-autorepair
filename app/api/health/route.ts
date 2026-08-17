import { apiError, apiSuccess } from "@/lib/api/response";
import { connectDB, isDbConfigured } from "@/lib/db";

export async function GET() {
  try {
    const status = {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: isDbConfigured() ? "configured" : "not_configured",
    };

    if (isDbConfigured()) {
      await connectDB();
      status.database = "connected";
    }

    return apiSuccess(status);
  } catch (error) {
    return apiError(error);
  }
}
