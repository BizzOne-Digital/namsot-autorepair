import type { IronSession, SessionOptions } from "iron-session";

export interface AdminSessionData {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "staff";
  isLoggedIn: boolean;
}

export const ADMIN_SESSION_COOKIE = "namsot_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;

  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_SECRET must be set and at least 32 characters long.",
    );
  }

  return {
    password,
    cookieName: ADMIN_SESSION_COOKIE,
    ttl: SESSION_MAX_AGE_SECONDS,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    },
  };
}

export type AdminSession = IronSession<AdminSessionData>;

export const defaultSession: AdminSessionData = {
  userId: "",
  email: "",
  name: "",
  role: "admin",
  isLoggedIn: false,
};
