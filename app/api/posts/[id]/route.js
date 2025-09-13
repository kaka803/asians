import { connectDb } from "@/lib/db";
import Post from "@/models/Post";
import cloudinary from "cloudinary";

// ✅ Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req, { params }) {
  try {
    await connectDb();

    const { id } = params;

    // Post find karo
    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ success: false, error: "Post not found" }), {
        status: 404,
      });
    }

    // ✅ Agar image Cloudinary pe hai to delete bhi kar do
    if (post.image) {
      const publicId = post.image.split("/").pop().split(".")[0]; // url se public_id nikalna
      await cloudinary.v2.uploader.destroy(`timeline_images/${publicId}`);
    }

    

    // ✅ DB se delete
    await Post.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true, message: "Post deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
