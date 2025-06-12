import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function signToken(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export async function getTokenFromCookies(req?: Request) {
  if (req) {
    const cookie = req.headers.get("cookie") || "";
    return cookie.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1] || null;
  } else {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value || null;
  }
}

export async function getUserFromRequest(req?: Request) {
  const token = await getTokenFromCookies(req);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
} 