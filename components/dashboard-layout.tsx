"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Fish,
  LayoutDashboard,
  Target,
  MessageCircle,
  Activity,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Menu,
  Shield,
  BookOpen,
  BarChart3,
  CalendarDays,
  FileText,
  HelpCircle,
  ClipboardList,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavigationItem {
  title: string
  href: string
  icon: any
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Farm Assessment", // New navigation item
    href: "/assessment",
    icon: ClipboardList, // New icon
  },
  {
    title: "Dynamic Plan",
    href: "/plan",
    icon: Target,
    badge: "3",
    badgeVariant: "destructive",
  },
  {
    title: "AI Coach",
    href: "/coach",
    icon: MessageCircle,
    badge: "New",
    badgeVariant: "default",
  },
  {
    title: "Risk Assessment",
    href: "/risk",
    icon: Activity,
    badge: "High",
    badgeVariant: "destructive",
  },
  {
    title: "Resource Optimizer",
    href: "/resources",
    icon: DollarSign,
  },
  {
    title: "Progress Tracker",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: CalendarDays, // Changed icon to CalendarDays
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
]

const bottomNavigationItems: NavigationItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const NavigationContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo and Farm Info */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Fish className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AquaSecure AI</h1>
            <p className="text-sm text-gray-500">Biosecurity Coach</p>
          </div>
        </div>

        {/* Farm Profile Card */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-blue-100 text-blue-600">SF</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sunrise Shrimp Farm</p>
              <p className="text-xs text-gray-500">Bataan, Philippines</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium text-orange-600">Medium Risk</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Cycle #3
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center justify-start gap-3 h-10 px-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                    : "text-gray-700 hover:text-gray-900",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant={item.badgeVariant || "secondary"} className="h-5 px-1.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-3">
        <nav className="space-y-1">
          {bottomNavigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center justify-start gap-3 h-10 px-3 rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                    : "text-gray-700 hover:text-gray-900",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )

  const currentPageTitle =
    navigationItems.find((item) => item.href === pathname)?.title ||
    bottomNavigationItems.find((item) => item.href === pathname)?.title ||
    "Dashboard"

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <NavigationContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentPageTitle}</h1>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Alerts */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">JD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">Juan Dela Cruz</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
