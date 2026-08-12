import { env } from "@/lib/env";
import type { MatchSummary, PageResponse } from "@/types/api";

export async function fetchOpenMatches(token: string): Promise<PageResponse<MatchSummary>> {
  const response = await fetch(`${env.MATCHHUB_API_URL}/api/v1/matches?status=OPEN&size=20`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`API respondeu com status ${response.status}`);
  return response.json() as Promise<PageResponse<MatchSummary>>;
}
