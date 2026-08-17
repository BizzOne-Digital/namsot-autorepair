import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "completed",
  "cancelled",
] as const;

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCT,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    customerName: { type: String, trim: true },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "pending",
      index: true,
    },
    items: [OrderItemSchema],
    total: { type: Number, required: true, min: 0, index: true },
    stripePaymentIntentId: { type: String, sparse: true, index: true },
    stripeSessionId: { type: String, sparse: true },
  },
  { timestamps: true },
);

OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ customerEmail: 1, createdAt: -1 });

export type IOrder = InferSchemaType<typeof OrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Order = registerModel<IOrder>(MODEL_NAMES.ORDER, OrderSchema);
