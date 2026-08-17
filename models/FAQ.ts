import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const FAQSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

FAQSchema.index({ isPublished: 1, order: 1 });

export type IFAQ = InferSchemaType<typeof FAQSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const FAQ = registerModel<IFAQ>(MODEL_NAMES.FAQ, FAQSchema);
