/**
 * Runs once per server start. It prepares the database so the very first
 * request already has an admin account and the launch content available.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { isDbConfigured } = await import("@/lib/db");

  if (!isDbConfigured()) {
    console.warn(
      "[startup] MONGODB_URI is not set — the admin dashboard is disabled and the site renders its bundled launch content.",
    );
    return;
  }

  try {
    const [{ ensureAdminUserSeeded }, { seedInitialContent }] =
      await Promise.all([import("@/lib/auth/admin"), import("@/lib/db/seed")]);

    await ensureAdminUserSeeded();
    const report = await seedInitialContent({ auto: true });

    if (report.seeded) {
      console.log("[startup] Imported launch content into MongoDB.");
    }
  } catch (error) {
    // A database that is unreachable at boot must not stop the server; requests
    // surface the failure with proper error handling instead.
    console.error("[startup] Database preparation failed:", error);
  }
}
