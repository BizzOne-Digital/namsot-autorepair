import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

TeamMemberSchema.index({ isPublished: 1, order: 1 });

export type ITeamMember = InferSchemaType<typeof TeamMemberSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const TeamMember = registerModel<ITeamMember>(
  MODEL_NAMES.TEAM_MEMBER,
  TeamMemberSchema,
);
