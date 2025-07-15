"use client";

import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Droplets,
  Shield,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { HowToGuideView } from "@/components/shared/how-to-guide-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";

// Helper to map categories to Lucide icons
const categoryIcons: { [key: string]: any } = {
  Infrastructure: Building,
  "Access Control": Shield,
  "Water Management": Droplets,
  "Human Resources": Users,
  "Feed Management": Truck,
  "Pond Management": Droplets,
  "Equipment Management": Wrench,
  "Waste Management": AlertTriangle,
  "Animal Health": Activity,
};

interface BiosecurityTask {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  category: string;
  estimatedCost: string;
  timeframe: string;
  adaptationReason?: string;
  icon?: any;
}

interface BiosecurityPlanProps {
  farmProfile: any;
}

export function BiosecurityPlan({ farmProfile }: BiosecurityPlanProps) {
  // Suppress unused parameter warning - farmProfile will be used for future enhancements
  void farmProfile;
  const [selectedTaskForGuide, setSelectedTaskForGuide] =
    useState<BiosecurityTask | null>(null);
  const [aiGeneratedTasks, setAiGeneratedTasks] = useState<
    BiosecurityTask[] | null
  >(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Default tasks if no AI plan is generated
  const defaultTasks: BiosecurityTask[] = [
    {
      id: "1",
      title: "Check water quality in Pond 3",
      description:
        "Test dissolved oxygen levels immediately - readings show concern",
      priority: "critical",
      status: "in-progress",
      category: "Water Management",
      estimatedCost: "₱0 (existing equipment)",
      timeframe: "Started 5 min ago",
      adaptationReason: "Critical oxygen depletion detected",
      icon: Droplets,
    },
    {
      id: "2",
      title: "Turn on backup aerators",
      description: "Activate all 3 backup aerators to increase oxygen",
      priority: "critical",
      status: "completed",
      category: "Water Management",
      estimatedCost: "₱0",
      timeframe: "Completed 15 min ago",
      icon: Zap,
    },
    {
      id: "3",
      title: "Monitor water for 2 hours",
      description:
        "Check dissolved oxygen every 30 minutes - target: above 5mg/L",
      priority: "high",
      status: "pending",
      category: "Water Management",
      estimatedCost: "₱0",
      timeframe: "Starts after step 1",
      icon: Clock,
    },
    {
      id: "4",
      title: "Inspect pond dykes for damage",
      description:
        "Check all pond walls for cracks due to heavy rains forecast",
      priority: "high",
      status: "pending",
      category: "Infrastructure",
      estimatedCost: "₱200-500",
      timeframe: "Today before 5pm",
      adaptationReason: "Prioritized due to typhoon alert",
      icon: Building,
    },
    {
      id: "5",
      title: "Set up visitor disinfection",
      description: "Prepare footbath and disinfection station at farm entrance",
      priority: "medium",
      status: "pending",
      category: "Access Control",
      estimatedCost: "₱150-300",
      timeframe: "Tomorrow",
      icon: Shield,
    },
    {
      id: "6",
      title: "Check pond water temperature",
      description:
        "Monitor temperature levels in all ponds - ideal range 28-32°C",
      priority: "medium",
      status: "pending",
      category: "Water Management",
      estimatedCost: "₱0 (existing equipment)",
      timeframe: "Tomorrow morning",
      icon: Droplets,
    },
    {
      id: "7",
      title: "Inspect feed storage area",
      description:
        "Check for moisture, pests, and proper ventilation in feed storage",
      priority: "high",
      status: "pending",
      category: "Feed Management",
      estimatedCost: "₱100-200",
      timeframe: "This afternoon",
      icon: Truck,
    },
    {
      id: "8",
      title: "Calibrate water testing equipment",
      description: "Ensure DO meters and pH testers are properly calibrated",
      priority: "medium",
      status: "pending",
      category: "Equipment Management",
      estimatedCost: "₱50-100",
      timeframe: "End of week",
      icon: Wrench,
    },
  ];

  // Effect to load AI-generated plan from localStorage on component mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("aiGeneratedPlan");
    if (storedPlan) {
      try {
        const parsedPlan: BiosecurityTask[] = JSON.parse(storedPlan);
        const tasksWithDefaults = parsedPlan.map((task, index) => ({
          ...task,
          id: task.id || `ai-task-${index}`,
          status:
            (task.status as "completed" | "in-progress" | "pending") ||
            "pending",
        }));
        setAiGeneratedTasks(tasksWithDefaults);
        localStorage.removeItem("aiGeneratedPlan");
      } catch (error) {
        console.error("Failed to parse AI generated plan:", error);
        setAiGeneratedTasks(null);
      }
    }
  }, []);

  const currentTasks = aiGeneratedTasks || defaultTasks;

  // Pagination logic
  const totalPages = Math.ceil(currentTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentPageTasks = currentTasks.slice(startIndex, endIndex);

  const toggleTaskStatus = (taskId: string) => {
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        const newStatus: "completed" | "in-progress" | "pending" =
          task.status === "completed" ? "pending" : "completed";
        return { ...task, status: newStatus };
      }
      return task;
    });
    if (aiGeneratedTasks) {
      setAiGeneratedTasks(updatedTasks);
    }

    // Reset to page 1 when task status changes to keep user oriented
    setCurrentPage(1);
  };

  const completedTasksCount = currentTasks.filter(
    task => task.status === "completed"
  ).length;
  const progressPercentage = Math.round(
    (completedTasksCount / currentTasks.length) * 100
  );

  // Determine if plan is urgent based on critical priority tasks
  const hasUrgentTasks = currentTasks.some(
    task => task.priority === "critical"
  );

  // Get current step (first non-completed task)
  const currentStep = currentTasks.find(task => task.status !== "completed");
  const currentStepNumber = currentStep
    ? currentTasks.findIndex(task => task.id === currentStep.id) + 1
    : 1;

  if (selectedTaskForGuide) {
    const taskWithIcon = {
      ...selectedTaskForGuide,
      icon:
        selectedTaskForGuide.icon ||
        categoryIcons[selectedTaskForGuide.category] ||
        Zap,
    };
    return (
      <HowToGuideView
        task={taskWithIcon}
        onBack={() => setSelectedTaskForGuide(null)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Critical Alert Banner */}
      {hasUrgentTasks && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-3 h-5 w-5 text-red-600" />
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Critical Actions Required
              </h3>
              <p className="text-sm text-red-700">
                {currentTasks.filter(t => t.priority === "critical").length}{" "}
                critical step(s) need immediate attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header - Clean and minimal */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Action Plan</h1>
            {hasUrgentTasks && (
              <Badge variant="destructive" className="px-3 py-1">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Urgent
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-2xl font-bold text-gray-900">
              {progressPercentage}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Progress
              value={progressPercentage}
              className="h-3 [&>div]:bg-green-500"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {completedTasksCount} of {currentTasks.length} steps completed
              </span>
              <span className="text-sm font-medium text-green-600">
                {progressPercentage > 0
                  ? "Keep up the good work! 🌱"
                  : "Let's get started! 💪"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 lg:justify-end">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                {currentTasks.filter(t => t.priority === "critical").length}
              </div>
              <div className="text-xs text-gray-500">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentTasks.filter(t => t.status === "in-progress").length}
              </div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">
                {currentTasks.filter(t => t.status === "pending").length}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column - Step List */}
        <div className="lg:col-span-3">
          <div className="border bg-white shadow-sm">
            <div className="border-b bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Action Steps
              </h2>
            </div>

            <div className="divide-y">
              {currentPageTasks.map((task, index) => {
                const stepNumber = startIndex + index + 1; // Adjust step number for pagination
                const isCompleted = task.status === "completed";
                const isInProgress = task.status === "in-progress";
                const isCritical = task.priority === "critical";

                return (
                  <div
                    key={task.id}
                    className={`relative flex items-start gap-6 p-6 transition-all hover:bg-gray-50 ${
                      isCritical
                        ? "border-l-4 border-l-red-500 bg-red-50/30"
                        : task.priority === "high"
                          ? "border-l-4 border-l-orange-400"
                          : ""
                    } ${
                      isInProgress ? "bg-blue-50/20 ring-2 ring-blue-200" : ""
                    }`}
                  >
                    {/* NEXT UP Banner for current step */}
                    {isInProgress && (
                      <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                        NEXT UP
                      </div>
                    )}

                    {isCritical && (
                      <div className="absolute right-4 top-4">
                        <div className="flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                        </div>
                      </div>
                    )}

                    {/* Large Priority-based Step Number */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center text-lg font-bold shadow-md ${
                        isCompleted
                          ? "rounded-full bg-green-500 text-white"
                          : isInProgress
                            ? "rounded-full bg-blue-500 text-white"
                            : isCritical
                              ? "rounded-full bg-red-500 text-white"
                              : task.priority === "high"
                                ? "rounded-full bg-orange-400 text-white"
                                : "rounded-full bg-gray-300 text-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : isCritical ? (
                        "!"
                      ) : (
                        stepNumber
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          {/* Title and Priority Badges */}
                          <div className="mb-3 flex items-start gap-3">
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                {task.title}
                              </h3>
                              {isCritical && (
                                <div className="mb-2 text-sm font-medium text-red-700">
                                  🚨 Urgent Action Required
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {isCritical && (
                                <Badge className="bg-red-600 text-xs font-semibold text-white">
                                  CRITICAL
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className={`text-xs font-medium ${
                                  isCompleted
                                    ? "border-green-200 bg-green-100 text-green-800"
                                    : isInProgress
                                      ? "border-blue-200 bg-blue-100 text-blue-800"
                                      : "border-gray-200 bg-gray-100 text-gray-700"
                                }`}
                              >
                                {isCompleted
                                  ? "✅ Completed"
                                  : isInProgress
                                    ? "⏳ In Progress"
                                    : "⏸ Pending"}
                              </Badge>
                            </div>
                          </div>

                          <p className="mb-4 leading-relaxed text-gray-700">
                            {task.description}
                          </p>

                          {/* Simplified Key Details with Icons */}
                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {task.category === "Water Management"
                                  ? "💧"
                                  : task.category === "Infrastructure"
                                    ? "🏗️"
                                    : task.category === "Access Control"
                                      ? "🔒"
                                      : task.category === "Human Resources"
                                        ? "👥"
                                        : task.category === "Feed Management"
                                          ? "🐟"
                                          : task.category ===
                                              "Equipment Management"
                                            ? "⚙️"
                                            : task.category ===
                                                "Waste Management"
                                              ? "♻️"
                                              : task.category ===
                                                  "Animal Health"
                                                ? "🐠"
                                                : "📋"}
                              </span>
                              <span className="text-gray-600">
                                {task.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">⏰</span>
                              <span className="text-gray-600">
                                {task.timeframe}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">💰</span>
                              <span className="text-gray-600">
                                {task.estimatedCost}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="ml-4 flex flex-col gap-2">
                          {isInProgress && (
                            <Button
                              className="bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                              onClick={() => toggleTaskStatus(task.id)}
                            >
                              ✅ Mark Complete
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => setSelectedTaskForGuide(task)}
                          >
                            ❓ Get Help
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t bg-gray-50 p-6">
                  <Pagination>
                    <PaginationContent>
                      {/* Previous Button */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        pageNum => {
                          // Show first page, last page, current page, and pages around current
                          const showPage =
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 &&
                              pageNum <= currentPage + 1);

                          const showEllipsis =
                            (pageNum === currentPage - 2 && currentPage > 3) ||
                            (pageNum === currentPage + 2 &&
                              currentPage < totalPages - 2);

                          if (showEllipsis) {
                            return (
                              <PaginationItem key={`ellipsis-${pageNum}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }

                          if (!showPage) return null;

                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={e => {
                                  e.preventDefault();
                                  setCurrentPage(pageNum);
                                }}
                                isActive={currentPage === pageNum}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      {/* Next Button */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>

                  {/* Page info */}
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, currentTasks.length)} of{" "}
                    {currentTasks.length} tasks
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Current Step */}
          {currentStep ? (
            <div className="border bg-white shadow-sm">
              <div className="border-b bg-blue-50 px-4 py-3">
                <h3 className="font-medium text-blue-800">🎯 What's Next?</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <div className="mb-2 text-sm text-gray-500">
                    Step {currentStepNumber} of {currentTasks.length}
                  </div>
                  <div className="text-lg font-semibold leading-tight text-gray-900">
                    {currentStep.title}
                  </div>
                  {currentStep.priority === "critical" && (
                    <div className="mt-2 text-sm font-medium text-red-700">
                      ⚠️ Urgent - Do this first!
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 py-3 text-base font-semibold text-white hover:bg-green-700"
                    onClick={() => toggleTaskStatus(currentStep.id)}
                  >
                    ✅ I Completed This Step
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-blue-200 py-2 font-medium text-blue-600 hover:bg-blue-50"
                    onClick={() => setSelectedTaskForGuide(currentStep)}
                  >
                    💬 Get Help With This Step
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border bg-white shadow-sm">
              <div className="p-6 text-center">
                <div className="mb-4">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
                </div>
                <div className="mb-2 text-lg font-semibold text-gray-900">
                  🎉 All Steps Complete!
                </div>
                <div className="text-gray-600">
                  Your farm is well protected. Great work! 🌟
                </div>
              </div>
            </div>
          )}

          {/* Progress Summary */}
          <div className="border bg-white shadow-sm">
            <div className="border-b bg-gray-50 px-4 py-3">
              <h3 className="font-medium text-gray-900">Progress</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Steps</span>
                  <span className="font-medium">{currentTasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed</span>
                  <span className="font-medium text-green-600">
                    {completedTasksCount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>
                  <span className="font-medium text-gray-600">
                    {currentTasks.length - completedTasksCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="border bg-white shadow-sm">
            <div className="border-b bg-gray-50 px-4 py-3">
              <h3 className="font-medium text-gray-900">📊 Quick Overview</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚨</span>
                    <span className="text-sm font-medium text-red-800">
                      Critical
                    </span>
                  </div>
                  <span className="text-xl font-bold text-red-600">
                    {currentTasks.filter(t => t.priority === "critical").length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏳</span>
                    <span className="text-sm font-medium text-blue-800">
                      Active
                    </span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    {
                      currentTasks.filter(t => t.status === "in-progress")
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏸️</span>
                    <span className="text-sm font-medium text-gray-700">
                      Pending
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-600">
                    {currentTasks.filter(t => t.status === "pending").length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Visual Guide */}
          {hasUrgentTasks && (
            <div className="border bg-white shadow-sm">
              <div className="border-b bg-red-50 px-4 py-3">
                <h3 className="font-medium text-red-800">🚨 Critical Steps</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                      <span className="text-sm font-bold text-white">!</span>
                    </div>
                    <span className="text-sm text-gray-700">
                      Red circles mean urgent
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-700">
                      Blinking = needs action now
                    </span>
                  </div>
                  <div className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    💡 <strong>Tip:</strong> Always do critical steps first to
                    protect your farm!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
