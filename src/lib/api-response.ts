import { NextResponse } from "next/server";

export async function forwardResponse(response: Response) {
  const body=await response.text();
  return new NextResponse(body||null,{status:response.status,headers:{"Content-Type":response.headers.get("Content-Type")??"application/json"}});
}
