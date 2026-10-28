import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Job from "@/app/models/Job";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ message: "Failed to fetch job" }, { status: 500 });
  }
}