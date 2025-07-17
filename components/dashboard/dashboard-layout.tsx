"use client";

import React from "react";

// Import Badge component
import {
  Bell,
  BookOpen,
  ClipboardList,
  DollarSign,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Menu,
  Settings,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import cn for conditional class names
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Import Avatar components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Import ScrollArea

interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "outline" | "secondary";
}

interface DashboardLayoutProps {
  children: any;
  pathname: string; // Receive pathname as a prop
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
];

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
];

export function DashboardLayout({ children, pathname }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const NavigationContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200/50 bg-white">
            <Image
              src="/Likai-logo.svg"
              alt="LikAI Logo"
              width={24}
              height={24}
              className="h-6 w-6"
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
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 w-full items-center justify-start gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "text-gray-700 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || "secondary"}
                    className="h-5 px-1.5 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-3">
        <nav className="space-y-1">
          {bottomNavigationItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 w-full items-center justify-start gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100",
                  isActive
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "text-gray-700 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const currentPageTitle =
    navigationItems.find(item => item.href === pathname)?.title ||
    bottomNavigationItems.find(item => item.href === pathname)?.title ||
    "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <NavigationContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentPageTitle}
                </h1>
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
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs text-white">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-blue-100 text-xs text-blue-600">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm sm:inline">Juan Dela Cruz</span>
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
  );
}
