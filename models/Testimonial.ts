import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const TestimonialSchema = new Schema(
  {
    authorName: { type: String, required: true, trim: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5, index: true },
    review: { type: String, required: true },
    vehicle: { type: String, trim: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

TestimonialSchema.index({ isPublished: 1, order: 1 });

export type ITestimonial = InferSchemaType<typeof TestimonialSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Testimonial = registerModel<ITestimonial>(
  MODEL_NAMES.TESTIMONIAL,
  TestimonialSchema,
);
