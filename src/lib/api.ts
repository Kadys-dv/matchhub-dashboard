import { env } from "@/lib/env";
import type { AthleteSummary, MatchStatus, MatchSummary, ModerationReport, PageResponse, ParticipantSummary, ReportSummary } from "@/types/api";

async function apiRequest<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response=await fetch(`${env.MATCHHUB_API_URL}${path}`,{...init,headers:{Authorization:`Bearer ${token}`,...init?.headers},cache:"no-store"});
  if (!response.ok) throw new Error(`API respondeu com status ${response.status}`);
  return response.json() as Promise<T>;
}

export async function fetchOpenMatches(token: string): Promise<PageResponse<MatchSummary>> {
  return fetchMatches(token,"OPEN");
}

export function fetchMatches(token: string,status: MatchStatus) { return apiRequest<PageResponse<MatchSummary>>(`/api/v1/matches?status=${status}&size=50`,token); }
export function fetchAthletes(token: string,query="") { return apiRequest<PageResponse<AthleteSummary>>(`/api/v1/admin/users?size=50&query=${encodeURIComponent(query)}`,token); }
export function fetchReportSummary(token: string) { return apiRequest<ReportSummary>("/api/v1/admin/reports/summary",token); }
export function fetchParticipants(token: string,id: string) { return apiRequest<ParticipantSummary[]>(`/api/v1/matches/${id}/participants`,token); }
export function fetchReports(token:string,status="PENDING") { return apiRequest<PageResponse<ModerationReport>>(`/api/v1/reports?status=${status}&size=50`,token); }
