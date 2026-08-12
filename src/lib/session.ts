import { cookies } from "next/headers";

export const SESSION_COOKIE = "matchhub_session";

export async function getAccessToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}
