import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

/** Settings are a singleton document, always addressed by this key. */
export const SITE_SETTINGS_KEY = "default";

const OpeningHoursSchema = new Schema(
  {
    days: { type: String, required: true, trim: true },
    hours: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: SITE_SETTINGS_KEY,
      index: true,
    },
    siteName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, lowercase: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: "" },
    addressLine: { type: String, trim: true, default: "" },
    socialLinks: {
      facebook: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      x: { type: String, trim: true, default: "" },
      youtube: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
    },
    heroHeadline: { type: String, trim: true, default: "" },
    heroSubheadline: { type: String, default: "" },
    heroPrimaryCtaLabel: { type: String, trim: true, default: "" },
    heroPrimaryCtaHref: { type: String, trim: true, default: "" },
    heroSecondaryCtaLabel: { type: String, trim: true, default: "" },
    heroSecondaryCtaHref: { type: String, trim: true, default: "" },
    promoTitle: { type: String, trim: true, default: "" },
    promoDescription: { type: String, default: "" },
    promoCtaLabel: { type: String, trim: true, default: "" },
    promoCtaHref: { type: String, trim: true, default: "" },
    openingHours: { type: [OpeningHoursSchema], default: [] },
    /** Set once starter content has been imported so it is never re-imported. */
    contentSeededAt: { type: Date },
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
