/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const client = await clientPromise;
    const db = client.db("asratDB");
    const user = await db.collection("users").findOne({ email });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      initialBalance: user.initialBalance ?? null,
      titheRate: user.titheRate ?? 10,
      incomeRecords: user.incomeRecords ?? [],
      spendingRecords: user.spendingRecords ?? [],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("asratDB");

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          initialBalance: body.initialBalance ?? null,
          titheRate: body.titheRate ?? 10,
          incomeRecords: body.incomeRecords ?? [],
          spendingRecords: body.spendingRecords ?? [],
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save dashboard" }, { status: 500 });
  }
}
