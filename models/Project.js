import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // Cloudinary URL for section
  },
  { timestamps: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // tumhare frontend mai "name"
    description: { type: String },
    thumbnail: { type: String }, // main project thumbnail
    sections: [SectionSchema], // nested sections
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
