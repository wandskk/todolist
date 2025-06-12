"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao fazer login.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />
      <a href="/register" className="text-blue-600 text-sm text-center hover:underline mt-2">Não tem conta? Cadastre-se</a>
    </div>
  );
} 