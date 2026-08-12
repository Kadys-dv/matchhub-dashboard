"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Não foi possível entrar.");
      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha inesperada.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-slate-700">
        E-mail
        <input name="email" type="email" autoComplete="email" required placeholder="voce@empresa.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-600" />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Senha
        <span className="relative mt-2 block">
          <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required minLength={8} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-slate-900 shadow-sm focus:border-emerald-600" />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-emerald-700" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </span>
      </label>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70">
        {loading ? <LoaderCircle className="animate-spin" size={20} /> : <LogIn size={20} />}
        {loading ? "Entrando..." : "Entrar no painel"}
      </button>
    </form>
  );
}
