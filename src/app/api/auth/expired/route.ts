import {NextResponse} from "next/server";
import {IDENTITY_COOKIE,SESSION_COOKIE} from "@/lib/session";
export function GET(request:Request){const response=NextResponse.redirect(new URL("/login?reason=session-expired",request.url),303);response.cookies.set(SESSION_COOKIE,"",{httpOnly:true,maxAge:0,path:"/"});response.cookies.set(IDENTITY_COOKIE,"",{httpOnly:true,maxAge:0,path:"/"});return response;}
