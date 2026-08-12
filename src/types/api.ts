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
