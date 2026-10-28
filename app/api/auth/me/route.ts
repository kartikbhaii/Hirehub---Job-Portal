import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: Request) {
  const user = verifyToken(req);
  

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ userId: user.userId, role: user.role });
}