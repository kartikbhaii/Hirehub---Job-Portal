
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import {connectDB} from "@/app/lib/mongodb";
import { generateToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString(), user.role);

    const response = NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

    response.cookies.set("token", token, {
      path: "/",
      maxAge: 15 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
