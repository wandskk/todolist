import React, { useState } from "react";

type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
  loading?: boolean;
};

export default function AuthForm({ type, onSubmit, error, loading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">{type === "login" ? "Login" : "Cadastro"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800" disabled={loading}>
        {loading ? "Enviando..." : type === "login" ? "Entrar" : "Cadastrar"}
      </button>
    </form>
  );
} 