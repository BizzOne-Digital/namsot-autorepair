import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    duration: { type: String, trim: true },
    priceFrom: { type: Number, required: true, min: 0, index: true },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, required: true },
    isActive: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

ServiceSchema.index({ isActive: 1, order: 1 });

export type IService = InferSchemaType<typeof ServiceSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Service = registerModel<IService>(
  MODEL_NAMES.SERVICE,
  ServiceSchema,
);
