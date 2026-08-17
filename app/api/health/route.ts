import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db";
import { diagnoseDbError } from "@/lib/db/diagnose";
import { isSessionConfigured } from "@/lib/auth/session";

/** Always answer from the live environment, never from a cached render. */
export const dynamic = "force-dynamic";

export async function GET() {
  const environment = {
    mongodbUri: isDbConfigured() ? "set" : "missing",
    sessionSecret: isSessionConfigured() ? "set" : "missing_or_too_short",
  };

  if (!isDbConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            "MONGODB_URI is not set in this environment, so the admin dashboard is disabled.",
          code: "DATABASE_NOT_CONFIGURED",
        },
        environment,
      },
      { status: 503 },
    );
  }

  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      data: {
        status: "ok",
        database: "connected",
        timestamp: new Date().toISOString(),
        environment,
      },
    });
  } catch (error) {
    const failure = diagnoseDbError(error);

    // The full driver message names cluster hostnames, so it goes to the server
    // log only; the response carries just the classification.
    console.error("[health] MongoDB is unreachable:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Could not reach the database.",
          code: failure.code,
          hint: failure.hint,
        },
        environment,
      },
      { status: 503 },
    );
  }
}
