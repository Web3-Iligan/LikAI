"use client";

import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Building,
  CheckCircle,
  ChevronDown,
  ChevronUp,
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
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [aiGeneratedTasks, setAiGeneratedTasks] = useState<
    BiosecurityTask[] | null
  >(null);

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
            <Progress value={progressPercentage} className="h-2" />
            <div className="mt-2 text-sm text-gray-600">
              {completedTasksCount} of {currentTasks.length} steps completed
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
              {currentTasks
                .slice(0, showAllSteps ? currentTasks.length : 5)
                .map((task, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = task.status === "completed";
                  const isInProgress = task.status === "in-progress";
                  const isCritical = task.priority === "critical";

                  return (
                    <div
                      key={task.id}
                      className={`relative flex items-start gap-4 p-6 hover:bg-gray-50 ${
                        isCritical ? "border-l-4 border-l-red-500" : ""
                      }`}
                    >
                      {isCritical && (
                        <div className="absolute right-4 top-4">
                          <div className="flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                          </div>
                        </div>
                      )}
                      {/* Step Number */}
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center text-sm font-semibold ${
                          isCompleted
                            ? "rounded-full bg-green-500 text-white"
                            : isInProgress
                              ? "rounded-full bg-blue-500 text-white"
                              : isCritical
                                ? "rounded-full bg-red-500 text-white"
                                : "rounded-full bg-gray-200 text-gray-700"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          stepNumber
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="font-medium text-gray-900">
                                {task.title}
                              </h3>
                              {isCritical && (
                                <Badge className="bg-red-600 text-xs font-medium text-white">
                                  CRITICAL
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className={`px-2 py-1 text-xs ${
                                  isCompleted
                                    ? "border-green-200 bg-green-100 text-green-700"
                                    : isInProgress
                                      ? "border-blue-200 bg-blue-100 text-blue-700"
                                      : "border-gray-200 bg-gray-100 text-gray-600"
                                }`}
                              >
                                {isCompleted
                                  ? "Completed"
                                  : isInProgress
                                    ? "In Progress"
                                    : "Pending"}
                              </Badge>
                            </div>

                            <p className="mb-4 text-gray-600">
                              {task.description}
                            </p>

                            {/* Task Details */}
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div className="flex flex-col">
                                <span className="mb-1 text-xs font-medium text-gray-500">
                                  PRIORITY
                                </span>
                                <span
                                  className={`font-medium ${
                                    isCritical
                                      ? "font-bold text-red-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="mb-1 text-xs font-medium text-gray-500">
                                  CATEGORY
                                </span>
                                <span className="font-medium text-gray-900">
                                  {task.category}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="mb-1 text-xs font-medium text-gray-500">
                                  TIMELINE
                                </span>
                                <span className="font-medium text-gray-900">
                                  {task.timeframe}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="mb-1 text-xs font-medium text-gray-500">
                                  EST. COST
                                </span>
                                <span className="font-medium text-gray-900">
                                  {task.estimatedCost}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => setSelectedTaskForGuide(task)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Show More/Less */}
              {currentTasks.length > 5 && (
                <div className="border-t bg-gray-50 p-6 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAllSteps(!showAllSteps)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    {showAllSteps ? (
                      <>
                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show {currentTasks.length - 5} More{" "}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
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
              <div className="border-b bg-gray-50 px-4 py-3">
                <h3 className="font-medium text-gray-900">Current Step</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <div className="mb-1 text-sm text-gray-500">
                    Step {currentStepNumber}
                  </div>
                  <div className="font-medium text-gray-900">
                    {currentStep.title}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-600 font-medium text-white hover:bg-blue-700"
                    onClick={() => toggleTaskStatus(currentStep.id)}
                  >
                    Mark Complete
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-blue-200 font-medium text-blue-600 hover:bg-blue-50"
                    onClick={() => setSelectedTaskForGuide(currentStep)}
                  >
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border bg-white shadow-sm">
              <div className="p-6 text-center">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <div className="font-medium text-gray-900">
                  All Steps Complete
                </div>
                <div className="text-sm text-gray-500">Great work!</div>
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
              <h3 className="font-medium text-gray-900">Status Overview</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Critical</span>
                  <span className="text-lg font-bold text-red-600">
                    {currentTasks.filter(t => t.priority === "critical").length}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-lg font-bold text-blue-600">
                    {
                      currentTasks.filter(t => t.status === "in-progress")
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="text-lg font-bold text-gray-600">
                    {currentTasks.filter(t => t.status === "pending").length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Guide */}
          <div className="border bg-white shadow-sm">
            <div className="border-b bg-gray-50 px-4 py-3">
              <h3 className="font-medium text-gray-900">
                Critical Steps Guide
              </h3>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                  <span className="text-xs font-bold text-white">
                    {currentTasks.findIndex(t => t.priority === "critical") + 1}
                  </span>
                </div>
                <span className="text-sm text-gray-700">Red step numbers</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-600 text-xs font-medium text-white">
                  CRITICAL
                </Badge>
                <span className="text-sm text-gray-700">Critical badges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">Urgent indicator</span>
              </div>
              <div className="mt-3 rounded border border-red-100 bg-red-50 p-3 text-xs text-red-700">
                Critical steps require immediate action to prevent issues.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
