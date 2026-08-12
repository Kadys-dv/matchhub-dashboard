import { cookies } from "next/headers";

export const SESSION_COOKIE = "matchhub_session";
export const IDENTITY_COOKIE = "matchhub_identity";

export async function getAccessToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

export async function getIdentity() {
  const raw=(await cookies()).get(IDENTITY_COOKIE)?.value;
  if (!raw) return null;
  try { return JSON.parse(raw) as { name: string; role: string }; } catch { return null; }
}
