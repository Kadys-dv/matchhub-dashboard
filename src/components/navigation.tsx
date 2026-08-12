"use client";
import { BarChart3, LayoutDashboard, MessageSquareWarning, Trophy, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items=[{label:"Visão geral",icon:LayoutDashboard,href:"/dashboard"},{label:"Partidas",icon:Trophy,href:"/dashboard/partidas"},{label:"Atletas",icon:UsersRound,href:"/dashboard/atletas"},{label:"Moderação",icon:MessageSquareWarning,href:"/dashboard/moderacao"},{label:"Relatórios",icon:BarChart3,href:"/dashboard/relatorios"}];
export function Navigation({mobile=false}:{mobile?:boolean}) {
  const pathname=usePathname();
  if(mobile)return <nav aria-label="Navegação móvel" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,.08)] backdrop-blur lg:hidden">{items.map(({label,icon:Icon,href})=>{const active=pathname===href;return <Link key={href} href={href} className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-semibold ${active?"text-emerald-700":"text-slate-500"}`}><Icon size={19}/><span className="max-w-full truncate">{label}</span></Link>})}</nav>;
  return <nav className="mt-10 space-y-2" aria-label="Navegação principal">{items.map(({label,icon:Icon,href})=>{const active=pathname===href;return <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${active?"bg-emerald-500 text-white":"text-emerald-50/70 hover:bg-white/8 hover:text-white"}`}><Icon size={19}/>{label}</Link>})}</nav>;
}
