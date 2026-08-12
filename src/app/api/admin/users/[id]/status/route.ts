import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getAccessToken } from "@/lib/session";
import { forwardResponse } from "@/lib/api-response";

const schema=z.object({enabled:z.boolean()});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  const token=await getAccessToken(); if(!token)return NextResponse.json({message:"Sessão expirada."},{status:401});
  const parsed=schema.safeParse(await request.json().catch(()=>null)); if(!parsed.success)return NextResponse.json({message:"Estado inválido."},{status:400});
  const {id}=await params;
  const response=await fetch(`${env.MATCHHUB_API_URL}/api/v1/admin/users/${id}/status`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(parsed.data),cache:"no-store"});
  return forwardResponse(response);
}
