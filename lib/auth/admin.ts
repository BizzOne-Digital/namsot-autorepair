import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword } from "./password";

function getAdminCredentialsFromEnv() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

/**
 * Creates the initial admin user from environment variables when no admin exists.
 * Passwords are stored hashed — never plain text.
 */
export async function ensureAdminUserSeeded(): Promise<void> {
  const credentials = getAdminCredentialsFromEnv();
  if (!credentials) {
    return;
  }

  await connectDB();

  const existingAdmin = await User.findOne({ role: "admin" }).select("_id");

  if (existingAdmin) {
    return;
  }

  const passwordHash = await hashPassword(credentials.password);

  await User.create({
    email: credentials.email,
    passwordHash,
    name: "Admin",
    role: "admin",
    isActive: true,
  });
}

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<{ id: string; email: string; name: string; role: "admin" | "staff" } | null> {
  await ensureAdminUserSeeded();
  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({
    email: normalizedEmail,
    isActive: true,
  }).select("+passwordHash");

  if (!user?.passwordHash) {
    return null;
  }

  const { verifyPassword } = await import("./password");
  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role as "admin" | "staff",
  };
}
