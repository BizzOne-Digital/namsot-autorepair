import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

export const CONTACT_MESSAGE_STATUSES = [
  "new",
  "read",
  "replied",
  "archived",
] as const;

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: CONTACT_MESSAGE_STATUSES,
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

ContactMessageSchema.index({ status: 1, createdAt: -1 });

export type IContactMessage = InferSchemaType<typeof ContactMessageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ContactMessage = registerModel<IContactMessage>(
  MODEL_NAMES.CONTACT_MESSAGE,
  ContactMessageSchema,
);
