"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle } from "lucide-react"
import { DashboardOverview } from "@/components/dashboard-overview"

interface FarmProfile {
  name: string
  type: string
  species: string
  size: string
  location: string
  currentCycle: number
  riskLevel: "low" | "medium" | "high"
  completedTasks: number
  totalTasks: number
}

export default function AquaSecureAIDashboard() {
  const [farmProfile] = useState<FarmProfile>({
    name: "Sunrise Shrimp Farm",
    type: "Intensive Shrimp Culture",
    species: "Litopenaeus vannamei",
    size: "5 hectares",
    location: "Bataan, Philippines",
    currentCycle: 3,
    riskLevel: "medium",
    completedTasks: 12,
    totalTasks: 18,
  })

  const [recentAlerts] = useState([
    {
      id: 1,
      type: "weather",
      title: "Heavy Rain Alert",
      message: "Typhoon approaching. Check pond dykes and drainage systems.",
      priority: "high",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "neighbor",
      title: "Neighbor Farm Issue",
      message: "Disease outbreak reported 2km away. Enhance biosecurity protocols.",
      priority: "high",
      timestamp: "6 hours ago",
    },
    {
      id: 3,
      type: "progress",
      title: "Task Completed",
      message: "Footbath protocol successfully implemented.",
      priority: "low",
      timestamp: "1 day ago",
    },
  ])

  const progressPercentage = (farmProfile.completedTasks / farmProfile.totalTasks) * 100

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DashboardOverview />

      {/* Farm Profile Card */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            {farmProfile.name}
          </CardTitle>
          <CardDescription>
            {farmProfile.type} • {farmProfile.species} • {farmProfile.size}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Current Cycle</p>
              <p className="text-2xl font-bold text-blue-600">#{farmProfile.currentCycle}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Risk Level</p>
              <Badge
                variant={
                  farmProfile.riskLevel === "high"
                    ? "destructive"
                    : farmProfile.riskLevel === "medium"
                      ? "default"
                      : "secondary"
                }
              >
                {farmProfile.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Plan Progress</p>
              <div className="space-y-1">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-gray-500">
                  {farmProfile.completedTasks}/{farmProfile.totalTasks} tasks
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Location</p>
              <p className="text-sm text-gray-700">{farmProfile.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Dynamic Alerts & Adaptations
        </h2>
        <div className="grid gap-3">
          {recentAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`border-l-4 ${
                alert.priority === "high"
                  ? "border-l-red-500 bg-red-50"
                  : alert.priority === "medium"
                    ? "border-l-orange-500 bg-orange-50"
                    : "border-l-green-500 bg-green-50"
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <span className="text-xs text-gray-500">{alert.timestamp}</span>
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  )
}
