import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const PricingPlanSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0, index: true },
    priceNote: { type: String, trim: true },
    features: [{ type: String }],
    highlighted: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

PricingPlanSchema.index({ isActive: 1, order: 1 });

export type IPricingPlan = InferSchemaType<typeof PricingPlanSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const PricingPlan = registerModel<IPricingPlan>(
  MODEL_NAMES.PRICING_PLAN,
  PricingPlanSchema,
);
