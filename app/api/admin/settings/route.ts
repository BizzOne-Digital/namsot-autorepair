import { apiError, apiSuccess } from "@/lib/api/response";
import { requireAdminAuth } from "@/lib/auth/guards";
import { getSiteSettings } from "@/lib/content";
import { connectDB, toPlainObject } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validation/admin-resources";
import { SiteSettings, SITE_SETTINGS_KEY } from "@/models";

export async function GET() {
  try {
    await requireAdminAuth();
    return apiSuccess(await getSiteSettings());
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdminAuth();
    await connectDB();

    const payload = siteSettingsSchema.parse(await request.json());

    const updated = await SiteSettings.findOneAndUpdate(
      { key: SITE_SETTINGS_KEY },
      { $set: payload, $setOnInsert: { key: SITE_SETTINGS_KEY } },
      { new: true, upsert: true, runValidators: true },
    ).lean();

    return apiSuccess(toPlainObject(updated));
  } catch (error) {
    return apiError(error);
  }
}
