import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const SiteSettingsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "default",
      index: true,
    },
    siteName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, lowercase: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    addressLine: { type: String, trim: true },
    socialLinks: { type: Map, of: String, default: {} },
    heroHeadline: { type: String, trim: true },
    heroSubheadline: { type: String },
    heroPrimaryCtaLabel: { type: String, trim: true },
    heroPrimaryCtaHref: { type: String, trim: true },
    heroSecondaryCtaLabel: { type: String, trim: true },
    heroSecondaryCtaHref: { type: String, trim: true },
    openingHours: [
      {
        days: { type: String, required: true },
        hours: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export type ISiteSettings = InferSchemaType<typeof SiteSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SiteSettings = registerModel<ISiteSettings>(
  MODEL_NAMES.SITE_SETTINGS,
  SiteSettingsSchema,
);
