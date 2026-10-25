
import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URL as string;

if (!DB_URI) throw new Error("MONGODB_URL is missing");

const cached = (globalThis as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}).mongoose ??= { conn: null, promise: null };

export async function connect() {
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(DB_URI, {
    dbName: "hirehub",
  }).catch((err) => {
    cached.promise = null;
    throw err;
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
