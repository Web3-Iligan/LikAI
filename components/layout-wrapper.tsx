"use client";

import type React from "react";

import { usePathname } from "next/navigation";

import { DashboardLayout } from "./dashboard/dashboard-layout";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/", "/auth"]; // Routes where DashboardLayout should not be applied
  const isAuthRoute = pathname.startsWith("/auth"); // Exclude all auth routes including /auth/onboarding

  if (noLayoutRoutes.includes(pathname) || isAuthRoute) {
    return <>{children}</>;
  }

  return <DashboardLayout pathname={pathname}>{children}</DashboardLayout>;
}
