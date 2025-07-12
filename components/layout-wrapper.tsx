"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { DashboardLayout } from "./dashboard-layout"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noLayoutRoutes = ["/", "/auth"] // Routes where DashboardLayout should not be applied

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>
  }

  return <DashboardLayout pathname={pathname}>{children}</DashboardLayout>
}
