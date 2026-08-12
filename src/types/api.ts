export type MatchStatus = "OPEN" | "FULL" | "COMPLETED" | "CANCELLED";

export interface MatchSummary {
  id: string;
  title: string;
  sport: string;
  address: string;
  startsAt: string;
  capacity: number;
  confirmed: number;
  status: MatchStatus;
  organizerId: string;
  organizerName: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  userId: string;
  name: string;
  role: string;
}

export interface AthleteSummary {
  id: string;
  name: string;
  email: string;
  role: "PLAYER" | "ADMIN";
  enabled: boolean;
  createdAt: string;
  participations: number;
}

export interface ParticipantSummary {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface ReportSummary {
  totalUsers: number;
  activeUsers: number;
  openMatches: number;
  fullMatches: number;
  completedMatches: number;
  totalParticipations: number;
  pendingReports: number;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  matchId: string | null;
  matchTitle: string | null;
  reason: string;
  details: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  createdAt: string;
  resolvedAt: string | null;
}
