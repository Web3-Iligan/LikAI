"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Droplets,
  Filter,
  Heart,
  Lock,
  MapPin,
  Shield,
  Tractor,
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

// GAqP Module structure for the seamless journey
const gaqpModules = [
  {
    id: "all",
    name: "All Modules",
    icon: Filter,
    color: "gray",
    description: "View all action steps across your entire GAqP journey",
    categories: [
      "Infrastructure",
      "Access Control",
      "Water Management",
      "Pond Management",
      "Animal Health",
      "Feed Management",
      "Human Resources",
      "Equipment Management",
      "Waste Management",
    ],
  },
  {
    id: "farm-setup",
    name: "Farm Setup Basics",
    icon: Tractor,
    color: "blue",
    description: "Establish basic farm infrastructure and security foundations",
    categories: ["Infrastructure", "Access Control"],
  },
  {
    id: "pond-water",
    name: "Pond & Water Care",
    icon: Droplets,
    color: "cyan",
    description: "Maintain optimal water conditions for healthy shrimp",
    categories: ["Water Management", "Pond Management"],
  },
  {
    id: "stock-sourcing",
    name: "Healthy Stock Sourcing",
    icon: Heart,
    color: "green",
    description: "Source and manage healthy shrimp stock",
    categories: ["Animal Health"],
  },
  {
    id: "access-control",
    name: "Farm Access Control",
    icon: Lock,
    color: "purple",
    description: "Control farm access and implement biosecurity protocols",
    categories: ["Human Resources", "Access Control"],
  },
  {
    id: "disease-readiness",
    name: "Disease Readiness",
    icon: AlertCircle,
    color: "orange",
    description: "Prepare for and prevent disease outbreaks",
    categories: ["Equipment Management", "Waste Management", "Feed Management"],
  },
];

// Legacy GAqP Aspects mapping for backward compatibility
const gaqpAspects = {
  "Pond & Water Care": ["Water Management", "Pond Management"],
  "Farm Access Control": ["Access Control", "Human Resources"],
  "Stock Sourcing": ["Animal Health"],
  "Feed Management": ["Feed Management"],
  "Infrastructure & Equipment": ["Infrastructure", "Equipment Management"],
  "Waste Management": ["Waste Management"],
};

