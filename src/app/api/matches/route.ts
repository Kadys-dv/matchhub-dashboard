import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getAccessToken } from "@/lib/session";
import { forwardResponse } from "@/lib/api-response";

export async function POST(request:Request) {
  const token=await getAccessToken(); if(!token)return NextResponse.json({message:"Sessão expirada."},{status:401});
  const response=await fetch(`${env.MATCHHUB_API_URL}/api/v1/matches`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:await request.text(),cache:"no-store"});
  return forwardResponse(response);
}
