import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import {
  defaultSession,
  getSessionOptions,
  type AdminSessionData,
} from "@/lib/auth/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_ADMIN_API_PATHS = ["/api/admin/auth/login"];

function isPublicAdminPath(pathname: string) {
  return PUBLIC_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isPublicAdminApiPath(pathname: string) {
  return PUBLIC_ADMIN_API_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const response = NextResponse.next();
    const session = await getIronSession<AdminSessionData>(
      request,
      response,
      getSessionOptions(),
    );

    const isAuthenticated = Boolean(session.isLoggedIn && session.userId);

    if (pathname.startsWith("/admin")) {
      const isLoginRoute = isPublicAdminPath(pathname);

      if (!isAuthenticated && !isLoginRoute) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }

      if (isAuthenticated && isLoginRoute) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return response;
    }

    if (pathname.startsWith("/api/admin")) {
      if (!isPublicAdminApiPath(pathname) && !isAuthenticated) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Authentication required.",
              code: "UNAUTHORIZED",
            },
          },
          { status: 401 },
        );
      }

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
