"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Droplets,
  Filter,
  HeartHandshake,
  Shield,
  Stethoscope,
  Tractor,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HowToGuideView } from "@/features/shared/how-to-guide-view";
import { cn } from "@/lib/utils";

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
  "Animal Health": HeartHandshake,
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
    description: "Essential foundation for your aquaculture operation",
    categories: ["Infrastructure", "Access Control"],
  },
  {
    id: "pond-water",
    name: "Pond & Water Care",
    icon: Droplets,
    color: "green",
    description: "Optimal water quality and pond management",
    categories: ["Water Management", "Pond Management"],
  },
  {
    id: "stock-sourcing",
    name: "Healthy Stock Sourcing",
    icon: HeartHandshake,
    color: "orange",
    description: "Quality fingerlings and stocking practices",
    categories: ["Animal Health"],
  },
  {
    id: "access-control",
    name: "Farm Access Control",
    icon: Shield,
    color: "purple",
    description: "Biosecurity protocols and visitor management",
    categories: ["Human Resources", "Access Control"],
  },
  {
    id: "disease-readiness",
    name: "Disease Readiness",
    icon: Stethoscope,
    color: "red",
    description: "Prevention, monitoring, and response protocols",
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

interface TaskCategories {
  overdue: BiosecurityTask[];
  today: BiosecurityTask[];
  upcoming: BiosecurityTask[];
  completed: BiosecurityTask[];
}

// Task List Item Component
const TaskListItem = ({
  task,
  onComplete,
  onViewGuide,
}: {
  task: BiosecurityTask;
  onComplete: (taskId: string) => void;
  onViewGuide: (task: BiosecurityTask) => void;
}) => {
  const isCompleted = task.status === "completed";
  const isCritical = task.priority === "critical";

  return (
    <div
      className={cn(
        "border-l-4 p-4 transition-colors",
        isCompleted && "border-l-gray-200 bg-gray-50",
        !isCompleted && isCritical && "border-l-red-500 bg-red-50",
        !isCompleted &&
          task.priority === "high" &&
          "border-l-orange-400 bg-white",
        !isCompleted &&
          task.priority !== "high" &&
          !isCritical &&
          "border-l-gray-200 bg-white"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => onComplete(task.id)}
            className={cn(
              "h-5 w-5 rounded-full border-2",
              isCompleted ? "border-gray-400 bg-gray-400" : "border-gray-300",
              isCritical && !isCompleted && "border-red-500",
              "transition-colors hover:border-gray-400"
            )}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "font-semibold",
                isCompleted && "text-gray-500 line-through",
                isCritical && !isCompleted && "text-red-700",
                !isCompleted && !isCritical && "text-gray-900"
              )}
            >
              {task.title}
            </h3>
            {isCritical && !isCompleted && (
              <Badge
                variant="destructive"
                className="bg-red-500 text-xs hover:bg-red-600"
              >
                URGENT
              </Badge>
            )}
          </div>
          <p
            className={cn(
              "mt-1 text-sm",
              isCompleted && "text-gray-400 line-through",
              isCritical && !isCompleted && "text-red-600",
              !isCompleted && !isCritical && "text-gray-600"
            )}
          >
            {task.description}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock
                className={cn(
                  "h-3 w-3",
                  isCritical && !isCompleted && "text-red-500"
                )}
              />
              {task.timeframe}
            </span>
            <span>💰 {task.estimatedCost}</span>
          </div>
        </div>

        {/* View Guide Button */}
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border text-blue-600 hover:bg-blue-50",
              isCritical && !isCompleted ? "border-red-200" : "border-blue-200"
            )}
            onClick={() => onViewGuide(task)}
          >
            View Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

// Task Section Component
const TaskSection = ({
  title,
  tasks,
  onComplete,
  onViewGuide,
  className = "",
}: {
  title: string;
  tasks: BiosecurityTask[];
  onComplete: (taskId: string) => void;
  onViewGuide: (task: BiosecurityTask) => void;
  className?: string;
}) => {
  if (tasks.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="mb-3 font-semibold text-gray-900">{title}</h3>
      <div className="divide-y divide-gray-100 rounded-lg border bg-white">
        {tasks.map(task => (
          <TaskListItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onViewGuide={onViewGuide}
          />
        ))}
      </div>
    </div>
  );
};

