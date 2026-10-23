
import { connect } from "@/app/lib/mongodb";

export async function GET() {
  try {
    await connect();

    return Response.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return Response.json(
      {
        success: false,
        message: "MongoDB connection failed",
      },
      { status: 500 }
    );
  }
}
