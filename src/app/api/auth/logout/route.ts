import { NextResponse } from "next/server";
import { IDENTITY_COOKIE, SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  response.cookies.set(IDENTITY_COOKIE,"",{httpOnly:true,maxAge:0,path:"/"});
  return response;
}
