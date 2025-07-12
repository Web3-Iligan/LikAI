"use client"

import { useState } from "react"
import Link from "next/link" // Import Link for navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  Droplets,
  Fish,
  Target,
  Zap,
  ArrowRight,
  CalendarDays,
  BarChart3,
} from "lucide-react"
import RiskTrendChart from "@/components/risk-trend-chart"
import TaskCompletionChart from "@/components/task-completion-chart"

export function DashboardOverview() {
  const [farmProfile] = useState({
    name: "Sunrise Shrimp Farm",
    type: "Intensive Shrimp Culture",
    species: "Litopenaeus vannamei",
    size: "5 hectares",
    location: "Bataan, Philippines",
    currentCycle: 3,
    riskLevel: "medium" as const,
    completedTasks: 12,
    totalTasks: 18,
    cycleDay: 45,
    expectedHarvest: "2024-02-15",
  })

  const [criticalAlerts] = useState([
    {
      id: 1,
      type: "weather",
      title: "Typhoon Alert - Immediate Action Required",
      message: "Heavy rains expected in 6 hours. Check pond dykes and drainage systems immediately.",
      priority: "critical",
      timestamp: "2 hours ago",
      action: "View Emergency Protocol",
      href: "/plan", // Link to the plan page
    },
    {
      id: 2,
      type: "neighbor",
      title: "Disease Outbreak Nearby",
      message: "WSSV detected 2km away. Enhanced biosecurity protocols activated.",
      priority: "high",
      timestamp: "6 hours ago",
      action: "Review Biosecurity Plan",
      href: "/plan", // Link to the plan page
    },
  ])

  const [quickStats] = useState([
    {
      title: "Overall Risk Score",
      value: "68/100",
      change: "+5 from yesterday",
      trend: "up",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: Shield,
      href: "/risk", // Link to risk page
    },
    {
      title: "Plan Progress",
      value: "67%",
      change: "12 of 18 tasks done",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Target,
      href: "/progress", // Link to progress page
    },
    {
      title: "Cycle Progress",
      value: "Day 45",
      change: "25 days to harvest",
      trend: "stable",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CalendarDays, // Changed icon to CalendarDays
      href: "/calendar", // Link to calendar page
    },
    {
      title: "Cost Savings",
      value: "₱45,000",
      change: "This cycle",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: DollarSign,
      href: "/resources", // Link to resources page
    },
  ])

  const [recentActivities] = useState([
    {
      id: 1,
      type: "task_completed",
      title: "Footbath Protocol Implemented",
      description: "Successfully set up visitor disinfection station",
      timestamp: "2 hours ago",
      icon: CheckCircle,
      iconColor: "text-green-500",
      href: "/plan",
    },
    {
      id: 2,
      type: "risk_update",
      title: "Risk Assessment Updated",
      description: "Weather risk increased due to approaching typhoon",
      timestamp: "4 hours ago",
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      href: "/risk",
    },
    {
      id: 3,
      type: "ai_recommendation",
      title: "New AI Recommendation",
      description: "Suggested pond dyke inspection based on weather forecast",
      timestamp: "6 hours ago",
      icon: Zap,
      iconColor: "text-blue-500",
      href: "/coach",
    },
    {
      id: 4,
      type: "monitoring",
      title: "Water Quality Check",
      description: "All parameters within normal range",
      timestamp: "8 hours ago",
      icon: Droplets,
      iconColor: "text-cyan-500",
      href: "/analytics",
    },
  ])

  const riskTrendData = [
    { date: "Mon", value: 45 },
    { date: "Tue", value: 52 },
    { date: "Wed", value: 48 },
    { date: "Thu", value: 61 },
    { date: "Fri", value: 58 },
    { date: "Sat", value: 65 },
    { date: "Sun", value: 68 },
  ]

  const taskCompletionData = [
    { label: "2 Weeks Ago", value: 67 },
    { label: "Last Week", value: 75 },
    { label: "This Week", value: 80 },
  ]

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`border-l-4 ${
                alert.priority === "critical"
                  ? "border-l-red-500 bg-red-50 border-red-200"
                  : "border-l-orange-500 bg-orange-50 border-orange-200"
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <Badge variant={alert.priority === "critical" ? "destructive" : "default"}>
                  {alert.priority.toUpperCase()}
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  <Link href={alert.href} passHref>
                    <Button size="sm" variant="outline">
                      {alert.action}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Link key={index} href={stat.href} passHref>
              <Card className={`${stat.borderColor} border-l-4 cursor-pointer hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Main Content Sections (formerly tabs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="h-5 w-5 text-blue-600" />
              Farm Status Overview
            </CardTitle>
            <CardDescription>Current production cycle and key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Current Cycle</p>
                <p className="text-xl font-bold text-blue-600">#{farmProfile.currentCycle}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Cycle Day</p>
                <p className="text-xl font-bold text-green-600">{farmProfile.cycleDay}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Expected Harvest</span>
                <span className="text-gray-800">{farmProfile.expectedHarvest}</span>
              </div>
              <Progress value={(farmProfile.cycleDay / 70) * 100} className="h-2" />
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Farm Size</span>
                <span className="text-sm text-gray-800">{farmProfile.size}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-medium text-gray-600">Species</span>
                <span className="text-sm text-gray-800">{farmProfile.species}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <Link key={activity.id} href={activity.href} passHref>
                    <div className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md -mx-2">
                      <div className={`p-1 rounded-full bg-gray-100`}>
                        <IconComponent className={`h-3 w-3 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <Link href="/analytics" passHref>
              <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                View All Activities
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* AI-Generated Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              AI-Generated Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your farm data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Weather Impact Analysis</h4>
              <p className="text-sm text-blue-800">
                Based on the approaching typhoon, your farm has a 75% risk of pond overflow. Prioritizing dyke
                inspection could prevent up to ₱200,000 in potential losses.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Cost Optimization Opportunity</h4>
              <p className="text-sm text-green-800">
                Implementing solar water disinfection could reduce your water treatment costs by 40% while maintaining
                85% effectiveness compared to your current method.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-2">Biosecurity Gap Detected</h4>
              <p className="text-sm text-orange-800">
                Your visitor protocol compliance is at 60%. Enhancing this to 90% could reduce disease introduction risk
                by an additional 25%.
              </p>
            </div>
            <Link href="/coach" passHref>
              <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                Ask AI Coach for more insights
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Risk Trend Analysis Graph */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Risk Trend Analysis
            </CardTitle>
            <CardDescription>7-day risk level progression</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskTrendChart data={riskTrendData} />
            <Link href="/analytics" passHref>
              <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Task Completion Rate Graph */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Task Completion Rate
            </CardTitle>
            <CardDescription>Weekly progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskCompletionChart data={taskCompletionData} />
            <Link href="/progress" passHref>
              <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                View Detailed Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
