"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Building,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Droplets,
  Filter,
  MapPin,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// GAqP Aspects mapping to categories
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

// Related guides data for each aspect
const relatedGuides = {
  "Pond & Water Care": [
    { title: "Daily Water Quality Testing", type: "video", duration: "5 min" },
    { title: "Pond Aeration Best Practices", type: "guide", duration: "8 min" },
    { title: "pH Management Guide", type: "quick-ref", duration: "3 min" },
  ],
  "Farm Access Control": [
    {
      title: "Setting Up Disinfection Stations",
      type: "video",
      duration: "6 min",
    },
    { title: "Visitor Protocol Checklist", type: "guide", duration: "4 min" },
    { title: "Quarantine Procedures", type: "quick-ref", duration: "5 min" },
  ],
  "Stock Sourcing": [
    {
      title: "BFAR-Accredited Hatchery List",
      type: "quick-ref",
      duration: "2 min",
    },
    {
      title: "Post-Larval Acclimation Process",
      type: "video",
      duration: "10 min",
    },
    { title: "Health Inspection Checklist", type: "guide", duration: "7 min" },
  ],
  "Feed Management": [
    { title: "Feed Storage Best Practices", type: "guide", duration: "6 min" },
    {
      title: "Feeding Schedule Optimization",
      type: "video",
      duration: "8 min",
    },
    { title: "Feed Quality Inspection", type: "quick-ref", duration: "4 min" },
  ],
  "Infrastructure & Equipment": [
    { title: "Equipment Calibration Guide", type: "guide", duration: "10 min" },
    {
      title: "Pond Infrastructure Inspection",
      type: "video",
      duration: "12 min",
    },
    {
      title: "Maintenance Schedule Template",
      type: "quick-ref",
      duration: "3 min",
    },
  ],
  "Waste Management": [
    { title: "Sludge Removal Procedures", type: "video", duration: "9 min" },
    { title: "Composting Guidelines", type: "guide", duration: "8 min" },
    { title: "Environmental Compliance", type: "quick-ref", duration: "5 min" },
  ],
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
  const searchParams = useSearchParams();

  const [selectedTaskForGuide, setSelectedTaskForGuide] =
    useState<BiosecurityTask | null>(null);
  const [aiGeneratedTasks, setAiGeneratedTasks] = useState<
    BiosecurityTask[] | null
  >(null);

  // Filtering state
  const [selectedAspect, setSelectedAspect] = useState<string>("All Aspects");
  const [showRelatedGuides, setShowRelatedGuides] = useState(false);

  // Phase state
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
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
    // Handle URL parameters for aspect filtering
    const aspectParam = searchParams.get("aspect");
    if (aspectParam && aspectParam in gaqpAspects) {
      setSelectedAspect(aspectParam);
      setShowRelatedGuides(true);
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

  // Filter tasks based on selected aspect
  const filteredTasks =
    selectedAspect === "All Aspects"
      ? currentTasks
      : currentTasks.filter(task => {
          const aspectCategories =
            gaqpAspects[selectedAspect as keyof typeof gaqpAspects];
          return aspectCategories?.includes(task.category);
        });

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
  const currentStepNumber = currentStep
    ? getTasksForPhase(currentPhase.id).findIndex(
        task => task.id === currentStep.id
      ) + 1
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
    <div className="mx-auto max-w-6xl px-6 py-8">
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
                {filteredTasks.filter(t => t.priority === "critical").length}{" "}
                critical step(s) need immediate attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Biosecurity Journey
            </h1>
            {hasUrgentTasks && (
              <Badge variant="destructive" className="px-3 py-1">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Urgent
              </Badge>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 rounded-lg border p-1">
            <Button
              variant={viewMode === "phases" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("phases")}
              className="text-sm"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Journey View
            </Button>
            <Button
              variant={viewMode === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("all")}
              className="text-sm"
            >
              <Filter className="mr-2 h-4 w-4" />
              List View
            </Button>
          </div>
        </div>

        {/* Phase-based Filter or Aspect Filter */}
        {viewMode === "all" && (
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter by Aspect:
              </span>
            </div>
            <Select value={selectedAspect} onValueChange={setSelectedAspect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select aspect..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Aspects">All Aspects</SelectItem>
                {Object.keys(gaqpAspects).map(aspect => (
                  <SelectItem key={aspect} value={aspect}>
                    {aspect}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedAspect !== "All Aspects" && (
              <Badge variant="outline" className="text-sm">
                {filteredTasks.length} task
                {filteredTasks.length !== 1 ? "s" : ""} found
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Visual Journey Roadmap */}
      {viewMode === "phases" && (
        <div className="mb-8">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              🗺️ Your Biosecurity Journey Roadmap
            </h2>
            <div className="relative">
              {/* Journey Path Line */}
              <div className="absolute left-8 top-12 h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>

              {/* Phase Milestones */}
              <div className="space-y-8">
                {biosecurityPhases.map(phase => {
                  const progress = getPhaseProgress(phase.id);
                  const isCompleted = progress.percentage === 100;
                  const isCurrent = phase.id === currentPhase.id;
                  const isUpcoming = phase.id > currentPhase.id;

                  return (
                    <div
                      key={phase.id}
                      className="relative flex items-center gap-6"
                    >
                      {/* Milestone Marker */}
                      <div
                        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 text-lg font-bold shadow-lg ${
                          isCompleted
                            ? phase.color === "blue"
                              ? "border-blue-300 bg-blue-500 text-white"
                              : phase.color === "cyan"
                                ? "border-cyan-300 bg-cyan-500 text-white"
                                : phase.color === "green"
                                  ? "border-green-300 bg-green-500 text-white"
                                  : "border-purple-300 bg-purple-500 text-white"
                            : isCurrent
                              ? phase.color === "blue"
                                ? "border-blue-400 bg-white text-blue-600"
                                : phase.color === "cyan"
                                  ? "border-cyan-400 bg-white text-cyan-600"
                                  : phase.color === "green"
                                    ? "border-green-400 bg-white text-green-600"
                                    : "border-purple-400 bg-white text-purple-600"
                              : "border-gray-300 bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? "✓" : phase.id}

                        {/* Pulse animation for current phase */}
                        {isCurrent && (
                          <div
                            className={`absolute inset-0 animate-ping rounded-full opacity-25 ${
                              phase.color === "blue"
                                ? "bg-blue-400"
                                : phase.color === "cyan"
                                  ? "bg-cyan-400"
                                  : phase.color === "green"
                                    ? "bg-green-400"
                                    : "bg-purple-400"
                            }`}
                          ></div>
                        )}
                      </div>

                      {/* Phase Info */}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3
                            className={`text-lg font-bold ${
                              isCompleted
                                ? "text-gray-900"
                                : isCurrent
                                  ? "text-gray-900"
                                  : "text-gray-500"
                            }`}
                          >
                            {phase.name}
                          </h3>
                          {isCompleted && (
                            <Badge className="border-green-200 bg-green-100 text-green-800">
                              ✓ Complete
                            </Badge>
                          )}
                          {isCurrent && (
                            <Badge
                              className={`border-200 ${
                                phase.color === "blue"
                                  ? "border-blue-200 bg-blue-100 text-blue-800"
                                  : phase.color === "cyan"
                                    ? "border-cyan-200 bg-cyan-100 text-cyan-800"
                                    : phase.color === "green"
                                      ? "border-green-200 bg-green-100 text-green-800"
                                      : "border-purple-200 bg-purple-100 text-purple-800"
                              }`}
                            >
                              🎯 Active
                            </Badge>
                          )}
                          {isUpcoming && (
                            <Badge
                              variant="outline"
                              className="border-gray-300 text-gray-500"
                            >
                              📅 Upcoming
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`mb-3 text-sm ${
                            isCompleted || isCurrent
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {phase.description}
                        </p>

                        {/* Mini Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <Progress
                              value={progress.percentage}
                              className={`h-2 ${
                                isCompleted
                                  ? phase.color === "blue"
                                    ? "[&>div]:bg-blue-500"
                                    : phase.color === "cyan"
                                      ? "[&>div]:bg-cyan-500"
                                      : phase.color === "green"
                                        ? "[&>div]:bg-green-500"
                                        : "[&>div]:bg-purple-500"
                                  : isCurrent
                                    ? phase.color === "blue"
                                      ? "[&>div]:bg-blue-400"
                                      : phase.color === "cyan"
                                        ? "[&>div]:bg-cyan-400"
                                        : phase.color === "green"
                                          ? "[&>div]:bg-green-400"
                                          : "[&>div]:bg-purple-400"
                                    : "[&>div]:bg-gray-300"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isCompleted || isCurrent
                                ? "text-gray-700"
                                : "text-gray-400"
                            }`}
                          >
                            {progress.completed}/{progress.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Journey End Marker */}
              <div className="relative mt-8 flex items-center gap-6">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-yellow-300 bg-yellow-100 text-2xl shadow-lg">
                  🏆
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    GAqP Certification Ready!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your farm will be fully compliant and biosecure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Your Next Action - Primary Focus */}
      {currentStep ? (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Your Next Step in {currentPhase.name}
          </h2>
          <div className="rounded-xl border-2 border-blue-200 bg-white p-8 shadow-lg">
            <div className="flex items-start gap-6">
              {/* Large Step Indicator */}
              <div
                className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold shadow-lg ${
                  currentStep.priority === "critical"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {currentStep.priority === "critical" ? "!" : currentStepNumber}
              </div>

              {/* Task Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentStep.title}
                    </h3>
                    {currentStep.priority === "critical" && (
                      <Badge variant="destructive" className="text-sm">
                        CRITICAL
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {currentStep.description}
                  </p>
                  {currentStep.priority === "critical" && (
                    <p className="mt-2 font-medium text-red-700">
                      🚨 Urgent - Do this first to protect your farm!
                    </p>
                  )}

                  {/* Phase Context */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>
                      Phase {currentPhase.id} of {biosecurityPhases.length}:{" "}
                      {currentPhase.description}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
                    onClick={() => toggleTaskStatus(currentStep.id)}
                  >
                    ✓ I Completed This Step
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 px-6 py-3 font-medium text-blue-600 hover:bg-blue-50"
                    onClick={() => setSelectedTaskForGuide(currentStep)}
                  >
                    📖 Get Help With This Step
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <div className="rounded-xl border-2 border-green-200 bg-white p-8 text-center shadow-lg">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              🎉 Biosecurity Journey Complete!
            </h2>
            <p className="text-lg text-gray-600">
              Excellent work! You've completed all phases of your farm's
              biosecurity journey. Your farm is now well protected and GAqP
              compliant!
            </p>
          </div>
        </div>
      )}

      {/* Phases View or Action Steps List */}
      {viewMode === "phases" ? (
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Your Biosecurity Journey
          </h2>

          <div className="space-y-6">
            {biosecurityPhases.map(phase => {
              const phaseProgress = getPhaseProgress(phase.id);
              const phaseTasks = getTasksForPhase(phase.id);
              const isCurrentPhase = phase.id === currentPhase.id;
              const isCompleted = phaseProgress.percentage === 100;
              const isExpanded = expandedPhase === phase.id || isCurrentPhase;

              return (
                <div
                  key={phase.id}
                  className={`rounded-xl border-2 bg-white shadow-sm transition-all ${
                    isCurrentPhase
                      ? "border-blue-300 bg-blue-50/30"
                      : isCompleted
                        ? "border-green-300 bg-green-50/30"
                        : "border-gray-200"
                  }`}
                >
                  {/* Phase Header */}
                  <div
                    className="cursor-pointer p-6"
                    onClick={() =>
                      setExpandedPhase(isExpanded ? null : phase.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Phase Status Icon */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrentPhase
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {isCompleted ? "✓" : phase.id}
                        </div>

                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">
                              {phase.name}
                            </h3>
                            {isCurrentPhase && (
                              <Badge className="border-blue-200 bg-blue-100 text-blue-800">
                                Current Phase
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge className="border-green-200 bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{phase.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Progress Indicator */}
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">
                            {phaseProgress.completed} of {phaseProgress.total}{" "}
                            steps
                          </div>
                          <div className="text-xs text-gray-500">
                            {phaseProgress.percentage}% complete
                          </div>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <div className="text-gray-400">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5" />
                          ) : (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <Progress
                        value={phaseProgress.percentage}
                        className={`h-2 ${
                          isCurrentPhase
                            ? "[&>div]:bg-blue-500"
                            : isCompleted
                              ? "[&>div]:bg-green-500"
                              : "[&>div]:bg-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phase Tasks (Expanded) */}
                  {isExpanded && (
                    <div className="border-t bg-gray-50/50 p-6">
                      <div className="space-y-3">
                        {phaseTasks.map((task, index) => {
                          const isCompleted = task.status === "completed";
                          const isCritical = task.priority === "critical";

                          return (
                            <div
                              key={task.id}
                              className={`flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-white ${
                                isCritical && !isCompleted
                                  ? "border border-red-200 bg-red-50"
                                  : "border bg-white"
                              }`}
                            >
                              {/* Step Number/Status */}
                              <div
                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
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

                              {/* Task Info */}
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-900">
                                    {task.title}
                                  </h4>
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
                                    {task.priority.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {task.description}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                {!isCompleted && (
                                  <Button
                                    size="sm"
                                    className="bg-green-600 text-white hover:bg-green-700"
                                    onClick={() => toggleTaskStatus(task.id)}
                                  >
                                    Complete
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700"
                                  onClick={() => setSelectedTaskForGuide(task)}
                                >
                                  Help
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Traditional Action Steps List */
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Action Steps
          </h2>
          <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="divide-y">
              {currentPageTasks.map((task, index) => {
                const stepNumber = startIndex + index + 1;
                const isCompleted = task.status === "completed";
                const isCritical = task.priority === "critical";

                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 transition-colors hover:bg-gray-50 ${
                      isCritical && !isCompleted ? "bg-red-50/50" : ""
                    }`}
                  >
                    {/* Step Number/Status */}
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

                    {/* Task Info */}
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
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="line-clamp-1 text-sm text-gray-600">
                        {task.description}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${
                          isCompleted
                            ? "border-green-200 bg-green-100 text-green-800"
                            : task.status === "in-progress"
                              ? "border-blue-200 bg-blue-100 text-blue-800"
                              : "border-gray-200 bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isCompleted
                          ? "Completed"
                          : task.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => setSelectedTaskForGuide(task)}
                      >
                        Help
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
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
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
        </div>
      )}

      {/* Related Guides Section */}
      {selectedAspect !== "All Aspects" && showRelatedGuides && (
        <div className="mb-8">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                📚 Need More Info? Related Guides for {selectedAspect}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRelatedGuides(!showRelatedGuides)}
                className="text-gray-500"
              >
                {showRelatedGuides ? "Hide" : "Show"}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {relatedGuides[selectedAspect as keyof typeof relatedGuides]?.map(
                (guide, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg border bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          guide.type === "video"
                            ? "bg-red-100 text-red-600"
                            : guide.type === "guide"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {guide.type === "video"
                          ? "🎥"
                          : guide.type === "guide"
                            ? "📖"
                            : "⚡"}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-medium text-gray-900">
                          {guide.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {guide.type}
                          </Badge>
                          <span>{guide.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                📚 View All Guides for {selectedAspect}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Your Progress - Journey-Oriented */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Your Biosecurity Journey Progress
        </h2>

        {/* Overall Journey Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Overall Biosecurity Journey
            </span>
            <span className="text-lg font-bold text-gray-900">
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
          <Progress
            value={Math.round(
              (biosecurityPhases.filter(
                phase => getPhaseProgress(phase.id).percentage === 100
              ).length /
                biosecurityPhases.length) *
                100
            )}
            className="h-4 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-green-500"
          />
          <div className="mt-2 text-sm text-gray-600">
            {
              biosecurityPhases.filter(
                phase => getPhaseProgress(phase.id).percentage === 100
              ).length
            }{" "}
            of {biosecurityPhases.length} phases completed
          </div>
        </div>

        {/* Phase Completion Overview */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-900">
            Phase Progress
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {biosecurityPhases.map(phase => {
              const progress = getPhaseProgress(phase.id);
              const isCompleted = progress.percentage === 100;
              const isCurrent = phase.id === currentPhase.id;

              return (
                <div
                  key={phase.id}
                  className={`rounded-lg border p-4 ${
                    isCompleted
                      ? "border-green-200 bg-green-50"
                      : isCurrent
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{phase.name}</h4>
                    <div
                      className={`rounded-full p-1 ${
                        isCompleted
                          ? "bg-green-500"
                          : isCurrent
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    {progress.completed} of {progress.total} steps completed
                  </div>
                  <Progress
                    value={progress.percentage}
                    className={`h-2 ${
                      isCompleted
                        ? "[&>div]:bg-green-500"
                        : isCurrent
                          ? "[&>div]:bg-blue-500"
                          : "[&>div]:bg-gray-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Milestones */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-blue-600">
              {currentPhase.id}
            </div>
            <div className="text-sm font-medium text-blue-700">
              Current Phase
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {
                  biosecurityPhases.filter(
                    phase => getPhaseProgress(phase.id).percentage === 100
                  ).length
                }
              </span>
            </div>
            <div className="text-sm font-medium text-green-700">
              Phases Complete
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-purple-600">
              {currentTasks.filter(t => t.status === "completed").length}
            </div>
            <div className="text-sm font-medium text-purple-700">
              Total Tasks Done
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">
                {
                  currentTasks.filter(
                    t => t.priority === "critical" && t.status !== "completed"
                  ).length
                }
              </span>
            </div>
            <div className="text-sm font-medium text-orange-700">
              Critical Remaining
            </div>
          </div>
        </div>

        {/* Journey Milestone Achievement */}
        {biosecurityPhases.filter(
          phase => getPhaseProgress(phase.id).percentage === 100
        ).length > 0 && (
          <div className="mt-6 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500 p-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  🎉 Milestone Achieved!
                </h4>
                <p className="text-sm text-gray-600">
                  You've completed{" "}
                  {
                    biosecurityPhases.filter(
                      phase => getPhaseProgress(phase.id).percentage === 100
                    ).length
                  }{" "}
                  phase(s) of your biosecurity journey. Keep up the excellent
                  work!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
