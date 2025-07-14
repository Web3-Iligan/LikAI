"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link for navigation
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  Droplets,
  Target,
  Zap,
  ArrowRight,
  BarChart3,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import RiskTrendChart from "@/components/reports/risk-trend-chart";
import TaskCompletionChart from "@/components/reports/task-completion-chart";

export function DashboardOverview() {
  const [showImprovements, setShowImprovements] = useState(false);
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
  });

  const [criticalAlerts] = useState([
    {
      id: 1,
      type: "weather",
      title: "Typhoon Alert - Immediate Action Required",
      message:
        "Heavy rains expected in 6 hours. Check pond dykes and drainage systems immediately.",
      priority: "critical",
      timestamp: "2 hours ago",
      action: "View Emergency Protocol",
      href: "/plan", // Link to the plan page
    },
    {
      id: 2,
      type: "neighbor",
      title: "Disease Outbreak Nearby",
      message:
        "WSSV detected 2km away. Enhanced biosecurity protocols activated.",
      priority: "high",
      timestamp: "6 hours ago",
      action: "Review Biosecurity Plan",
      href: "/plan", // Link to the plan page
    },
  ]);

  // Health assessment data
  const healthMetrics = [
    {
      label: "Water Quality",
      status: "Excellent",
      score: 98,
      color: "text-green-600",
      improvements: [],
    },
    {
      label: "Stock Health",
      status: "Good",
      score: 85,
      color: "text-yellow-600",
      improvements: [
        "Increase feeding frequency during peak growth phase",
        "Monitor dissolved oxygen levels more frequently",
        "Consider probiotic supplementation",
      ],
    },
    {
      label: "Biosecurity Status",
      status: "Excellent",
      score: 95,
      color: "text-green-600",
      improvements: [],
    },
    {
      label: "Equipment Status",
      status: "Good",
      score: 88,
      color: "text-yellow-600",
      improvements: [
        "Schedule maintenance for aerator #3",
        "Calibrate pH monitoring sensors",
        "Replace backup generator filters",
      ],
    },
  ];

  const overallScore = Math.round(
    healthMetrics.reduce((acc, metric) => acc + metric.score, 0) /
      healthMetrics.length
  );
  const overallStatus =
    overallScore >= 95
      ? "Excellent"
      : overallScore >= 85
        ? "Good"
        : overallScore >= 70
          ? "Fair"
          : "Poor";
  const overallColor =
    overallScore >= 95
      ? "text-green-600"
      : overallScore >= 85
        ? "text-yellow-600"
        : "text-orange-600";

  const allImprovements = healthMetrics.filter(
    metric => metric.improvements.length > 0
  );

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
      href: "/plan", // Link to plan page
    },
    {
      title: "Cycle Progress",
      value: "Day 45",
      change: "25 days to harvest",
      trend: "stable",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Activity,
      href: "/plan",
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
  ]);

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
      href: "/reports",
    },
  ]);

  const riskTrendData = [
    { date: "Mon", value: 45 },
    { date: "Tue", value: 52 },
    { date: "Wed", value: 48 },
    { date: "Thu", value: 61 },
    { date: "Fri", value: 58 },
    { date: "Sat", value: 65 },
    { date: "Sun", value: 68 },
  ];

  const taskCompletionData = [
    { label: "2 Weeks Ago", value: 67 },
    { label: "Last Week", value: 75 },
    { label: "This Week", value: 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3">
          {criticalAlerts.map(alert => (
            <Alert
              key={alert.id}
              className={`border-l-4 ${
                alert.priority === "critical"
                  ? "border-red-200 border-l-red-500 bg-red-50"
                  : "border-orange-200 border-l-orange-500 bg-orange-50"
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <Badge
                  variant={
                    alert.priority === "critical" ? "destructive" : "default"
                  }
                >
                  {alert.priority.toUpperCase()}
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-3">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {alert.timestamp}
                  </span>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link key={index} href={stat.href} passHref>
              <Card
                className={`${stat.borderColor} cursor-pointer border-l-4 transition-shadow hover:shadow-md`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <div className={`rounded-full p-3 ${stat.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Content Sections (formerly tabs) */}
      <div className="space-y-6">
        {/* Risk Trend Analysis Graph - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Risk Trend Analysis
            </CardTitle>
            <CardDescription>
              7-day risk level progression with interactive insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskTrendChart data={riskTrendData} />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                <p className="text-xl font-bold text-blue-600">
                  {Math.max(...riskTrendData.map(d => d.value))}
                </p>
                <p className="text-sm text-blue-700">Peak Risk Level</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                <p className="text-xl font-bold text-green-600">
                  {Math.min(...riskTrendData.map(d => d.value))}
                </p>
                <p className="text-sm text-green-700">Lowest Risk Level</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-center">
                <p className="text-xl font-bold text-purple-600">
                  {riskTrendData[riskTrendData.length - 1]?.value >
                  riskTrendData[0]?.value
                    ? "+"
                    : ""}
                  {(
                    riskTrendData[riskTrendData.length - 1]?.value -
                      riskTrendData[0]?.value || 0
                  ).toFixed(1)}
                </p>
                <p className="text-sm text-purple-700">7-Day Change</p>
              </div>
            </div>
            <Link href="/reports" passHref>
              <Button
                variant="outline"
                className="mt-4 w-full bg-transparent"
                size="sm"
              >
                View Full Reports
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Two Column Layout for other content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Farm Health Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Farm Health Sentiment
              </CardTitle>
              <CardDescription>
                Overall biosecurity and health assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ...existing code... */}
              {/* Circular Progress */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                  <svg
                    className="h-36 w-36 -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#f3f4f6"
                      strokeWidth="6"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke={
                        overallScore >= 95
                          ? "#10b981"
                          : overallScore >= 85
                            ? "#f59e0b"
                            : "#ef4444"
                      }
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${overallScore * 2.64} ${100 * 2.64}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className={`h-8 w-8 ${overallScore >= 95 ? "bg-green-500" : overallScore >= 85 ? "bg-yellow-500" : "bg-red-500"} mb-2 flex items-center justify-center rounded-full`}
                    >
                      {overallScore >= 95 ? (
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${overallColor}`}>
                      {overallStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="mb-2 text-4xl font-bold text-gray-900">
                    {overallScore}%
                  </div>
                  <div className="text-sm text-gray-600">
                    of parameters within optimal range
                  </div>
                </div>
              </div>

              {/* Status Details */}
              <div className="space-y-3 border-t pt-4">
                {healthMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {metric.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${metric.color}`}>
                        {metric.status}
                      </span>
                      {metric.improvements.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowImprovements(!showImprovements)}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-600">
                    Current Cycle
                  </span>
                  <span className="text-sm text-gray-800">
                    Day {farmProfile.cycleDay} of 70
                  </span>
                </div>
              </div>

              {/* Improvement Areas */}
              {showImprovements && allImprovements.length > 0 && (
                <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <h4 className="text-sm font-semibold text-yellow-800">
                      Areas for Improvement
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {allImprovements.map((metric, index) => (
                      <div key={index}>
                        <h5 className="mb-1 text-sm font-medium text-yellow-800">
                          {metric.label}
                        </h5>
                        <ul className="space-y-1">
                          {metric.improvements.map((improvement, impIndex) => (
                            <li
                              key={impIndex}
                              className="flex items-start gap-1 text-xs text-yellow-700"
                            >
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-yellow-600"></span>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    asChild
                  >
                    <Link href="/plan">
                      View Action Plan
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your farm data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <h4 className="mb-1 text-sm font-medium text-blue-900">
                    Weather Impact Analysis
                  </h4>
                  <p className="text-xs text-blue-800">
                    Based on the approaching typhoon, your farm has a 75% risk
                    of pond overflow. Prioritizing dyke inspection could prevent
                    up to ₱200,000 in potential losses.
                  </p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <h4 className="mb-1 text-sm font-medium text-green-900">
                    Cost Optimization Opportunity
                  </h4>
                  <p className="text-xs text-green-800">
                    Implementing solar water disinfection could reduce your
                    water treatment costs by 40% while maintaining 85%
                    effectiveness compared to your current method.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <h4 className="mb-1 text-sm font-medium text-orange-900">
                    Biosecurity Gap Detected
                  </h4>
                  <p className="text-xs text-orange-800">
                    Your visitor protocol compliance is at 60%. Enhancing this
                    to 90% could reduce disease introduction risk by an
                    additional 25%.
                  </p>
                </div>
              </div>
              <Link href="/coach" passHref>
                <Button
                  variant="outline"
                  className="mt-4 w-full bg-transparent"
                  size="sm"
                >
                  Ask AI Coach for more insights
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity - Full Width at Bottom */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentActivities.map(activity => {
                const IconComponent = activity.icon;
                return (
                  <Link key={activity.id} href={activity.href} passHref>
                    <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                      <div className={`rounded-full bg-gray-100 p-2`}>
                        <IconComponent
                          className={`h-4 w-4 ${activity.iconColor}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {activity.description}
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link href="/reports" passHref>
              <Button
                variant="outline"
                className="mt-4 w-full bg-transparent"
                size="sm"
              >
                View All Activities
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
