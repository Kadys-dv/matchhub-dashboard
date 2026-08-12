import type { LucideIcon } from "lucide-react";

export function StatCard({ label, value, helper, icon: Icon, tone = "emerald" }: { label: string; value: string; helper: string; icon: LucideIcon; tone?: "emerald" | "blue" | "amber" | "violet" }) {
  const tones = { emerald: "bg-emerald-100 text-emerald-700", blue: "bg-blue-100 text-blue-700", amber: "bg-amber-100 text-amber-700", violet: "bg-violet-100 text-violet-700" };
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">
      <div className="flex items-start justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`grid size-11 place-items-center rounded-2xl ${tones[tone]} transition-transform duration-300 group-hover:[transform:perspective(300px)_rotateY(-14deg)_translateZ(8px)]`}><Icon size={21} /></span></div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </article>
  );
}
