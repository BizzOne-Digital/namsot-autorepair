import { NextResponse } from "next/server";

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
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.statusCode },
    );
  }

  console.error("[API Error]", error);

  return NextResponse.json(
    {
      success: false,
      error: {
        message: "An unexpected error occurred.",
        code: "INTERNAL_ERROR",
      },
    },
    { status: 500 },
  );
}
