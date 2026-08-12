import { BarChart3, CircleUserRound, LayoutDashboard, LogOut, MessageSquareWarning, Trophy, UsersRound } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";

const navigation = [
  { label: "Visão geral", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Partidas", icon: Trophy, href: "/dashboard/partidas" },
  { label: "Atletas", icon: UsersRound, href: "/dashboard/atletas" },
  { label: "Moderação", icon: MessageSquareWarning, href: "/dashboard/moderacao" },
  { label: "Relatórios", icon: BarChart3, href: "/dashboard/relatorios" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f7f4] text-slate-900 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden min-h-screen border-r border-white/10 bg-[#0b2418] p-6 text-white lg:flex lg:flex-col">
        <Brand />
        <nav className="mt-10 space-y-2" aria-label="Navegação principal">
          {navigation.map(({ label, icon: Icon, href }, index) => (
            <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${index === 0 ? "bg-emerald-500 text-white" : "text-emerald-50/70 hover:bg-white/8 hover:text-white"}`}>
              <Icon size={19} />{label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-6">
          <form action="/api/auth/logout" method="post">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-emerald-50/70 hover:bg-white/8 hover:text-white"><LogOut size={19} />Sair da conta</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div className="lg:hidden"><Brand compact /></div>
          <div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Painel de operações</p><p className="text-sm text-slate-500">Dados e gestão da plataforma</p></div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 pr-4 shadow-sm"><span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700"><CircleUserRound size={20} /></span><span className="text-sm font-semibold">Administrador</span></div>
        </header>
        <main className="p-5 sm:p-8">{children}</main>
        <footer className="px-5 pb-8 text-center text-xs text-slate-500 sm:px-8">Desenvolvido por Dev Rodrigo • Todos os direitos reservados</footer>
      </div>
    </div>
  );
}
