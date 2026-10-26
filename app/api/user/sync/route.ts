import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connect } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: unknown = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("role" in body) ||
      (body.role !== "student" && body.role !== "recruiter")
    ) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    const role = body.role;

    await connect();

    const user = await User.findOneAndUpdate(
      { clerkUserId: userId },
      { $set: { role } },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      role: user.role,
    });
  } catch (error) {
    console.error("Role save failed:", error);

    return NextResponse.json(
      { message: "Failed to save role" },
      { status: 500 }
    );
  }
}