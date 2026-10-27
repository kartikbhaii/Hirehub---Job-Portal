
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import {connectDB} from "@/app/lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, password, role } = await req.json();

        if (!name || !email || !password || !["student", "recruiter"].includes(role)) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ message: "Email already registered" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
        });

        return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
    } catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
