
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Job from "@/app/models/Job";
import { verifyToken } from "@/app/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = verifyToken(req);

    if (!user || user.role !== "recruiter") {
      return NextResponse.json(
        { message: "Only recruiters can post jobs" },
        { status: 401 }
      );
    }

    const data = await req.json();

    const job = await Job.create({
      ...data,
      recruiterId: user.userId,
    });

    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}
