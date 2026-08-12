import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getAccessToken } from "@/lib/session";
import { forwardResponse } from "@/lib/api-response";

const actionSchema=z.object({action:z.enum(["cancel","complete"])});
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}) {
  const token=await getAccessToken(); if(!token)return NextResponse.json({message:"Sessão expirada."},{status:401});
  const parsed=actionSchema.safeParse(await request.json().catch(()=>null)); if(!parsed.success)return NextResponse.json({message:"Ação inválida."},{status:400});
  const {id}=await params;
  const response=await fetch(`${env.MATCHHUB_API_URL}/api/v1/matches/${id}/${parsed.data.action}`,{method:"POST",headers:{Authorization:`Bearer ${token}`},cache:"no-store"});
  return forwardResponse(response);
}
