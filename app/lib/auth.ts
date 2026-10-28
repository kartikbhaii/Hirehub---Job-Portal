
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

export function generateToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: "15m",
  });
}


export function verifyToken(req: Request) {
  try {
    const cookieToken = req.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];

    const headerToken = req.headers
      .get("authorization")
      ?.split(" ")[1];

    const token = cookieToken || headerToken;

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
  } catch {
    return null;
  }
}

