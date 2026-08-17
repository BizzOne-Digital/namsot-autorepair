import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { z } from "zod";
import { apiError, apiSuccess, ApiError } from "@/lib/api/response";
import { authenticateAdmin } from "@/lib/auth/admin";
import { getSessionOptions } from "@/lib/auth/session";
import { adminLoginSchema } from "@/lib/validation/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = adminLoginSchema.parse(body);

    const user = await authenticateAdmin(email, password);

    if (!user) {
      return apiError(
        Object.assign(new Error("Invalid email or password."), {
          statusCode: 401,
          code: "INVALID_CREDENTIALS",
        }),
      );
    }

    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, getSessionOptions());

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
    if (error instanceof z.ZodError) {
      return apiError({
        statusCode: 400,
        message: error.issues[0]?.message ?? "Invalid request.",
        code: "VALIDATION_ERROR",
      });
    }
    return apiError(error);
  }
}
