import mongoose from "mongoose";
import { hashPassword } from "../utils/hashPassword";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});
export default mongoose.model("User", userSchema);
