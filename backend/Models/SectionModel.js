import mongoose, { Schema } from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    CourseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);
