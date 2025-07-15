"use client";

import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Droplets,
  Info,
  Shield,
  Trash2,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { HowToGuideView } from "@/components/shared/how-to-guide-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add a helper function to parse the estimated cost. Place this outside the component function.
function parseEstimatedCost(costString: string): number {
  const cleanedString = costString.replace(/[₱,]/g, ""); // Remove peso sign and commas
  const parts = cleanedString.split("-");
  if (parts.length === 2) {
    return Number.parseFloat(parts[1].trim()); // Use the upper bound of the range
  }
  return Number.parseFloat(parts[0].trim()); // Use the single value
}

// Helpers to style tasks ----------------------------------------------

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
// ----------------------------------------------------------------------

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
  icon?: any; // Make icon optional as AI won't generate it directly
}

interface BiosecurityPlanProps {
  farmProfile: any;
}

// Helper to map categories to Lucide icons
const categoryIcons: { [key: string]: any } = {
  Infrastructure: Building,
  "Access Control": Shield,
  "Water Management": Droplets,
  "Human Resources": Users,
  "Feed Management": Truck,
  "Pond Management": Droplets, // Can be more specific if needed
  "Equipment Management": Wrench,
  "Waste Management": Trash2,
  "Animal Health": Activity,
  // Add more mappings as needed
};

