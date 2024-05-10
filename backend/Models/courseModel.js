import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    thumbnail: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);
export default mongoose.model("Course", courseSchema);
