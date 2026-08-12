import { Activity, CalendarDays, MapPin, Target, Trophy, UsersRound } from "lucide-react";
import { fetchOpenMatches } from "@/lib/api";
import { formatMatchDate, occupancyPercentage } from "@/lib/format";
import { getAccessToken } from "@/lib/session";
import { StatCard } from "@/components/stat-card";
import type { MatchSummary, PageResponse } from "@/types/api";

const emptyPage: PageResponse<MatchSummary> = { content: [], totalElements: 0, totalPages: 0, number: 0, size: 20 };

export default async function DashboardPage() {
  const token = await getAccessToken();
  let data = emptyPage;
  let apiAvailable = true;
  try { if (token) data = await fetchOpenMatches(token); } catch { apiAvailable = false; }
  const confirmed = data.content.reduce((total, match) => total + match.confirmed, 0);
  const capacity = data.content.reduce((total, match) => total + match.capacity, 0);
  const vacancies = Math.max(0, capacity - confirmed);
  const occupation = occupancyPercentage(confirmed, capacity);

  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold text-emerald-700">Visão geral</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Central de operações PlayMatch</h1><p className="mt-2 text-sm text-slate-500">Indicadores em tempo real para decisões mais rápidas.</p></div>
        <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${apiAvailable ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}><span className={`size-2 rounded-full ${apiAvailable ? "animate-pulse bg-emerald-500" : "bg-amber-500"}`} />{apiAvailable ? "API conectada" : "API temporariamente indisponível"}</span>
      </div>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Partidas abertas" value={String(data.totalElements)} helper="Disponíveis para participação" icon={Trophy} />
        <StatCard label="Atletas confirmados" value={String(confirmed)} helper="Nas próximas partidas" icon={UsersRound} tone="blue" />
        <StatCard label="Vagas disponíveis" value={String(vacancies)} helper="Oportunidades em aberto" icon={Target} tone="amber" />
        <StatCard label="Taxa de ocupação" value={`${occupation}%`} helper="Capacidade das partidas" icon={Activity} tone="violet" />
      </section>
      <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6"><div><h2 className="font-bold text-slate-950">Próximas partidas</h2><p className="mt-1 text-xs text-slate-500">Agenda de jogos com inscrições abertas</p></div><CalendarDays className="text-emerald-600" size={22} /></div>
        {data.content.length ? <div className="divide-y divide-slate-100">{data.content.slice(0, 6).map((match) => { const progress = occupancyPercentage(match.confirmed, match.capacity); return <article key={match.id} className="grid gap-4 px-5 py-5 hover:bg-emerald-50/40 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900">{match.title}</h3><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{match.sport}</span></div><p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={14} />{match.address}</p></div><div className="min-w-44"><div className="flex justify-between text-xs"><span className="font-medium text-slate-700">{match.confirmed}/{match.capacity} atletas</span><span className="text-slate-500">{formatMatchDate(match.startsAt)}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${progress}%` }} /></div></div></article>; })}</div> : <div className="px-6 py-14 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><Trophy size={26} /></span><h3 className="mt-4 font-semibold text-slate-800">Nenhuma partida aberta</h3><p className="mt-1 text-sm text-slate-500">Novas partidas aparecerão aqui automaticamente.</p></div>}
      </section>
    </div>
  );
}
