"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email);
      } else {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow w-80 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="mb-4">Bem-vindo, <span className="font-mono">{email}</span>!</p>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Sair</button>
      </div>
    </div>
  );
} 