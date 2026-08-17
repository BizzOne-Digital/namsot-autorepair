import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  defaultSession,
  getSessionOptions,
  isSessionConfigured,
  type AdminSessionData,
} from "./session";

export async function getAdminSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, getSessionOptions());
}

export async function getAuthenticatedAdmin() {
  if (!isSessionConfigured()) {
    return null;
  }

  const session = await getAdminSession();

  if (!session.isLoggedIn || !session.userId) {
    return null;
  }

  return {
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
  };
}

export async function destroyAdminSession() {
  const session = await getAdminSession();
  Object.assign(session, defaultSession);
  await session.destroy();
}
