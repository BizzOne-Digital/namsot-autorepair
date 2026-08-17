import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import {
  getSessionOptions,
  isSessionConfigured,
  type AdminSessionData,
} from "@/lib/auth/session";

const LOGIN_PATH = "/admin/login";
/** Endpoints that must stay reachable while signed out. */
const PUBLIC_ADMIN_API_PATHS = [
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
];

function matches(pathname: string, paths: readonly string[]) {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function errorResponse(message: string, code: string, status: number) {
  return NextResponse.json(
    { success: false, error: { message, code } },
    { status },
  );
}

/**
 * Gate for everything under `/admin` and `/api/admin`. Each route handler and the
 * dashboard layout re-check the session, so this is the first line of defence
 * rather than the only one.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/admin");

  // Without a session secret nobody can sign in, so the login page is left to
  // render setup instructions and the API answers honestly.
  if (!isSessionConfigured()) {
    if (isApiRoute) {
      return errorResponse(
        "Admin sessions are not configured. Set SESSION_SECRET and restart the server.",
        "SESSION_NOT_CONFIGURED",
        503,
      );
    }

    return pathname === LOGIN_PATH
      ? NextResponse.next()
      : NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const response = NextResponse.next();
  const session = await getIronSession<AdminSessionData>(
    request,
    response,
    getSessionOptions(),
  );
  const isAuthenticated = Boolean(session.isLoggedIn && session.userId);

  if (isApiRoute) {
    if (!isAuthenticated && !matches(pathname, PUBLIC_ADMIN_API_PATHS)) {
      return errorResponse("Authentication required.", "UNAUTHORIZED", 401);
    }

    return response;
  }

  if (!isAuthenticated && pathname !== LOGIN_PATH) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
