import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import { authenticateAdmin } from "@/lib/auth/admin";
import { getSessionOptions, type AdminSessionData } from "@/lib/auth/session";
import { isDbConfigured } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validation/admin";

export async function POST(request: Request) {
  try {
    if (!isDbConfigured()) {
      throw new ApiError(
        503,
        "The database is not configured, so admin sign-in is unavailable.",
        "DATABASE_NOT_CONFIGURED",
      );
    }

    const { email, password } = adminLoginSchema.parse(await request.json());
    const user = await authenticateAdmin(email, password);

    if (!user) {
      throw new ApiError(
        401,
        "Invalid email or password.",
        "INVALID_CREDENTIALS",
      );
    }

    const cookieStore = await cookies();
    const session = await getIronSession<AdminSessionData>(
      cookieStore,
      getSessionOptions(),
    );

    session.userId = user.id;
    session.email = user.email;
    session.name = user.name;
    session.role = user.role;
    session.isLoggedIn = true;

    await session.save();

    return apiSuccess({
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    return apiError(error);
  }
}