// Phase structure for the biosecurity journey
const biosecurityPhases = [
  {
    id: 1,
    name: "Foundation & Site Security",
    description: "Establish basic farm infrastructure and access controls",
    categories: ["Infrastructure", "Access Control"],
    color: "blue",
  },
  {
    id: 2,
    name: "Water & Stock Health",
    description: "Ensure optimal water conditions and healthy stock sourcing",
    categories: ["Water Management", "Pond Management", "Animal Health"],
    color: "cyan",
  },
  {
    id: 3,
    name: "Daily Farm Operations",
    description: "Implement routine management and monitoring practices",
    categories: ["Feed Management", "Human Resources"],
    color: "green",
  },
  {
    id: 4,
    name: "Advanced Practices & Compliance",
    description: "Maintain advanced biosecurity and regulatory compliance",
    categories: ["Equipment Management", "Waste Management"],
    color: "purple",
  },
];

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
  const searchParams = useSearchParams();

  const [selectedTaskForGuide, setSelectedTaskForGuide] =
    useState<BiosecurityTask | null>(null);
  const [aiGeneratedTasks, setAiGeneratedTasks] = useState<
    BiosecurityTask[] | null
  >(null);

  // Module selection state
  const [selectedModule, setSelectedModule] = useState<string>("all");

  // View mode state
  const [viewMode, setViewMode] = useState<"phases" | "all">("phases");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

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

  // Effect to load AI-generated plan from localStorage and handle URL parameters
  useEffect(() => {
    // Handle URL parameters for module filtering
    const moduleParam = searchParams.get("module");
    if (moduleParam && gaqpModules.some(m => m.id === moduleParam)) {
      setSelectedModule(moduleParam);
    }

    // Legacy support for aspect parameter
    const aspectParam = searchParams.get("aspect");
    if (aspectParam && aspectParam in gaqpAspects) {
      // Map legacy aspect to new module
      const moduleMapping: { [key: string]: string } = {
        "Pond & Water Care": "pond-water",
        "Farm Access Control": "access-control",
        "Stock Sourcing": "stock-sourcing",
        "Feed Management": "disease-readiness",
        "Infrastructure & Equipment": "farm-setup",
        "Waste Management": "disease-readiness",
      };
      const mappedModule = moduleMapping[aspectParam] || "all";
      setSelectedModule(mappedModule);
    }

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
  }, [searchParams]);

  const currentTasks = aiGeneratedTasks || defaultTasks;

  // Helper function to get tasks for a specific phase
  const getTasksForPhase = (phaseId: number) => {
    const phase = biosecurityPhases.find(p => p.id === phaseId);
    if (!phase) return [];
    return currentTasks.filter(task =>
      phase.categories.includes(task.category)
    );
  };

  // Helper function to get module progress
  const getModuleProgress = (moduleId: string) => {
    const module = gaqpModules.find(m => m.id === moduleId);
    if (!module || module.id === "all")
      return { completed: 0, total: 0, percentage: 0 };

    const moduleTasks = currentTasks.filter(task =>
      module.categories.includes(task.category)
    );
    const completedTasks = moduleTasks.filter(
      task => task.status === "completed"
    );

    return {
      completed: completedTasks.length,
      total: moduleTasks.length,
      percentage:
        moduleTasks.length > 0
          ? Math.round((completedTasks.length / moduleTasks.length) * 100)
          : 0,
    };
  };

  // Helper function to get phase progress
  const getPhaseProgress = (phaseId: number) => {
    const phaseTasks = getTasksForPhase(phaseId);
    const completedTasks = phaseTasks.filter(
      task => task.status === "completed"
    );
    return {
      completed: completedTasks.length,
      total: phaseTasks.length,
      percentage:
        phaseTasks.length > 0
          ? Math.round((completedTasks.length / phaseTasks.length) * 100)
          : 0,
    };
  };

  // Get current phase (first phase with incomplete tasks)
  const getCurrentPhase = () => {
    for (const phase of biosecurityPhases) {
      const phaseTasks = getTasksForPhase(phase.id);
      const hasIncompleteTasks = phaseTasks.some(
        task => task.status !== "completed"
      );
      if (hasIncompleteTasks) return phase;
    }
    return biosecurityPhases[biosecurityPhases.length - 1]; // Return last phase if all complete
  };

  const currentPhase = getCurrentPhase();

  // Filter tasks based on selected module
  const currentModule = gaqpModules.find(
    module => module.id === selectedModule
  );
  const filteredTasks = currentModule
    ? currentModule.id === "all"
      ? currentTasks
      : currentTasks.filter(task =>
          currentModule.categories.includes(task.category)
        )
    : currentTasks;

  // Get current step for the selected module
  const getCurrentStepForModule = (moduleId: string) => {
    const module = gaqpModules.find(m => m.id === moduleId);
    if (!module) return null;

    const moduleTasks =
      module.id === "all"
        ? currentTasks
        : currentTasks.filter(task =>
            module.categories.includes(task.category)
          );

    return moduleTasks.find(task => task.status !== "completed");
  };

  const currentStepForModule = getCurrentStepForModule(selectedModule);
  const overallCurrentStep = getCurrentStepForModule("all");

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentPageTasks = filteredTasks.slice(startIndex, endIndex);

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

  // Determine if plan is urgent based on critical priority tasks
  const hasUrgentTasks = filteredTasks.some(
    task => task.priority === "critical"
  );

  // Get current step (first non-completed task in current phase)
  const getCurrentStepInPhase = (phaseId: number) => {
    const phaseTasks = getTasksForPhase(phaseId);
    return phaseTasks.find(task => task.status !== "completed");
  };

  const currentStep = getCurrentStepInPhase(currentPhase.id);

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
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Top Header Area */}
      <div className="mb-8">
        {/* Overall Progress Bar */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">
              Your GAqP Journey
            </h1>
            {hasUrgentTasks && (
              <Badge variant="destructive" className="px-4 py-2 text-base">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Urgent Actions Required
              </Badge>
            )}
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">
              Overall Journey Progress
            </span>
            <span className="text-sm text-gray-600">
              {
                biosecurityPhases.filter(
                  phase => getPhaseProgress(phase.id).percentage === 100
                ).length
              }{" "}
              of {biosecurityPhases.length} phases completed
            </span>
          </div>
          <div className="relative">
            <Progress
              value={Math.round(
                (biosecurityPhases.filter(
                  phase => getPhaseProgress(phase.id).percentage === 100
                ).length /
                  biosecurityPhases.length) *
                  100
              )}
              className="h-6 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:via-cyan-500 [&>div]:to-green-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white drop-shadow-sm">
                {Math.round(
                  (biosecurityPhases.filter(
                    phase => getPhaseProgress(phase.id).percentage === 100
                  ).length /
                    biosecurityPhases.length) *
                    100
                )}
                % Complete
              </span>
            </div>
          </div>
        </div>

        {/* Focus Your Plan - Vertical Module Navigator */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            🎯 Focus Your Plan
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gaqpModules.map(module => {
              const isSelected = selectedModule === module.id;
              const moduleProgress = getModuleProgress(module.id);

              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`group flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? module.color === "blue"
                        ? "border-blue-400 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                        : module.color === "cyan"
                          ? "border-cyan-400 bg-cyan-50 shadow-lg ring-2 ring-cyan-200"
                          : module.color === "green"
                            ? "border-green-400 bg-green-50 shadow-lg ring-2 ring-green-200"
                            : module.color === "purple"
                              ? "border-purple-400 bg-purple-50 shadow-lg ring-2 ring-purple-200"
                              : module.color === "orange"
                                ? "border-orange-400 bg-orange-50 shadow-lg ring-2 ring-orange-200"
                                : "border-gray-400 bg-gray-50 shadow-lg ring-2 ring-gray-200"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isSelected
                        ? module.color === "blue"
                          ? "bg-blue-500 text-white shadow-lg"
                          : module.color === "cyan"
                            ? "bg-cyan-500 text-white shadow-lg"
                            : module.color === "green"
                              ? "bg-green-500 text-white shadow-lg"
                              : module.color === "purple"
                                ? "bg-purple-500 text-white shadow-lg"
                                : module.color === "orange"
                                  ? "bg-orange-500 text-white shadow-lg"
                                  : "bg-gray-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                  >
                    <module.icon className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-lg font-semibold ${
                          isSelected ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {module.name}
                      </h3>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {module.description}
                    </p>
                    {module.id !== "all" && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isSelected
                                ? module.color === "blue"
                                  ? "bg-blue-500"
                                  : module.color === "cyan"
                                    ? "bg-cyan-500"
                                    : module.color === "green"
                                      ? "bg-green-500"
                                      : module.color === "purple"
                                        ? "bg-purple-500"
                                        : module.color === "orange"
                                          ? "bg-orange-500"
                                          : "bg-gray-500"
                                : "bg-gray-400"
                            }`}
                            style={{ width: `${moduleProgress.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {moduleProgress.percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            💡 <strong>Tip:</strong> Select a module to focus on specific tasks,
            or choose "All Modules" to see your complete journey.
          </div>
        </div>
      </div>

      {/* Your Next Action */}
      {(currentStepForModule ||
        (selectedModule === "all" && overallCurrentStep)) && (
        <div className="mb-8">
          <div className="rounded-xl border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white shadow-md">
                →
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Next Action
                {selectedModule !== "all" && (
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    in {currentModule?.name}
                  </span>
                )}
              </h2>
              {(currentStepForModule || overallCurrentStep)?.priority ===
                "critical" && (
                <Badge variant="destructive" className="text-sm">
                  🚨 URGENT
                </Badge>
              )}
            </div>

            <div className="mb-4 rounded-lg border-2 border-green-200 bg-white p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {(currentStepForModule || overallCurrentStep)?.title}
              </h3>
              <p className="mb-3 text-gray-700">
                {(currentStepForModule || overallCurrentStep)?.description}
              </p>
              {(currentStepForModule || overallCurrentStep)?.priority ===
                "critical" && (
                <div className="mb-4 rounded-lg bg-red-50 p-3">
                  <p className="font-medium text-red-700">
                    🚨 Critical - This task needs immediate attention to protect
                    your farm!
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>
                  💰{" "}
                  {(currentStepForModule || overallCurrentStep)?.estimatedCost}
                </span>
                <span>
                  ⏱️ {(currentStepForModule || overallCurrentStep)?.timeframe}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-green-600 px-8 py-3 text-lg font-semibold text-white hover:bg-green-700"
                onClick={() =>
                  toggleTaskStatus(
                    (currentStepForModule || overallCurrentStep)?.id || ""
                  )
                }
              >
                ✅ Complete This Action
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-200 px-6 py-3 text-green-700 hover:bg-green-50"
                onClick={() => {
                  const task = currentStepForModule || overallCurrentStep;
                  if (task) setSelectedTaskForGuide(task);
                }}
              >
                📖 Get Step-by-Step Guide
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Steps in Selected Module */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedModule === "all"
              ? "Steps in Your Complete Journey"
              : `Steps in ${currentModule?.name}`}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {filteredTasks.length}
              </span>{" "}
              tasks
              {filteredTasks.filter(t => t.status === "completed").length >
                0 && (
                <>
                  {" • "}
                  <span className="font-semibold text-green-600">
                    {filteredTasks.filter(t => t.status === "completed").length}
                  </span>{" "}
                  completed
                </>
              )}
              {filteredTasks.filter(
                t => t.priority === "critical" && t.status !== "completed"
              ).length > 0 && (
                <>
                  {" • "}
                  <span className="font-semibold text-red-600">
                    {
                      filteredTasks.filter(
                        t =>
                          t.priority === "critical" && t.status !== "completed"
                      ).length
                    }
                  </span>{" "}
                  urgent
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "phases" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("phases")}
                className="text-sm"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Organized View
              </Button>
              <Button
                variant={viewMode === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("all")}
                className="text-sm"
              >
                <Filter className="mr-2 h-4 w-4" />
                Simple List
              </Button>
            </div>
          </div>
        </div>

        {/* Show helpful message if no tasks available */}
        {filteredTasks.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Great Work! 🎉
            </h3>
            <p className="text-gray-600">
              {selectedModule === "all"
                ? "You've completed all tasks in your GAqP journey!"
                : `You've completed all tasks in ${currentModule?.name}!`}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {selectedModule !== "all"
                ? "Try selecting 'All Modules' to see your complete journey or choose another module."
                : "Your farm is now fully GAqP compliant. Well done!"}
            </p>
            {selectedModule !== "all" && (
              <Button
                onClick={() => setSelectedModule("all")}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                🔍 View All Modules
              </Button>
            )}
          </div>
        )}

        {filteredTasks.length > 0 &&
          (viewMode === "phases" ? (
            selectedModule === "all" ? (
              /* Module-grouped View for All Modules */
              <div className="space-y-8">
                {gaqpModules.slice(1).map(module => {
                  // Skip "all" module
                  const moduleTasks = currentTasks.filter(task =>
                    module.categories.includes(task.category)
                  );
                  if (moduleTasks.length === 0) return null;

                  const moduleProgress = getModuleProgress(module.id);
                  const nextTaskInModule = moduleTasks.find(
                    task => task.status !== "completed"
                  );

                  return (
                    <div
                      key={module.id}
                      className="rounded-xl border-2 border-gray-200 bg-white shadow-lg"
                    >
                      {/* Module Header */}
                      <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                              module.color === "blue"
                                ? "bg-blue-500"
                                : module.color === "cyan"
                                  ? "bg-cyan-500"
                                  : module.color === "green"
                                    ? "bg-green-500"
                                    : module.color === "purple"
                                      ? "bg-purple-500"
                                      : "bg-orange-500"
                            } text-white`}
                          >
                            <module.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {module.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {module.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-600">
                              {moduleProgress.completed} of{" "}
                              {moduleProgress.total} completed
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <Progress
                                value={moduleProgress.percentage}
                                className="h-2 w-20"
                              />
                              <span className="text-xs text-gray-500">
                                {moduleProgress.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Module Tasks */}
                      <div className="p-6">
                        <div className="space-y-3">
                          {moduleTasks.map((task, index) => {
                            const isCompleted = task.status === "completed";
                            const isCritical = task.priority === "critical";
                            const isNextAction =
                              nextTaskInModule?.id === task.id;

                            return (
                              <div
                                key={task.id}
                                className={`flex items-center gap-4 rounded-lg p-4 transition-all duration-200 ${
                                  isNextAction
                                    ? "border-2 border-blue-300 bg-blue-50/50 shadow-sm"
                                    : isCritical && !isCompleted
                                      ? "border border-red-200 bg-red-50"
                                      : "border bg-gray-50 hover:bg-gray-100"
                                }`}
                              >
                                <div
                                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                    isCompleted
                                      ? "bg-green-500 text-white"
                                      : isCritical
                                        ? "bg-red-500 text-white"
                                        : task.priority === "high"
                                          ? "bg-orange-400 text-white"
                                          : "bg-gray-300 text-gray-700"
                                  }`}
                                >
                                  {isCompleted
                                    ? "✓"
                                    : isCritical
                                      ? "!"
                                      : index + 1}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="mb-1 flex items-center gap-2">
                                    <h5 className="font-semibold text-gray-900">
                                      {task.title}
                                    </h5>
                                    <Badge
                                      variant={
                                        isCritical
                                          ? "destructive"
                                          : task.priority === "high"
                                            ? "default"
                                            : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {task.priority === "critical"
                                        ? "🚨 URGENT"
                                        : task.priority.toUpperCase()}
                                    </Badge>
                                    {isNextAction && (
                                      <Badge className="bg-blue-100 text-xs text-blue-800">
                                        👆 NEXT UP
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mb-2 text-sm text-gray-600">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {task.timeframe}
                                    </span>
                                    <span>💰 {task.estimatedCost}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {!isCompleted && (
                                    <Button
                                      size="sm"
                                      className="bg-green-600 text-white hover:bg-green-700"
                                      onClick={() => toggleTaskStatus(task.id)}
                                    >
                                      ✅ Done
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-200 text-blue-600 hover:text-blue-700"
                                    onClick={() =>
                                      setSelectedTaskForGuide(task)
                                    }
                                  >
                                    📖 How-To
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Simple task list for specific module */
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
                  <div className="p-6">
                    <div className="space-y-3">
                      {filteredTasks.map((task, index) => {
                        const isCompleted = task.status === "completed";
                        const isCritical = task.priority === "critical";
                        const isNextAction =
                          currentStepForModule?.id === task.id;

                        return (
                          <div
                            key={task.id}
                            className={`flex items-center gap-4 rounded-lg p-4 transition-all duration-200 ${
                              isNextAction
                                ? "border-2 border-blue-300 bg-blue-50/50 shadow-sm"
                                : isCritical && !isCompleted
                                  ? "border border-red-200 bg-red-50"
                                  : "border bg-gray-50 hover:bg-gray-100"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                isCompleted
                                  ? "bg-green-500 text-white"
                                  : isCritical
                                    ? "bg-red-500 text-white"
                                    : task.priority === "high"
                                      ? "bg-orange-400 text-white"
                                      : "bg-gray-300 text-gray-700"
                              }`}
                            >
                              {isCompleted ? "✓" : isCritical ? "!" : index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex items-center gap-2">
                                <h5 className="font-semibold text-gray-900">
                                  {task.title}
                                </h5>
                                <Badge
                                  variant={
                                    isCritical
                                      ? "destructive"
                                      : task.priority === "high"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {task.priority === "critical"
                                    ? "🚨 URGENT"
                                    : task.priority.toUpperCase()}
                                </Badge>
                                {isNextAction && (
                                  <Badge className="bg-blue-100 text-xs text-blue-800">
                                    👆 NEXT UP
                                  </Badge>
                                )}
                              </div>
                              <p className="mb-2 text-sm text-gray-600">
                                {task.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.timeframe}
                                </span>
                                <span>💰 {task.estimatedCost}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!isCompleted && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 text-white hover:bg-green-700"
                                  onClick={() => toggleTaskStatus(task.id)}
                                >
                                  ✅ Done
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:text-blue-700"
                                onClick={() => setSelectedTaskForGuide(task)}
                              >
                                📖 How-To
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            /* Simple List View */
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="divide-y">
                {currentPageTasks.map((task, index) => {
                  const stepNumber = startIndex + index + 1;
                  const isCompleted = task.status === "completed";
                  const isCritical = task.priority === "critical";
                  const isNextAction =
                    (currentStepForModule || overallCurrentStep)?.id ===
                    task.id;

                  return (
                    <div
                      key={task.id}
                      className={`flex items-center gap-4 p-4 transition-colors hover:bg-gray-50 ${
                        isNextAction
                          ? "border-l-4 border-l-blue-500 bg-blue-50/50"
                          : isCritical && !isCompleted
                            ? "bg-red-50/50"
                            : ""
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCritical
                              ? "bg-red-500 text-white"
                              : task.priority === "high"
                                ? "bg-orange-400 text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {isCompleted ? "✓" : isCritical ? "!" : stepNumber}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="truncate font-semibold text-gray-900">
                            {task.title}
                          </h3>
                          <Badge
                            variant={
                              isCritical
                                ? "destructive"
                                : task.priority === "high"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {task.priority === "critical"
                              ? "🚨 URGENT"
                              : task.priority.toUpperCase()}
                          </Badge>
                          {isNextAction && (
                            <Badge className="bg-blue-100 text-xs text-blue-800">
                              👆 DO THIS NEXT
                            </Badge>
                          )}
                        </div>
                        <p className="mb-2 line-clamp-1 text-sm text-gray-600">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.timeframe}
                          </span>
                          <span>💰 {task.estimatedCost}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isCompleted && (
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => toggleTaskStatus(task.id)}
                          >
                            ✅ Done
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:text-blue-700"
                          onClick={() => setSelectedTaskForGuide(task)}
                        >
                          📖 How-To
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

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

                  <div className="mt-3 text-center text-sm text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredTasks.length)} of{" "}
                    {filteredTasks.length} tasks
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Journey Complete Message - Show when all phases are complete */}
      {!currentStep && (
        <div className="mb-8">
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-8 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-4xl shadow-lg">
              🏆
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              🎉 GAqP Journey Complete!
            </h2>
            <p className="mb-4 text-xl text-gray-600">
              Outstanding work! You've completed all modules of your farm's
              biosecurity journey.
            </p>
            <p className="text-lg text-gray-500">
              Your farm is now{" "}
              <span className="font-semibold text-green-600">
                GAqP compliant
              </span>{" "}
              and fully protected against biosecurity risks.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                📄 Generate Compliance Report
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                📚 Access Ongoing Resources
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Your Journey Progress */}
      <div className="rounded-xl border bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            � Your Journey Progress
          </h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(
                (currentTasks.filter(t => t.status === "completed").length /
                  currentTasks.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Overall Complete</div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600">
              {
                biosecurityPhases.filter(
                  phase => getPhaseProgress(phase.id).percentage === 100
                ).length
              }
            </div>
            <div className="text-sm font-medium text-blue-700">
              Phases Complete
            </div>
            <div className="mt-1 text-xs text-blue-600">
              of {biosecurityPhases.length} total
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-1">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-3xl font-bold text-green-600">
                {currentTasks.filter(t => t.status === "completed").length}
              </span>
            </div>
            <div className="text-sm font-medium text-green-700">
              Tasks Complete
            </div>
            <div className="mt-1 text-xs text-green-600">
              of {currentTasks.length} total
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-purple-600">
              {currentTasks.filter(t => t.status === "pending").length}
            </div>
            <div className="text-sm font-medium text-purple-700">
              Tasks Remaining
            </div>
            <div className="mt-1 text-xs text-purple-600">in your journey</div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-1">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <span className="text-3xl font-bold text-orange-600">
                {
                  currentTasks.filter(
                    t => t.priority === "critical" && t.status !== "completed"
                  ).length
                }
              </span>
            </div>
            <div className="text-sm font-medium text-orange-700">
              Critical Tasks
            </div>
            <div className="mt-1 text-xs text-orange-600">need attention</div>
          </div>
        </div>

        {/* Journey Milestone Achievement */}
        {currentTasks.filter(t => t.status === "completed").length > 0 && (
          <div className="mt-6 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-500 p-3">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">
                  🎉 Great Progress!
                </h4>
                <p className="text-gray-600">
                  You've completed{" "}
                  <span className="font-semibold text-green-600">
                    {currentTasks.filter(t => t.status === "completed").length}{" "}
                    tasks
                  </span>{" "}
                  on your GAqP journey. Your farm security is getting stronger
                  with every step!
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (currentTasks.filter(t => t.status === "completed").length /
                      currentTasks.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
