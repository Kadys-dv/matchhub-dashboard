import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { SESSION_COOKIE } from "@/lib/session";
import type { AuthResponse } from "@/types/api";

const credentialsSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z.string().min(8, "A senha deve ter ao menos 8 caracteres."),
});

export async function POST(request: Request) {
  const parsed = credentialsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
  }

  try {
    const apiResponse = await fetch(`${env.MATCHHUB_API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });
    if (!apiResponse.ok) {
      return NextResponse.json({ message: "E-mail ou senha inválidos." }, { status: apiResponse.status === 401 ? 401 : 502 });
    }
    const auth = (await apiResponse.json()) as AuthResponse;
    const response = NextResponse.json({ name: auth.name, role: auth.role });
    response.cookies.set(SESSION_COOKIE, auth.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: auth.expiresInSeconds,
    });
    return response;
  } catch {
    return NextResponse.json({ message: "A API MatchHub está indisponível." }, { status: 503 });
  }
}
