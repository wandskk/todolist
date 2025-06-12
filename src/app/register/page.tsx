"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(email: string, password: string) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao registrar.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        error={error}
        loading={loading}
      />
      <a href="/login" className="text-blue-600 text-sm text-center hover:underline mt-2">Já tem conta? Entrar</a>
    </div>
  );
} 