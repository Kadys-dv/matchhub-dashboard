import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getAccessToken } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!(await getAccessToken())) redirect("/login");
  return <DashboardShell>{children}</DashboardShell>;
}
