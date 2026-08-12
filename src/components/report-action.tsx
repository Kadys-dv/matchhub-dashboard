"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export function ReportAction({id,status,label}:{id:string;status:"RESOLVED"|"DISMISSED";label:string}){const router=useRouter();const [loading,setLoading]=useState(false);async function run(){setLoading(true);const response=await fetch(`/api/reports/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});setLoading(false);if(response.ok)router.refresh();else alert("Não foi possível atualizar a denúncia.")}return <button disabled={loading} onClick={run} className={`rounded-lg px-3 py-2 text-xs font-semibold ${status==="RESOLVED"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-700"}`}>{loading?"Salvando...":label}</button>}
