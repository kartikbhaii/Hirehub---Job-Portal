
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
