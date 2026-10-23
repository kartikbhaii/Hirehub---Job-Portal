
import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URL as string;

if (!DB_URI) {
  throw new Error("MONGODB_URL is missing in .env.local");
}

export async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
