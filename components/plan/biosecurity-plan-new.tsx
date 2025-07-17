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
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Header - Clean and minimal */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Action Plan</h1>
          {hasUrgentTasks && (
            <Badge variant="destructive" className="px-3 py-1">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Urgent
            </Badge>
          )}
        </div>
      </div>

      {/* Your Next Action - Primary Focus Area */}
      {currentStep ? (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Your Next Action
          </h2>
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-lg">
            <div className="flex items-start gap-6">
              {/* Large Step Indicator */}
              <div
                className={`flex h-16 w-16 flex-shrink-0 items-center justify-center text-2xl font-bold shadow-lg ${
                  currentStep.priority === "critical"
                    ? "rounded-full bg-red-500 text-white"
                    : "rounded-full bg-blue-500 text-white"
                }`}
              >
                {currentStep.priority === "critical" ? "!" : currentStepNumber}
              </div>

              <div className="min-w-0 flex-1">
                {/* Step Info */}
                <div className="mb-4">
                  <div className="mb-2 text-sm font-medium text-blue-600">
                    Step {currentStepNumber} of {currentTasks.length}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight text-gray-900">
                    {currentStep.title}
                  </h3>
                  <p className="mb-4 text-lg leading-relaxed text-gray-700">
                    {currentStep.description}
                  </p>

                  {/* Priority and Status Tags */}
                  <div className="flex flex-wrap gap-3">
                    {currentStep.priority === "critical" && (
                      <Badge className="bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                        🚨 CRITICAL - Do This First!
                      </Badge>
                    )}
                    <Badge className="bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      📋 In Progress
                    </Badge>
                    <Badge className="bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {currentStep.category}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-700"
                    onClick={() => toggleTaskStatus(currentStep.id)}
                  >
                    ✓ I Completed This Step
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-blue-300 px-6 py-4 text-base font-medium text-blue-700 hover:bg-blue-50"
                    onClick={() => setSelectedTaskForGuide(currentStep)}
                  >
                    🆘 Get Help With This Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center shadow-lg">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              All Steps Complete! 🎉
            </h2>
            <p className="text-lg text-gray-600">
              Your farm is well protected. Great work keeping your aquaculture
              secure!
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-8">
        {/* Simplified Action Steps List */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            All Action Steps
          </h2>
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="divide-y">
              {currentPageTasks.map((task, index) => {
                const stepNumber = startIndex + index + 1;
                const isCompleted = task.status === "completed";
                const isCritical = task.priority === "critical";
                const isCurrentStep = task.id === currentStep?.id;

                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 transition-all hover:bg-gray-50 ${
                      isCurrentStep
                        ? "border-l-4 border-l-blue-500 bg-blue-50/50"
                        : ""
                    }`}
                  >
                    {/* Step Number/Status */}
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? "rounded-full bg-green-500 text-white"
                          : isCritical
                            ? "rounded-full bg-red-500 text-white"
                            : task.priority === "high"
                              ? "rounded-full bg-orange-400 text-white"
                              : "rounded-full bg-gray-300 text-gray-700"
                      }`}
                    >
                      {isCompleted ? "✓" : isCritical ? "!" : stepNumber}
                    </div>

                    {/* Task Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 font-semibold text-gray-900">
                            {task.title}
                          </h3>
                          <p className="line-clamp-1 text-sm text-gray-600">
                            {task.description}
                          </p>
                        </div>

                        {/* Tags and Actions */}
                        <div className="ml-4 flex items-center gap-2">
                          {/* Priority Tag */}
                          <Badge
                            className={`text-xs ${
                              isCritical
                                ? "bg-red-100 text-red-800"
                                : task.priority === "high"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </Badge>

                          {/* Status Badge */}
                          <Badge
                            className={`text-xs ${
                              isCompleted
                                ? "bg-green-100 text-green-800"
                                : isCurrentStep
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {isCompleted
                              ? "Completed"
                              : isCurrentStep
                                ? "Active"
                                : "Pending"}
                          </Badge>

                          {/* Get Help Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-2 py-1 text-xs"
                            onClick={() => setSelectedTaskForGuide(task)}
                          >
                            Help
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t bg-gray-50 p-4">
                  <Pagination>
                    <PaginationContent>
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

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        pageNum => (
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
                        )
                      )}

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

                  <div className="mt-2 text-center text-sm text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, currentTasks.length)} of{" "}
                    {currentTasks.length} tasks
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Unified Progress Section */}
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
          </div>
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Overall Progress
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {progressPercentage}%
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-3 [&>div]:bg-green-500"
              />
              <div className="mt-2 text-sm text-gray-600">
                {completedTasksCount} of {currentTasks.length} steps completed
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {currentTasks.length}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Total Steps</div>
              </div>

              <div className="text-center">
                <div className="mb-2 flex items-center justify-center">
                  <CheckCircle className="mr-1 h-5 w-5 text-green-500" />
                  <div className="text-2xl font-bold text-green-600">
                    {completedTasksCount}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>

              <div className="text-center">
                <div className="mb-2 flex items-center justify-center">
                  <AlertTriangle className="mr-1 h-5 w-5 text-red-500" />
                  <div className="text-2xl font-bold text-red-600">
                    {currentTasks.filter(t => t.priority === "critical").length}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>

              <div className="text-center">
                <div className="mb-2 flex items-center justify-center">
                  <Clock className="mr-1 h-5 w-5 text-gray-500" />
                  <div className="text-2xl font-bold text-gray-600">
                    {currentTasks.filter(t => t.status === "pending").length}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
