import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

GalleryItemSchema.index({ isPublished: 1, category: 1, order: 1 });

export type IGalleryItem = InferSchemaType<typeof GalleryItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const GalleryItem = registerModel<IGalleryItem>(
  MODEL_NAMES.GALLERY_ITEM,
  GalleryItemSchema,
);
