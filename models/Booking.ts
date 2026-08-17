import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

const BookingSchema = new Schema(
  {
    serviceSlug: { type: String, required: true, trim: true, index: true },
    serviceName: { type: String, required: true, trim: true },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.SERVICE,
      index: true,
    },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true },
    customerName: { type: String, required: true, trim: true, index: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true },
    vehicleMake: { type: String, required: true, trim: true },
    vehicleModel: { type: String, required: true, trim: true },
    vehicleYear: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

BookingSchema.index({ status: 1, date: 1 });
BookingSchema.index({ email: 1, createdAt: -1 });

export type IBooking = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Booking = registerModel<IBooking>(
  MODEL_NAMES.BOOKING,
  BookingSchema,
);
