import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecretkey";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const db = await connectDB();
    const user = await db.collection("users").findOne(
      { email: decoded.email },
      { projection: { password: 0 } } // do not return password
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
