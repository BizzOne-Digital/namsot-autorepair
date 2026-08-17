import type { ApiResponse, PaginatedResult } from "@/types/api";

export class AdminRequestError extends Error {
  readonly code: string;
  /** Field name to message map for validation failures. */
  readonly details: Record<string, string>;

  constructor(
    message: string,
    code: string,
    details: Record<string, string> = {},
  ) {
    super(message);
    this.name = "AdminRequestError";
    this.code = code;
    this.details = details;
  }
}

/**
 * Calls an admin API route and unwraps the shared `{ success, data }` envelope,
 * turning failures into an error that carries the server's own message.
 */
export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
  } catch {
    throw new AdminRequestError(
      "Could not reach the server. Check your connection and try again.",
      "NETWORK_ERROR",
    );
  }

  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    // An expired session should send the admin straight back to the login screen
    // instead of leaving an unexplained error on the page. Rejected sign-in
    // attempts also answer with 401, so the login page keeps its own error.
    if (
      response.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/admin/login"
    ) {
      const from = encodeURIComponent(window.location.pathname);
      // A full document load is deliberate: the session cookie is gone, so every
      // cached server-rendered admin segment has to be discarded. A client-side
      // router push would reuse them. This helper is also not a component, so
      // `useRouter` is unavailable here.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/admin/login?from=${from}`);
    }

    const error = payload && !payload.success ? payload.error : null;
    throw new AdminRequestError(
      error?.message ?? "The request failed. Please try again.",
      error?.code ?? "REQUEST_FAILED",
      error?.details ?? {},
    );
  }

  return payload.data;
}

export type AdminRecord = Record<string, unknown> & { _id: string };

export function fetchAdminList(
  endpoint: string,
  params: Record<string, string | number | undefined>,
): Promise<PaginatedResult<AdminRecord>> {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  return adminRequest<PaginatedResult<AdminRecord>>(
    query ? `${endpoint}?${query}` : endpoint,
  );
}
