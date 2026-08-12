import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";
import { getAccessToken } from "@/lib/session";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await getAccessToken()) redirect("/dashboard");
  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden p-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,.35),transparent_35%),linear-gradient(145deg,#071a12,#0f3223)]" />
        <div className="relative"><Brand /></div>
        <div className="relative max-w-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[.24em] text-emerald-300">Gestão esportiva inteligente</p>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight">Todas as partidas sob controle, em um único lugar.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-50/75">Acompanhe ocupação, atletas, eventos e indicadores operacionais com clareza e segurança.</p>
        </div>
        <p className="relative text-sm text-emerald-50/60">Desenvolvido por Dev Rodrigo • Todos os direitos reservados</p>
      </section>
      <section className="flex min-h-screen items-center justify-center bg-[#f5f8f6] px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/8 sm:p-10">
          <div className="mb-8 lg:hidden"><Brand /></div>
          <p className="text-sm font-semibold text-emerald-700">Bem-vindo de volta</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Acesse sua conta</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">Use as credenciais cadastradas na API MatchHub.</p>
          <LoginForm />
          <p className="mt-8 text-center text-xs leading-5 text-slate-400 lg:hidden">Desenvolvido por Dev Rodrigo<br />Todos os direitos reservados</p>
        </div>
      </section>
    </main>
  );
}
