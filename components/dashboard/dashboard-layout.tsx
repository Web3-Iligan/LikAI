"use client"

import React from "react"

import Link from "next/link"
import {
  ListChecks,
  Shield,
  Zap,
  DollarSign,
  BarChart3,
  BookOpen,
  Settings,
  LifeBuoy,
  Menu,
  ClipboardList,
  FileText,
  Bell,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils" // Import cn for conditional class names
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Import Avatar components
import { Badge } from "@/components/ui/badge" // Import Badge component
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area" // Import ScrollArea

interface NavigationItem {
  title: string
  href: string
  icon: any
  badge?: string
  badgeVariant?: "default" | "destructive" | "outline" | "secondary"
}

interface DashboardLayoutProps {
  children: any
  pathname: string // Receive pathname as a prop
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Farm Assessment",
    href: "/assessment",
    icon: ClipboardList,
  },
  {
    title: "Dynamic Plan",
    href: "/plan",
    icon: ListChecks,
    badge: "3",
    badgeVariant: "destructive",
  },
  {
    title: "AI Coach",
    href: "/coach",
    icon: Zap,
    badge: "New",
    badgeVariant: "default",
  },
  {
    title: "Risk Assessment",
    href: "/risk",
    icon: Shield,
    badge: "High",
    badgeVariant: "destructive",
  },
  {
    title: "Resource Optimizer",
    href: "/resources",
    icon: DollarSign,
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
    icon: LifeBuoy,
  },
]

export function DashboardLayout({ children, pathname }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const NavigationContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-200/50">
            <Image 
              src="/Likai-logo.svg" 
              alt="LikAI Logo" 
              width={24} 
              height={24}
              className="w-6 h-6"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LikAI</h1>
            <p className="text-sm text-gray-500">Biosecurity Coach</p>
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
