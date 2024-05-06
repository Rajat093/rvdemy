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
  },
  { timestamps: true }
);
export default mongoose.model("Course", courseSchema);
