import type React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "./dashboard-layout";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const noLayoutRoutes = ["/", "/auth", "/onboarding"]; // Routes where DashboardLayout should not be applied
  const isAuthRoute = pathname.startsWith("/auth"); // Exclude all auth routes including /auth/onboarding

  if (noLayoutRoutes.includes(pathname) || isAuthRoute) {
    return <>{children}</>;
  }

  return <DashboardLayout pathname={pathname}>{children}</DashboardLayout>;
}
