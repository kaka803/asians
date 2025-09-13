// app/api/deleteproject/[id]/route.js
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { connectDb } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    await connectDb(); // DB connect

    const { id } = params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully", project: deletedProject });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
