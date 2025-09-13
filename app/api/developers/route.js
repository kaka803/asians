import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import Developer from "@/models/Developer";

// GET all developers
export async function GET() {
  await connectDb();
  const devs = await Developer.find();
  return NextResponse.json(devs);
}

// POST new developer
export async function POST(req) {
  await connectDb();
  const body = await req.json();
  try {
    const newDev = await Developer.create(body);
    return NextResponse.json(newDev, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE developer
export async function DELETE(req) {
  await connectDb();
  const { id } = await req.json();
  try {
    await Developer.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
