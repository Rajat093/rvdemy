import mongoose from "mongoose";

const { Schema } = mongoose;

const chapterSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    SectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
    VideoUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