export function BiosecurityPlan({ farmProfile }: BiosecurityPlanProps) {
  const [maxBudget, setMaxBudget] = useState<number | string>("");
  const [selectedTaskForGuide, setSelectedTaskForGuide] =
    useState<BiosecurityTask | null>(null);
  const [aiGeneratedTasks, setAiGeneratedTasks] = useState<
    BiosecurityTask[] | null
  >(null); // State for AI-generated tasks

  // New state for sorting and filtering
  const [sortBy, setSortBy] = useState<string>("priority");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Default tasks if no AI plan is generated
  const defaultTasks: BiosecurityTask[] = [
    {
      id: "1",
      title: "Emergency Pond Dyke Inspection",
      description:
        "Inspect all pond dykes for damage due to incoming heavy rains. Check for cracks, erosion, or weak spots.",
      priority: "critical",
      status: "pending",
      category: "Infrastructure",
      estimatedCost: "₱500-1,000",
      timeframe: "Today",
      adaptationReason: "Prioritized due to typhoon alert",
      icon: Droplets,
    },
    {
      id: "2",
      title: "Enhanced Visitor Disinfection Protocol",
      description:
        "Implement strict footbath and vehicle disinfection due to nearby farm disease outbreak.",
      priority: "critical",
      status: "in-progress",
      category: "Access Control",
      estimatedCost: "₱200-500",
      timeframe: "Immediate",
      adaptationReason: "Elevated due to neighbor farm outbreak",
      icon: Shield,
    },
    {
      id: "3",
      title: "Water Quality Monitoring Increase",
      description:
        "Double daily water parameter checks (pH, DO, temperature) during weather disturbance.",
      priority: "high",
      status: "pending",
      category: "Water Management",
      estimatedCost: "₱0 (existing equipment)",
      timeframe: "Next 7 days",
      icon: Droplets,
    },
    {
      id: "4",
      title: "Staff Biosecurity Training Refresher",
      description:
        "Conduct emergency biosecurity protocol review with all farm workers.",
      priority: "high",
      status: "completed",
      category: "Human Resources",
      estimatedCost: "₱300-500",
      timeframe: "This week",
      icon: Users,
    },
    {
      id: "5",
      title: "Feed Storage Waterproofing",
      description:
        "Secure feed storage areas against water damage from heavy rains.",
      priority: "medium",
      status: "pending",
      category: "Feed Management",
      estimatedCost: "₱1,000-2,000",
      timeframe: "Within 3 days",
      icon: Truck,
    },
    {
      id: "6",
      title: "Regular Pond Preparation",
      description:
        "Standard cleaning and disinfection of ponds before stocking.",
      priority: "medium",
      status: "completed",
      category: "Pond Management",
      estimatedCost: "₱1,500-3,000",
      timeframe: "Before each cycle",
      icon: Droplets,
    },
    {
      id: "7",
      title: "Equipment Disinfection Routine",
      description: "Daily disinfection of all shared farm equipment.",
      priority: "medium",
      status: "pending",
      category: "Equipment Management",
      estimatedCost: "₱100-200",
      timeframe: "Daily",
      icon: Wrench,
    },
    {
      id: "8",
      title: "Waste Management Protocol",
      description:
        "Proper disposal of dead shrimp and farm waste to prevent disease spread.",
      priority: "high",
      status: "pending",
      category: "Waste Management",
      estimatedCost: "₱50-100",
      timeframe: "Daily",
      icon: Trash2,
    },
  ];

  // Effect to load AI-generated plan from localStorage on component mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("aiGeneratedPlan");
    if (storedPlan) {
      try {
        const parsedPlan: BiosecurityTask[] = JSON.parse(storedPlan);
        // Assign IDs and default status if not present (from AI generation)
        const tasksWithDefaults = parsedPlan.map((task, index) => ({
          ...task,
          id: task.id || `ai-task-${index}`,
          status:
            (task.status as "completed" | "in-progress" | "pending") ||
            "pending",
        }));
        setAiGeneratedTasks(tasksWithDefaults);
        localStorage.removeItem("aiGeneratedPlan"); // Clear after use
      } catch (error) {
        console.error(
          "Failed to parse AI generated plan from localStorage:",
          error
        );
        setAiGeneratedTasks(null); // Fallback to default if parsing fails
      }
    }
  }, []);

  const currentTasks = aiGeneratedTasks || defaultTasks; // Use AI tasks if available, else default

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
    } else {
      // If using default tasks, update them in a local state
      const updatedDefaultTasks = defaultTasks.map(task => {
        if (task.id === taskId) {
          const newStatus: "completed" | "in-progress" | "pending" =
            task.status === "completed" ? "pending" : "completed";
          return { ...task, status: newStatus };
        }
        return task;
      });
      setAiGeneratedTasks(null); // Force re-evaluation to use defaultTasks if no AI plan
    }
  };

  // Re-evaluate currentTasks based on the updated status
  const tasksToDisplay = aiGeneratedTasks || defaultTasks;

  // Apply status and category filters first
  const filteredTasks = tasksToDisplay.filter(task => {
    const statusMatch = filterStatus === "all" || task.status === filterStatus;
    const categoryMatch =
      filterCategory === "all" || task.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  // Apply sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case "category":
        return a.category.localeCompare(b.category);
      case "status":
        const statusOrder = { pending: 0, "in-progress": 1, completed: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      case "timeframe":
        // Simple alphabetical sort for timeframe (could be enhanced with date parsing)
        return a.timeframe.localeCompare(b.timeframe);
      case "cost":
        return (
          parseEstimatedCost(a.estimatedCost) -
          parseEstimatedCost(b.estimatedCost)
        );
      default:
        return 0;
    }
  });

  // Apply budget filter last
  const tasksFilteredByBudget = sortedTasks.filter(task => {
    if (maxBudget === "" || isNaN(Number(maxBudget))) return true; // Show all if no budget or invalid input
    const budget = Number(maxBudget);
    const estimatedCostValue = parseEstimatedCost(task.estimatedCost);
    return estimatedCostValue <= budget;
  });

  const completedTasksCount = tasksFilteredByBudget.filter(
    task => task.status === "completed"
  ).length;
  const progressPercentage = tasksFilteredByBudget.length
    ? Math.round((completedTasksCount / tasksFilteredByBudget.length) * 100)
    : 0;

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
    <div className="space-y-6">
      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Dynamic Biosecurity Action Plan
          </CardTitle>
          <CardDescription>
            AI-adapted plan based on current farm conditions and external
            factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Budget Input Section */}
            <div className="space-y-2">
              <Label htmlFor="max-budget" className="text-sm font-medium">
                Maximum Budget (₱)
              </Label>
              <Input
                id="max-budget"
                type="number"
                placeholder="e.g., 5000"
                value={maxBudget}
                onChange={e => setMaxBudget(e.target.value)}
                className="w-full md:w-1/2"
              />
              <p className="text-xs text-gray-500">
                Enter your available budget to filter suggested tasks.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {completedTasksCount}/{tasksFilteredByBudget.length} tasks
                completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {
                    tasksFilteredByBudget.filter(t => t.priority === "critical")
                      .length
                  }
                </p>
                <p className="text-sm text-red-700">Critical Tasks</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {
                    tasksFilteredByBudget.filter(t => t.priority === "high")
                      .length
                  }
                </p>
                <p className="text-sm text-orange-700">High Priority</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {tasksFilteredByBudget.filter(t => t.adaptationReason).length}
                </p>
                <p className="text-sm text-blue-700">AI Adaptations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Prioritized Action Items
        </h3>

        {/* Sort and Filter Controls */}
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="sort-by" className="text-sm font-medium">
              Sort by
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="timeframe">Timeframe</SelectItem>
                <SelectItem value="cost">Estimated Cost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-status" className="text-sm font-medium">
              Filter by Status
            </Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="filter-status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-category" className="text-sm font-medium">
              Filter by Category
            </Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger id="filter-category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Access Control">Access Control</SelectItem>
                <SelectItem value="Water Management">
                  Water Management
                </SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Feed Management">Feed Management</SelectItem>
                <SelectItem value="Pond Management">Pond Management</SelectItem>
                <SelectItem value="Equipment Management">
                  Equipment Management
                </SelectItem>
                <SelectItem value="Waste Management">
                  Waste Management
                </SelectItem>
                <SelectItem value="Animal Health">Animal Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {tasksFilteredByBudget.length > 0 ? (
          tasksFilteredByBudget.map(task => {
            const IconComponent = categoryIcons[task.category] || Zap; // Fallback icon
            return (
              <Card
                key={task.id}
                className={`border-l-4 ${
                  task.priority === "critical"
                    ? "border-l-red-500"
                    : task.priority === "high"
                      ? "border-l-orange-500"
                      : task.priority === "medium"
                        ? "border-l-yellow-500"
                        : "border-l-green-500"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <CardTitle className="text-base">
                            {task.title}
                          </CardTitle>
                          {getStatusIcon(task.status)}
                        </div>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <p className="font-medium text-gray-600">Category</p>
                      <p className="text-gray-800">{task.category}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Est. Cost</p>
                      <p className="text-gray-800">{task.estimatedCost}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Timeframe</p>
                      <p className="text-gray-800">{task.timeframe}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTaskForGuide(task)}
                      >
                        Get How-To Guide
                      </Button>
                    </div>
                  </div>

                  {task.adaptationReason && (
                    <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-medium text-blue-800">
                          AI Adaptation
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-blue-700">
                        {task.adaptationReason}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="py-10 text-center text-gray-500">
            {maxBudget !== "" && !isNaN(Number(maxBudget))
              ? "No tasks found within your specified budget."
              : "No tasks available. Please submit a farm assessment to generate a personalized plan."}
          </div>
        )}
        {tasksFilteredByBudget.filter(task => {
          if (maxBudget === "" || isNaN(Number(maxBudget))) return false;
          const budget = Number(maxBudget);
          const estimatedCostValue = parseEstimatedCost(task.estimatedCost);
          return estimatedCostValue > budget;
        }).length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Some tasks are hidden because they exceed your budget of{" "}
            {Number(maxBudget).toLocaleString()} ₱.
          </div>
        )}

        {/* Results summary */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {tasksFilteredByBudget.length} of {tasksToDisplay.length}{" "}
          tasks
          {filterStatus !== "all" && ` • Status: ${filterStatus}`}
          {filterCategory !== "all" && ` • Category: ${filterCategory}`}
          {maxBudget !== "" &&
            !isNaN(Number(maxBudget)) &&
            ` • Budget: ≤₱${Number(maxBudget).toLocaleString()}`}
        </div>
      </div>
    </div>
  );
}
