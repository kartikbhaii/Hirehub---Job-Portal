import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connect } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await connect();

  const user = await User.findOne({ clerkUserId: userId })
    .select("role")
    .lean();

  let destination = "/onboarding";

  if (user?.role === "student") {
    destination = "/student/dashboard";
  } else if (user?.role === "recruiter") {
    destination = "/recruiter/dashboard";
  }

  return NextResponse.redirect(new URL(destination, request.url));
}