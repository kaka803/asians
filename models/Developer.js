import mongoose from "mongoose";

const DeveloperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // base64 ya Cloudinary URL
    whatsapp: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Developer ||
  mongoose.model("Developer", DeveloperSchema);
