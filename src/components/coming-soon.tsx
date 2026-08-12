import type { LucideIcon } from "lucide-react";

export function ComingSoon({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-950/5"><Icon size={28} /></span><h1 className="mt-6 text-3xl font-bold tracking-tight">{title}</h1><p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">{description}</p><span className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm ring-1 ring-slate-200">Módulo preparado para a próxima etapa</span></div></section>;
}
