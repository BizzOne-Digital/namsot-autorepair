import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const StoredUploadSchema = new Schema(
  {
    filename: { type: String, required: true, trim: true, index: true },
    originalName: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true, index: true },
    size: { type: Number, required: true, min: 0 },
    path: { type: String, required: true, trim: true },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER,
      index: true,
    },
    altText: { type: String, trim: true },
  },
  { timestamps: true },
);

StoredUploadSchema.index({ uploadedBy: 1, createdAt: -1 });
StoredUploadSchema.index({ mimeType: 1, createdAt: -1 });

export type IStoredUpload = InferSchemaType<typeof StoredUploadSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const StoredUpload = registerModel<IStoredUpload>(
  MODEL_NAMES.STORED_UPLOAD,
  StoredUploadSchema,
);
