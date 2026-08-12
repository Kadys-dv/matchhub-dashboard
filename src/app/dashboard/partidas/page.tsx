import Link from "next/link";
import { MapPin,Trophy,UsersRound } from "lucide-react";
import { CreateMatchForm } from "@/components/create-match-form";
import { MatchActionButton } from "@/components/match-action-button";
import { fetchMatches } from "@/lib/api";
import { formatMatchDate,occupancyPercentage } from "@/lib/format";
import { getAccessToken } from "@/lib/session";
import type { MatchStatus,MatchSummary } from "@/types/api";

const labels:Record<MatchStatus,string>={OPEN:"Abertas",FULL:"Lotadas",COMPLETED:"Concluídas",CANCELLED:"Canceladas"};
export default async function MatchesPage(){
  const token=await getAccessToken();
  const results=await Promise.all((["OPEN","FULL","COMPLETED","CANCELLED"] as MatchStatus[]).map(async status=>{
    try{return {status,matches:(await fetchMatches(token!,status)).content,failed:false};}
    catch{return {status,matches:[] as MatchSummary[],failed:true};}
  }));
  const unavailable=results.some(result=>result.failed);
  return <div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><p className="text-sm font-semibold text-emerald-700">Operação</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Gestão de partidas</h1><p className="mt-2 text-sm text-slate-500">Crie, acompanhe participantes e encerre jogos.</p></div><CreateMatchForm/></div>{unavailable&&<p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Não foi possível consultar todas as partidas. Verifique a API ou sua sessão.</p>}<div className="mt-7 space-y-7">{results.map(({status,matches})=><section key={status}><div className="mb-3 flex items-center gap-2"><h2 className="font-bold">{labels[status]}</h2><span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">{matches.length}</span></div>{matches.length?<div className="grid gap-4 xl:grid-cols-2">{matches.map(match=><MatchCard key={match.id} match={match}/>)}</div>:<div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500">Nenhuma partida nesta etapa.</div>}</section>)}</div></div>;
}
function MatchCard({match}:{match:MatchSummary}){const progress=occupancyPercentage(match.confirmed,match.capacity);return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{match.title}</h3><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase text-emerald-700">{match.sport}</span></div><p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={14}/>{match.address}</p></div><Trophy size={20} className="text-emerald-600"/></div><div className="mt-4 flex justify-between text-xs text-slate-600"><span className="flex items-center gap-1"><UsersRound size={14}/>{match.confirmed}/{match.capacity}</span><span>{formatMatchDate(match.startsAt)}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{width:`${progress}%`}}/></div><div className="mt-5 flex flex-wrap items-center gap-2"><Link href={`/dashboard/partidas/${match.id}`} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">Ver participantes</Link>{(match.status==="OPEN"||match.status==="FULL")&&<><MatchActionButton id={match.id} action="complete" label="Concluir"/><MatchActionButton id={match.id} action="cancel" label="Cancelar" danger/></>}</div></article>}
