import { CircleUserRound, LogOut } from "lucide-react";
import { Brand } from "@/components/brand";
import { Navigation } from "@/components/navigation";

export function DashboardShell({children,identity}:{children:React.ReactNode;identity:{name:string;role:string}|null}) {
  return <div className="min-h-screen bg-[#f3f7f4] text-slate-900 lg:grid lg:grid-cols-[260px_1fr]">
    <aside className="hidden min-h-screen border-r border-white/10 bg-[#0b2418] p-6 text-white lg:flex lg:flex-col"><Brand/><Navigation/><div className="mt-auto border-t border-white/10 pt-6"><form action="/api/auth/logout" method="post"><button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-emerald-50/70 hover:bg-white/8 hover:text-white"><LogOut size={19}/>Sair da conta</button></form></div></aside>
    <div className="min-w-0 pb-20 lg:pb-0"><header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md sm:px-8"><div className="lg:hidden"><Brand compact/></div><div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Painel de operações</p><p className="text-sm text-slate-500">Dados e gestão da plataforma</p></div><div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 pr-4 shadow-sm"><span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700"><CircleUserRound size={20}/></span><span><strong className="block max-w-28 truncate text-sm">{identity?.name??"Usuário"}</strong><small className="block text-[10px] uppercase text-slate-400">{identity?.role==="ADMIN"?"Administrador":"Operador"}</small></span></div></header><main className="p-5 sm:p-8">{children}</main><footer className="px-5 pb-8 text-center text-xs text-slate-500 sm:px-8">Desenvolvido por Dev Rodrigo • Todos os direitos reservados</footer><Navigation mobile/></div>
  </div>;
}
