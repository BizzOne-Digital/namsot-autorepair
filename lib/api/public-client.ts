import type { ApiResponse } from "@/types/api";

export class SubmitError extends Error {
  /** Field name to message map for validation failures. */
  readonly details: Record<string, string>;

  constructor(message: string, details: Record<string, string> = {}) {
    super(message);
    this.name = "SubmitError";
    this.details = details;
  }
}

/**
 * Posts a public form to its API route and unwraps the shared
 * `{ success, data }` envelope. Failures keep the server's own message so the
 * visitor is told what actually went wrong.
 */
export async function submitForm<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new SubmitError(
      "Could not reach the server. Check your connection and try again.",
    );
  }

  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    const error = payload && !payload.success ? payload.error : null;

    throw new SubmitError(
      error?.message ?? "Something went wrong. Please try again.",
      error?.details ?? {},
    );
  }

  return payload.data;
}
