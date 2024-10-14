import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    businessType: { type: String, default: "Digital Agency" },
    status: { type: String },
    avatar: { type: String },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: "Usama"
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
