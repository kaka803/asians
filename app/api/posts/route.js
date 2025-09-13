import { connectDb } from "@/lib/db";
import Post from "@/models/Post";
import cloudinary from "cloudinary";

// ✅ Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDb();

    const body = await req.json(); // JSON expect karo
    const { title, date, description, image, video } = body;

    let imageUrl = null;

    if (image) {
      const uploadedImage = await cloudinary.v2.uploader.upload(image, {
        folder: "timeline_images",
      });
      imageUrl = uploadedImage.secure_url;
    }

    

    const newPost = await Post.create({
      title,
      date,
      description,
      image: imageUrl,
    });

    return new Response(JSON.stringify({ success: true, post: newPost }), {
      status: 201,
    });
  } catch (error) {
    console.error("❌ POST Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDb();
    const posts = await Post.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, posts }), { status: 200 });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
