import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
