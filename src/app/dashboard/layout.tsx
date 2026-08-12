import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { getAccessToken, getIdentity } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!(await getAccessToken())) redirect("/login");
  const identity=await getIdentity();
  return <DashboardShell identity={identity}>{children}</DashboardShell>;
}
