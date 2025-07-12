"use client"

import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import type React from "react"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Paths that should NOT have the DashboardLayout
  const noDashboardLayoutPaths = ["/", "/auth"]

  const showDashboardLayout = !noDashboardLayoutPaths.includes(pathname)

  return showDashboardLayout ? <DashboardLayout>{children}</DashboardLayout> : children
}
