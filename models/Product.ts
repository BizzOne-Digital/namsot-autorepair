import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const ProductSchema = new Schema(
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
    description: { type: String, required: true },
    shortDescription: { type: String, trim: true },
    price: { type: Number, required: true, min: 0, index: true },
    compareAtPrice: { type: Number, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.CATEGORY,
      index: true,
    },
    images: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, trim: true, sparse: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

ProductSchema.index({ isActive: 1, isFeatured: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1 });

export type IProduct = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Product = registerModel<IProduct>(
  MODEL_NAMES.PRODUCT,
  ProductSchema,
);
