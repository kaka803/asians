import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, 
  },
  { timestamps: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    description: { type: String },
    thumbnail: { type: String }, 
    tags: { type: String }, 
    category: { type: String, required: true }, 
    link: { type: String }, 
    sections: [SectionSchema], 
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
