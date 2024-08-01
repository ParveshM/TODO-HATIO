import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todos", todoSchema);
