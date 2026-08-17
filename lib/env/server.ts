/**
 * Server-only environment accessors.
 * Never import this module in client components.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in environment variables.`);
  }
  return value;
}

export const serverEnv = {
  mongodbUri: () => requireEnv("MONGODB_URI"),
  adminEmail: () => requireEnv("ADMIN_EMAIL"),
  adminPassword: () => requireEnv("ADMIN_PASSWORD"),
  sessionSecret: () => requireEnv("SESSION_SECRET"),
  stripeSecretKey: () => requireEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: () => requireEnv("STRIPE_WEBHOOK_SECRET"),
};

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
};
