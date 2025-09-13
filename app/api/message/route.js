import Message from "@/models/Message";
import { connectDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1️⃣ Database connect karo
    await connectDb();

    // 2️⃣ Messages fetch karo
    const messages = await Message.find({}).sort({ createdAt: -1 }); // latest messages pehle

    // 3️⃣ Response return karo
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}


