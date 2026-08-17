import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, message: string, code = "API_ERROR") {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.statusCode, error.message, error.code);
  }

  if (error instanceof ZodError) {
    const details: Record<string, string> = {};

    for (const issue of error.issues) {
      const field = issue.path.join(".");
      if (field && !details[field]) {
        details[field] = issue.message;
      }
    }

    const message = error.issues[0]?.message ?? "The submitted data is invalid.";

    return errorResponse(400, message, "VALIDATION_ERROR", details);
  }

  const duplicatedField = getDuplicateKeyField(error);
  if (duplicatedField) {
    return errorResponse(
      409,
      `Another record already uses this ${duplicatedField}.`,
      "DUPLICATE_KEY",
    );
  }

  if (isMongooseValidationError(error)) {
    return errorResponse(400, error.message, "VALIDATION_ERROR");
  }

  if (isDatabaseUnreachableError(error)) {
    console.error("[API Error] MongoDB is unreachable:", error);

    return errorResponse(
      503,
      "Could not reach the database. Check MONGODB_URI and that this machine can reach the cluster.",
      "DATABASE_UNREACHABLE",
    );
  }

  console.error("[API Error]", error);

  return errorResponse(
    500,
    "An unexpected error occurred.",
    "INTERNAL_ERROR",
  );
}

function errorResponse(
  status: number,
  message: string,
  code: string,
  details?: Record<string, string>,
) {
  return NextResponse.json(
    { success: false, error: { message, code, details } },
    { status },
  );
}

/** MongoDB signals unique index violations with error code 11000. */
function getDuplicateKeyField(error: unknown): string | null {
  if (typeof error !== "object" || error === null) {
    return null;
  }

  const candidate = error as { code?: number; keyPattern?: Record<string, unknown> };

  if (candidate.code !== 11000) {
    return null;
  }

  return Object.keys(candidate.keyPattern ?? {})[0] ?? "value";
}

function isMongooseValidationError(error: unknown): error is Error {
  return (
    error instanceof Error &&
    (error.name === "ValidationError" || error.name === "CastError")
  );
}

/**
 * A cluster that cannot be reached is an environment problem, not a bug in the
 * request, so it answers 503 with a message that points at the cause instead of
 * a generic "unexpected error".
 */
function isDatabaseUnreachableError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "MongooseServerSelectionError" ||
    error.name === "MongoServerSelectionError" ||
    error.name === "MongoNetworkError" ||
    error.name === "MongoNetworkTimeoutError" ||
    /ETIMEOUT|ENOTFOUND|ECONNREFUSED|querySrv|queryTxt/.test(error.message)
  );
}