// Today's Action Plan Component
const TodaysActionPlan = ({
  tasks,
  onComplete,
  onViewGuide,
}: {
  tasks: TaskCategories;
  onComplete: (taskId: string) => void;
  onViewGuide: (task: BiosecurityTask) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Today's Action Plan
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {tasks.overdue.length} overdue
          </Badge>
          <Badge variant="outline" className="text-xs">
            {tasks.today.length} for today
          </Badge>
          <Badge variant="outline" className="text-xs">
            {tasks.upcoming.length} upcoming
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        <TaskSection
          title="⚠️ Overdue Tasks"
          tasks={tasks.overdue}
          onComplete={onComplete}
          onViewGuide={onViewGuide}
          className="border-l-2 border-red-500 pl-4"
        />
        <TaskSection
          title="📅 Today's Tasks"
          tasks={tasks.today}
          onComplete={onComplete}
          onViewGuide={onViewGuide}
          className="border-l-2 border-blue-500 pl-4"
        />
        <TaskSection
          title="🔜 Upcoming Tasks"
          tasks={tasks.upcoming}
          onComplete={onComplete}
          onViewGuide={onViewGuide}
          className="border-l-2 border-gray-300 pl-4"
        />
      </div>
    </div>
  );
};

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

  // Filter menu state
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // New state for task view
  const [taskViewMode, setTaskViewMode] = useState<"active" | "history">(
    "active"
  );

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

  // Helper function to determine if a task is overdue
  const isTaskOverdue = (task: BiosecurityTask): boolean => {
    if (task.status === "completed") return false;
    // Add logic here to check if task is overdue based on timeframe
    return (
      task.timeframe.toLowerCase().includes("overdue") ||
      task.timeframe.toLowerCase().includes("ago")
    );
  };

  // Helper function to determine if a task is for today
  const isTaskForToday = (task: BiosecurityTask): boolean => {
    if (task.status === "completed") return false;
    return (
      task.timeframe.toLowerCase().includes("today") ||
      task.timeframe.toLowerCase().includes("now") ||
      task.timeframe.toLowerCase().includes("immediately")
    );
  };

  // Categorize tasks by status and timing
  const categorizeTasks = (tasks: BiosecurityTask[]): TaskCategories => {
    const categories: TaskCategories = {
      overdue: [],
      today: [],
      upcoming: [],
      completed: [],
    };

    tasks.forEach(task => {
      if (task.status === "completed") {
        categories.completed.push(task);
      } else if (isTaskOverdue(task)) {
        categories.overdue.push(task);
      } else if (isTaskForToday(task)) {
        categories.today.push(task);
      } else {
        categories.upcoming.push(task);
      }
    });

    // Sort each category by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const sortByPriority = (a: BiosecurityTask, b: BiosecurityTask) =>
      priorityOrder[a.priority] - priorityOrder[b.priority];

    categories.overdue.sort(sortByPriority);
    categories.today.sort(sortByPriority);
    categories.upcoming.sort(sortByPriority);
    categories.completed.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );

    return categories;
  };

  // Get categorized tasks for current view
  const getCategorizedTasks = () => {
    const tasks =
      currentModule?.id === "all"
        ? currentTasks
        : currentTasks.filter(task =>
            currentModule?.categories.includes(task.category)
          );
    return categorizeTasks(tasks);
  };

  const categorizedTasks = getCategorizedTasks();

  // Get active tasks count
  const getActiveTasksCount = () => {
    return (
      categorizedTasks.overdue.length +
      categorizedTasks.today.length +
      categorizedTasks.upcoming.length
    );
  };

  // Get completed tasks count
  const getCompletedTasksCount = () => {
    return categorizedTasks.completed.length;
  };

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
      <div className="space-y-16">
        {/* Overall Progress Bar */}
        <div className="mb-16 rounded-xl border border-green-100 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-6 shadow-sm">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Your GAqP Journey
                </h1>
                <p className="text-sm text-gray-600">
                  Track your progress towards BFAR certification
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  {
                    biosecurityPhases.filter(
                      phase => getPhaseProgress(phase.id).percentage === 100
                    ).length
                  }{" "}
                  of {biosecurityPhases.length} phases
                </Badge>
              </div>
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Overall Journey Progress
            </span>
            <span className="text-sm font-medium text-green-600">
              {Math.round(
                (biosecurityPhases.filter(
                  phase => getPhaseProgress(phase.id).percentage === 100
                ).length /
                  biosecurityPhases.length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="relative">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-green-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                style={{
                  width: `${Math.round(
                    (biosecurityPhases.filter(
                      phase => getPhaseProgress(phase.id).percentage === 100
                    ).length /
                      biosecurityPhases.length) *
                      100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Focus Your Plan - Module Selection */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                🎯 Focus Your Plan
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                💡 <strong>Tip:</strong> Select a module to focus on specific
                tasks, or view all tasks across modules.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={taskViewMode === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setTaskViewMode("active")}
                className="text-sm"
              >
                Active ({getActiveTasksCount()})
              </Button>
              <Button
                variant={taskViewMode === "history" ? "default" : "outline"}
                size="sm"
                onClick={() => setTaskViewMode("history")}
                className="text-sm"
              >
                Completed ({getCompletedTasksCount()})
              </Button>
            </div>
          </div>

          {/* Module Selection Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gaqpModules.map(module => {
              const isSelected = selectedModule === module.id;
              const moduleProgress = getModuleProgress(module.id);
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left ${
                    isSelected
                      ? `border-${module.color}-400 bg-${module.color}-50`
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {module.id !== "all" && (
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-${module.color}-500 text-white`}
                    >
                      <module.icon className="h-6 w-6" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {module.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {module.description}
                    </p>
                    {module.id !== "all" && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {moduleProgress.completed} of {moduleProgress.total}{" "}
                            steps
                          </span>
                          <span className="font-medium text-gray-700">
                            {moduleProgress.percentage}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full bg-${module.color}-500`}
                            style={{ width: `${moduleProgress.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Task List Section with increased top margin */}
        <div className="mt-24 space-y-8">
          {/* Active Tasks View */}
          {taskViewMode === "active" && (
            <TodaysActionPlan
              tasks={categorizedTasks}
              onComplete={toggleTaskStatus}
              onViewGuide={setSelectedTaskForGuide}
            />
          )}

          {/* Completed Tasks View */}
          {taskViewMode === "history" && (
            <div className="space-y-6">
              <TaskSection
                title="✅ Completed Tasks"
                tasks={categorizedTasks.completed}
                onComplete={toggleTaskStatus}
                onViewGuide={setSelectedTaskForGuide}
                className="border-l-2 border-green-500 pl-4"
              />
            </div>
          )}

          {/* Empty State */}
          {((taskViewMode === "active" && getActiveTasksCount() === 0) ||
            (taskViewMode === "history" && getCompletedTasksCount() === 0)) && (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {taskViewMode === "active"
                  ? "All Caught Up! 🎉"
                  : "No History Yet"}
              </h3>
              <p className="text-gray-600">
                {taskViewMode === "active"
                  ? "You've completed all your tasks for now."
                  : "Complete some tasks to see them here."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Journey Complete Message */}
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
    </div>
  );
}
