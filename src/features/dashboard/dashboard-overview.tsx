"use client";

import {
  Activity,
  AlertTriangle,
  Award,
  CheckCircle,
  Clock,
  Droplets,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Shield,
  Stethoscope,
  Target,
  Tractor,
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

  // GAqP Journey Modules - 5 key certification areas
  const [gaqpModules] = useState([
    {
      id: "farm-setup-basics",
      name: "Farm Setup Basics",
      description: "Essential foundation for your aquaculture operation",
      icon: Tractor,
      completedSteps: 8,
      totalSteps: 12,
      status: "in-progress" as const,
      progress: 67,
      color: "blue",
      bgColor: "from-blue-50/80 to-blue-100/40",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      barColor: "bg-blue-500",
      href: "/plan?module=farm-setup-basics",
    },
    {
      id: "pond-water-care",
      name: "Pond & Water Care",
      description: "Optimal water quality and pond management",
      icon: Droplets,
      completedSteps: 10,
      totalSteps: 10,
      status: "complete" as const,
      progress: 100,
      color: "green",
      bgColor: "from-green-50/80 to-green-100/40",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      barColor: "bg-green-500",
      href: "/plan?module=pond-water-care",
    },
    {
      id: "healthy-stock-sourcing",
      name: "Healthy Stock Sourcing",
      description: "Quality fingerlings and stocking practices",
      icon: HeartHandshake,
      completedSteps: 4,
      totalSteps: 8,
      status: "in-progress" as const,
      progress: 50,
      color: "orange",
      bgColor: "from-orange-50/80 to-orange-100/40",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      barColor: "bg-orange-500",
      href: "/plan?module=healthy-stock-sourcing",
    },
    {
      id: "farm-access-control",
      name: "Farm Access Control",
      description: "Biosecurity protocols and visitor management",
      icon: Shield,
      completedSteps: 6,
      totalSteps: 9,
      status: "in-progress" as const,
      progress: 67,
      color: "purple",
      bgColor: "from-purple-50/80 to-purple-100/40",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      barColor: "bg-purple-500",
      href: "/plan?module=farm-access-control",
    },
    {
      id: "disease-readiness",
      name: "Disease Readiness",
      description: "Prevention, monitoring, and response protocols",
      icon: Stethoscope,
      completedSteps: 2,
      totalSteps: 11,
      status: "in-progress" as const,
      progress: 18,
      color: "red",
      bgColor: "from-red-50/80 to-red-100/40",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      barColor: "bg-red-500",
      href: "/plan?module=disease-readiness",
    },
  ]);

  // Dynamic next actions with module context
  const [nextActions, setNextActions] = useState([
    {
      id: 1,
      priority: "critical",
      status: "pending",
      title: "Complete pond disinfection checklist",
      description:
        "Your pond preparation checklist is incomplete. Proper disinfection is critical for GAqP compliance and preventing disease outbreaks.",
      estimatedTime: "45 minutes",
      moduleId: "pond-water-care",
      moduleName: "Pond & Water Care",
      href: "/plan?task=pond-disinfection",
      completed: false,
    },
    {
      id: 2,
      priority: "high",
      status: "pending",
      title: "Update visitor log protocols",
      description:
        "Implement new biosecurity checklist for all farm visitors and delivery personnel to meet GAqP access control standards.",
      estimatedTime: "30 minutes",
      moduleId: "farm-access-control",
      moduleName: "Farm Access Control",
      href: "/plan?task=visitor-protocols",
      completed: false,
    },
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Pond Disinfection Overdue",
      description:
        "Critical GAqP task: Complete pond disinfection checklist by tomorrow to maintain compliance standards.",
      timestamp: "1 day overdue",
      href: "/plan?task=pond-disinfection",
      actionText: "Complete Now",
    },
    {
      id: 2,
      type: "positive",
      title: "Feed Management Module Completed",
      description:
        "Congratulations! You've completed all core tasks in the Feed Management module. Your compliance score increased by 15%.",
      timestamp: "2 hours ago",
      href: "/plan?module=feed-management&view=certificate",
      actionText: "View Certificate",
    },
    {
      id: 3,
      type: "opportunity",
      title: "Cost Savings Identified",
      description:
        "Based on your feed optimization practices, you could save ₹12,000 monthly by implementing recommended feeding schedules.",
      timestamp: "3 hours ago",
      href: "/plan?module=feed-management&view=savings",
      actionText: "View Details",
    },
    {
      id: 4,
      type: "info",
      title: "Phase 1 Nearing Completion",
      description:
        "You're 85% through Phase 1 of your GAqP journey. Only 2 more tasks to complete this phase.",
      timestamp: "1 day ago",
      href: "/progress",
      actionText: "View Progress",
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

  // Calculate overall journey progress
  const overallProgress = {
    totalSteps: gaqpModules.reduce((sum, module) => sum + module.totalSteps, 0),
    completedSteps: gaqpModules.reduce(
      (sum, module) => sum + module.completedSteps,
      0
    ),
    get percentage() {
      return Math.round((this.completedSteps / this.totalSteps) * 100);
    },
    get criticalSteps() {
      return nextActions.filter(action => action.priority === "critical")
        .length;
    },
    get pendingSteps() {
      return this.totalSteps - this.completedSteps;
    },
    get completedModules() {
      return gaqpModules.filter(module => module.status === "complete").length;
    },
  };

  // Journey-focused quick stats
  const quickStats = [
    {
      title: "GAqP Journey Progress",
      value: `${overallProgress.percentage}%`,
      change: `${overallProgress.completedSteps} of ${overallProgress.totalSteps} steps completed`,
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Award,
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
      icon: TrendingUp,
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
      {/* GAqP Journey Header */}
      <div className="space-y-4">
        {/* Main Journey Title */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Your GAqP Certification Journey
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back to {farmProfile.name}
            </p>
            <p className="text-sm text-gray-500">
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
              <Link href="">Update Farm Profile</Link>
            </Button>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-900">
                Overall Progress: {overallProgress.percentage}% Complete
              </h2>
              <p className="text-sm text-blue-700">
                {overallProgress.completedModules} of {gaqpModules.length}{" "}
                modules completed • You're on your way to a BFAR-certified farm!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {overallProgress.completedSteps}/{overallProgress.totalSteps}{" "}
                steps
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-4 w-full overflow-hidden rounded-full bg-blue-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${overallProgress.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card className={`${stat.borderColor} border-l-4`}>
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

      {/* GAqP Journey Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Your GAqP Modules
          </CardTitle>
          <CardDescription>
            Key areas to master for your GAqP certification journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gaqpModules.map(module => {
              return (
                <Link key={module.id} href={module.href}>
                  <div
                    className={`relative rounded-xl border-2 ${module.borderColor} bg-gradient-to-br ${module.bgColor} p-6`}
                  >
                    {/* Status Badge */}
                    <div className="absolute right-3 top-3 z-10 flex items-center">
                      {module.progress === 100 ? (
                        <div className="rounded-full bg-green-100 p-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ) : module.progress < 20 ? (
                        <div className="rounded-full bg-red-100 px-2 py-1">
                          <span className="whitespace-nowrap text-xs font-medium text-red-600">
                            Needs Attention
                          </span>
                        </div>
                      ) : (
                        <div className="rounded-full bg-blue-100 px-2 py-1">
                          <span className="whitespace-nowrap text-xs font-medium text-blue-600">
                            In Progress
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Module Content */}
                    <div className="mb-4 flex items-center space-x-3 pt-6">
                      <div className={`rounded-lg bg-white/80 p-3`}>
                        <module.icon
                          className={`h-6 w-6 ${module.textColor}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {module.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Info */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {module.completedSteps} of {module.totalSteps} steps
                      </div>
                      <div
                        className={`text-sm font-semibold ${module.textColor}`}
                      >
                        {module.progress}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full ${module.barColor}`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>

                    {/* Next Task Link */}
                    {module.progress < 20 &&
                      nextActions.find(
                        a => a.moduleId === module.id && !a.completed
                      ) && (
                        <button
                          type="button"
                          className="mt-4 w-full rounded-md bg-red-600 py-2 text-sm font-semibold text-white"
                          onClick={e => {
                            e.preventDefault();
                            const el = document.getElementById(
                              `action-hub-task-${nextActions.find(a => a.moduleId === module.id)?.id}`
                            );
                            if (el) {
                              el.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                            }
                          }}
                        >
                          Start Next Task
                        </button>
                      )}
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Hub */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Action Hub
          </CardTitle>
          <CardDescription>
            Priority tasks and progress summary for your GAqP certification
            journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Priority Actions */}
          <div className="space-y-4">
            {nextActions.slice(0, 2).map(action => (
              <div
                key={action.id}
                id={`action-hub-task-${action.id}`}
                className={`relative flex items-start rounded-lg border-2 p-4 ${
                  action.priority === "critical"
                    ? "border-red-200 bg-red-50/50"
                    : action.priority === "high"
                      ? "border-orange-200 bg-orange-50/50"
                      : "border-blue-200 bg-blue-50/50"
                } ${action.completed ? "opacity-60" : ""}`}
              >
                {/* Large Checkbox */}
                <div className="flex flex-col items-center justify-center pr-4 pt-1">
                  <input
                    type="checkbox"
                    checked={!!action.completed}
                    onChange={e => {
                      e.stopPropagation();
                      handleCompleteAction(action.id);
                    }}
                    className="h-7 w-7 rounded-lg border-2 border-green-400 accent-green-700"
                  />
                </div>
                {/* Card Content */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        action.priority === "critical"
                          ? "bg-red-100 text-red-800"
                          : action.priority === "high"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {action.priority === "critical" && (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      )}
                      {action.priority.toUpperCase()}
                    </span>
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {action.estimatedTime}
                    </span>
                  </div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {action.title}
                  </h4>
                  <p className="mb-2 text-sm text-gray-700">
                    {action.description}
                  </p>
                  {/* Module Context */}
                  <p className="mb-3 text-xs text-gray-500">
                    This action is part of your{" "}
                    <span className="font-medium">{action.moduleName}</span>{" "}
                    module
                  </p>
                  <Link
                    href={action.href}
                    className="text-xs font-medium text-blue-600"
                  >
                    View How-To Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="border-t pt-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              Journey Progress Summary
            </h4>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-lg font-bold text-blue-600">
                  {overallProgress.totalSteps}
                </div>
                <div className="text-xs text-blue-700">Total Steps</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="flex items-center justify-center text-lg font-bold text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  {overallProgress.completedSteps}
                </div>
                <div className="text-xs text-green-700">Completed</div>
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <div className="flex items-center justify-center text-lg font-bold text-red-600">
                  <AlertTriangle className="mr-1 h-4 w-4" />
                  {overallProgress.criticalSteps}
                </div>
                <div className="text-xs text-red-700">Critical</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <div className="text-lg font-bold text-gray-600">
                  {overallProgress.pendingSteps}
                </div>
                <div className="text-xs text-gray-700">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Updates - Minimal, Clean Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Your Journey Updates</CardTitle>
          <CardDescription>
            Recent progress, achievements, and important GAqP compliance updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Personal Greeting */}
          <div className="mb-6 text-lg font-semibold text-gray-900">
            Good evening, Juan!
          </div>

          {/* Urgent Actions */}
          <div className="mb-8">
            <h3 className="mb-4 text-base font-semibold text-red-600">
              Urgent Actions
            </h3>
            {alerts
              .filter(a => a.type === "critical")
              .map(alert => (
                <div
                  key={alert.id}
                  className="relative mb-4 flex items-start gap-3 rounded-lg bg-gradient-to-r from-red-50 to-red-100/40 p-4"
                >
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <span className="text-sm text-gray-600">
                        This task is {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="mb-4 text-base font-semibold text-green-700">
              Your Achievements
            </h3>
            {alerts
              .filter(a => a.type === "positive")
              .map(alert => (
                <div
                  key={alert.id}
                  className="relative mb-4 flex items-start gap-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100/40 p-4"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}

            {/* Cost Savings Card */}
            {alerts
              .filter(a => a.type === "opportunity")
              .map(alert => (
                <div
                  key={alert.id}
                  className="relative mb-4 flex items-start gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/40 p-4"
                >
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {alert.timestamp}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      ₱12,000
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* LikAI's Advice */}
          <div className="mb-8">
            <h3 className="mb-4 text-base font-semibold text-indigo-700">
              LikAI's Advice
            </h3>
            {alerts
              .filter(a => a.type === "info")
              .map(alert => (
                <div
                  key={alert.id}
                  className="relative mb-4 flex items-start gap-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100/40 p-4"
                >
                  <div className="flex-shrink-0">
                    <Stethoscope className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/reports">View All Updates</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
