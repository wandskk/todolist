import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";

export async function GET(request: Request) {
  const token = await getTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const decoded = verifyToken(token) as { email: string };
    return NextResponse.json({ email: decoded.email });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
} 