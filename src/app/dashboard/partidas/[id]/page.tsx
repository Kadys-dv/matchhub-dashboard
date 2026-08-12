import Link from "next/link";
import {ArrowLeft,CalendarCheck,UserRound} from "lucide-react";
import {fetchParticipants} from "@/lib/api";
import {formatMatchDate} from "@/lib/format";
import {getAccessToken} from "@/lib/session";
import type {ParticipantSummary} from "@/types/api";

export default async function ParticipantsPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const token=await getAccessToken(); let participants:ParticipantSummary[]=[]; let failed=false;
  try{participants=await fetchParticipants(token!,id);}catch{failed=true;}
  return <div className="mx-auto max-w-3xl"><Link href="/dashboard/partidas" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><ArrowLeft size={17}/>Voltar para partidas</Link><div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-6"><h1 className="text-2xl font-bold">Participantes confirmados</h1><p className="mt-1 text-sm text-slate-500">Jogadores vinculados a esta partida.</p></div>{failed?<p className="p-8 text-center text-red-700">Não foi possível consultar os participantes.</p>:participants.length?participants.map((participant,index)=><article key={participant.id} className="flex items-center gap-4 border-b border-slate-100 p-5 last:border-0"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 font-bold text-emerald-700">{index+1}</span><div className="min-w-0 flex-1"><h2 className="flex items-center gap-2 font-semibold"><UserRound size={16}/>{participant.name}</h2><p className="truncate text-sm text-slate-500">{participant.email}</p></div><span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex"><CalendarCheck size={14}/>{formatMatchDate(participant.joinedAt)}</span></article>):<p className="p-10 text-center text-sm text-slate-500">Ainda não há participantes confirmados.</p>}</div></div>;
}
