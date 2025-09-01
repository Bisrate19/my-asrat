import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecretkey";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    const client = await clientPromise;
    const db = client.db("asratDB");
    const user = await db.collection("users").findOne(
      { email: decoded.email },
      { projection: { password: 0 } } // don’t return password
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
