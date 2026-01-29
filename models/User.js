import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // profile image URL
    role: { type: String, default: "user" }, // "user" or "admin"
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
