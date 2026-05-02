import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Project";

// MongoDB connection
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URL);
}

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 }); 
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
  }
}
