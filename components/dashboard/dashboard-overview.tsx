"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardOverview() {
  // Dynamic farm profile data - this would come from your backend/API
  const [farmProfile, setFarmProfile] = useState({
    name: "Sunrise Shrimp Farm",
    type: "Intensive Shrimp Culture",
    species: "Litopenaeus vannamei",
    size: "5 hectares",
    location: "Bataan, Philippines",
    currentCycle: 3,
    riskLevel: "low" as const,
    completedTasks: 12,
    totalTasks: 18,
    cycleDay: 45,
    maxCycleDays: 70,
    expectedHarvest: "2024-02-15",
    overallBiosecurityScore: 86,
  });

  // Dynamic GAqP category data - in a real app, this would come from your backend
  const [gaqpCategories] = useState([
    {
      id: "pond-water",
      name: "Pond & Water Care",
      description: "How well you prepare your ponds",
      emoji: "💧",
      score: 92,
      level: "Excellent",
      rating: "5/5",
      color: "green",
      bgColor: "from-green-50/80 to-green-50/40",
      borderColor: "border-green-200/50",
      textColor: "text-green-700",
      barColor: "bg-green-500",
      href: "/plan?category=pond-water",
    },
    {
      id: "access-control",
      name: "Farm Access Control",
      description: "Who can enter your farm",
      emoji: "🚪",
      score: 78,
      level: "Good",
      rating: "4/5",
      color: "blue",
      bgColor: "from-blue-50/80 to-blue-50/40",
      borderColor: "border-blue-200/50",
      textColor: "text-blue-700",
      barColor: "bg-blue-500",
      href: "/plan?category=access-control",
    },
    {
      id: "stock-sourcing",
      name: "Stock Sourcing",
      description: "Baby shrimp quality",
      emoji: "🦐",
      score: 60,
      level: "Needs Work",
      rating: "2/5",
      color: "yellow",
      bgColor: "from-yellow-50/80 to-yellow-50/40",
      borderColor: "border-yellow-200/50",
      textColor: "text-yellow-700",
      barColor: "bg-yellow-500",
      href: "/plan?category=stock-sourcing",
    },
    {
      id: "feed-management",
      name: "Feed Management",
      description: "Quality & schedule",
      emoji: "🌾",
      score: 85,
      level: "Good",
      rating: "4/5",
      color: "green",
      bgColor: "from-green-50/80 to-green-50/40",
      borderColor: "border-green-200/50",
      textColor: "text-green-700",
      barColor: "bg-green-500",
      href: "/plan?category=feed-management",
    },
  ]);

  // Dynamic next actions and alerts
  const [nextActions, setNextActions] = useState([
    {
      id: 1,
      priority: "critical",
      status: "pending",
      title: "Check water quality in Pond 3",
      description:
        "pH levels trending high (8.2). Test immediately and adjust to prevent stress on shrimp.",
      estimatedTime: "15 minutes",
      href: "/plan?task=water-quality-check",
      completed: false,
    },
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Temperature variance detected",
      description: "Monitor Pond 2 closely today",
      timestamp: "2 hours ago",
      href: "/reports?alert=temperature",
    },
  ]);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random updates to show dynamic nature
      setFarmProfile(prev => ({
        ...prev,
        cycleDay: prev.cycleDay + Math.random() > 0.95 ? 1 : 0, // Occasional day advancement
        overallBiosecurityScore: Math.max(
          75,
          Math.min(95, prev.overallBiosecurityScore + (Math.random() - 0.5) * 2)
        ),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Dynamic quick stats derived from farm data
  const quickStats = [
    {
      title: "Overall Biosecurity Score",
      value: `${Math.round(farmProfile.overallBiosecurityScore)}/100`,
      change:
        farmProfile.overallBiosecurityScore > 85
          ? "Excellent status"
          : "Good progress",
      trend: "up",
      color:
        farmProfile.overallBiosecurityScore > 85
          ? "text-green-600"
          : "text-blue-600",
      bgColor:
        farmProfile.overallBiosecurityScore > 85 ? "bg-green-50" : "bg-blue-50",
      borderColor:
        farmProfile.overallBiosecurityScore > 85
          ? "border-green-200"
          : "border-blue-200",
      icon: Shield,
      href: "/risk",
    },
    {
      title: "Plan Progress",
      value: `${Math.round((farmProfile.completedTasks / farmProfile.totalTasks) * 100)}%`,
      change: `${farmProfile.completedTasks} of ${farmProfile.totalTasks} tasks done`,
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Target,
      href: "/plan",
    },
    {
      title: "Cycle Progress",
      value: `Day ${farmProfile.cycleDay}`,
      change: `${farmProfile.maxCycleDays - farmProfile.cycleDay} days to harvest`,
      trend: "stable",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Activity,
      href: "/plan",
    },
    {
      title: "Projected Savings",
      value: "₱12,500",
      change: "This cycle",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: DollarSign,
      href: "/resources",
    },
  ];

  // Handle action completion
  const handleCompleteAction = (actionId: number) => {
    setNextActions(prev =>
      prev.map(action =>
        action.id === actionId
          ? { ...action, status: "completed", completed: true }
          : action
      )
    );

    // Update completed tasks count
    setFarmProfile(prev => ({
      ...prev,
      completedTasks: prev.completedTasks + 1,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Main Dashboard Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back to {farmProfile.name}
          </h1>
          <p className="text-gray-600">
            {farmProfile.type} • {farmProfile.species} • Day{" "}
            {farmProfile.cycleDay} of {farmProfile.maxCycleDays}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/coach">
              <MessageCircle className="mr-2 h-4 w-4" />
              Ask AI Coach
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/assessment">Take Assessment</Link>
          </Button>
        </div>
      </div>

      {/* Overall Biosecurity Score Card */}
      <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <div className="mb-2 text-sm font-medium text-gray-600">
            Overall Biosecurity Score
          </div>
          <div className="mb-2 text-4xl font-bold text-green-600">
            {Math.round(farmProfile.overallBiosecurityScore)}%
          </div>
          <div className="mb-4 text-sm font-medium text-green-700">
            {farmProfile.overallBiosecurityScore > 85
              ? "Excellent! You're building a resilient farm."
              : "Good progress! Keep improving your biosecurity."}
          </div>

          {/* Quick Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/60 p-3">
              <div className="text-sm text-gray-600">Current Cycle</div>
              <div className="text-lg font-semibold text-blue-600">
                Day {farmProfile.cycleDay}/{farmProfile.maxCycleDays}
              </div>
            </div>
            <div className="rounded-lg bg-white/60 p-3">
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className="text-lg font-semibold capitalize text-green-600">
                {farmProfile.riskLevel}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card
                className={`${stat.borderColor} cursor-pointer border-l-4 transition-all hover:scale-[1.02] hover:shadow-md`}
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

      {/* GAqP Categories Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Biosecurity Health Snapshot
          </CardTitle>
          <CardDescription>
            Your GAqP (Good Aquaculture Practice) compliance across key areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {gaqpCategories.map(category => (
              <Link key={category.id} href={category.href} className="group">
                <div
                  className={`rounded-lg border ${category.borderColor} bg-gradient-to-br ${category.bgColor} p-4 transition-all hover:scale-[1.02] hover:shadow-md`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl" aria-hidden="true">
                        {category.emoji}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${category.textColor}`}
                      >
                        {category.level} ({category.rating})
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.score}% complete
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${category.barColor} transition-all duration-300`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Actions and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Your Next Actions
            </CardTitle>
            <CardDescription>
              Priority tasks to keep your farm running smoothly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextActions.map(action => (
                <div
                  key={action.id}
                  className={`rounded-lg border-l-4 p-4 ${
                    action.priority === "critical"
                      ? "border-red-500 bg-red-50"
                      : action.priority === "high"
                        ? "border-orange-500 bg-orange-50"
                        : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium text-white ${
                          action.priority === "critical"
                            ? "bg-red-500"
                            : action.priority === "high"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {action.priority.toUpperCase()}
                      </span>
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {action.estimatedTime}
                      </span>
                    </div>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        action.completed
                          ? "bg-green-100 text-green-700"
                          : action.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {action.completed ? "Completed" : action.status}
                    </span>
                  </div>

                  <h4 className="mb-1 font-semibold text-gray-900">
                    {action.title}
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    {action.description}
                  </p>

                  <div className="flex space-x-2">
                    {!action.completed && (
                      <Button
                        onClick={() => handleCompleteAction(action.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={action.href}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Alerts & Updates
            </CardTitle>
            <CardDescription>
              Important notifications and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map(alert => (
                <Link key={alert.id} href={alert.href} className="group">
                  <div className="flex items-start space-x-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 transition-colors group-hover:bg-yellow-100">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500">
                      <span className="text-xs font-bold text-white">!</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-yellow-800 group-hover:text-yellow-900">
                        {alert.title}
                      </h4>
                      <p className="mt-1 text-sm text-yellow-700">
                        {alert.description}
                      </p>
                      <p className="mt-2 text-xs text-yellow-600">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Financial Impact */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="mb-2 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">
                    Financial Impact
                  </h4>
                </div>
                <p className="mb-1 text-sm text-blue-700">
                  Projected savings from improved biosecurity
                </p>
                <p className="text-xl font-bold text-blue-600">
                  ₱12,500 this cycle
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  Based on reduced mortality and feed efficiency
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
