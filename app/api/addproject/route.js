import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project"; 
import { v2 as cloudinary } from "cloudinary";

// MongoDB connect helper
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URL);
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload base64 image to cloudinary
async function uploadBase64(base64) {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: "projects",
    });
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw new Error("Image upload failed");
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // Thumbnail upload
    let thumbnailUrl = body.thumbnail;
    if (thumbnailUrl && thumbnailUrl.startsWith("data:")) {
      thumbnailUrl = await uploadBase64(thumbnailUrl);
    }

    // Sections images upload
    const sections = await Promise.all(
      (body.sections || []).map(async (sec) => {
        let imgUrl = sec.image;
        if (imgUrl && imgUrl.startsWith("data:")) {
          imgUrl = await uploadBase64(imgUrl);
        }
        return {
          title: sec.title,
          description: sec.description,
          image: imgUrl,
        };
      })
    );

    const project = await Project.create({
      name: body.name,
      description: body.description,
      thumbnail: thumbnailUrl,
      sections,
    });

    return NextResponse.json({ message: "Project saved", project }, { status: 201 });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ message: "Error saving project" }, { status: 500 });
  }
}
