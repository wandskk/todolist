import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getTokenFromCookies();
  if (token) {
    try {
      verifyToken(token);
      redirect("/dashboard");
    } catch {
      redirect("/login");
    }
  } else {
    redirect("/login");
  }
  return null;
}
