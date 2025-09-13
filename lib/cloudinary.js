import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "projects", // Cloudinary folder ka naam
    });
    return result.secure_url; // image ka URL return hoga
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
}
