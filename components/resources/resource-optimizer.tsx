"use client";

import {
  ArrowRight,
  Bookmark,
  Calculator,
  Check,
  CheckCircle,
  Clock,
  Download,
  Droplets,
  FileText,
  Lightbulb,
  Loader2,
  Pencil,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
interface InvestmentInput {
  budget: string;
  timeline: string;
  improvementAreas: string[];
}

interface Recommendation {
  id: string;
  title: string;
  category: string;
  estimatedCost: number;
  projectedROI: number;
  likaiTip: string;
  benefit: string;
  categoryColor: string;
  icon: any;
  knowledgeBaseLink: string;
}

interface InvestmentPlan {
  recommendations: Recommendation[];
  totalInvestment: number;
  projectedAnnualSavings: number;
  averageROI: number;
}

type ViewState = "input" | "loading" | "results";

export default function ResourceOptimizer() {
  const [viewState, setViewState] = useState<ViewState>("input");
  const [input, setInput] = useState<InvestmentInput>({
    budget: "",
    timeline: "",
    improvementAreas: [],
  });
  const [investmentPlan, setInvestmentPlan] = useState<InvestmentPlan | null>(
    null
  );
  const [showAddToPlanModal, setShowAddToPlanModal] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Track saved recommendations by ID
  const [savedRecommendations, setSavedRecommendations] = useState<{
    [id: string]: boolean;
  }>(() => ({}));

  // Saved plans state
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  // Recent history state
  const [recentPlans, setRecentPlans] = useState<any[]>([]);
  // Collapsed state for new plan form
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);

  // Budget options
  const budgetOptions = [
    { value: "10000-50000", label: "Php 10,000 - 50,000" },
    { value: "50001-200000", label: "Php 50,001 - 200,000" },
    { value: "200001-500000", label: "Php 200,001 - 500,000" },
    { value: "500000+", label: "More than Php 500,000" },
  ];

  // Timeline options
  const timelineOptions = [
    { value: "3-months", label: "Next 3 months" },
    { value: "6-months", label: "Next 6 months" },
    { value: "12-months", label: "Next 12 months" },
    { value: "long-term", label: "Long-term" },
  ];

  // Improvement areas (matching Health Report categories)
  const improvementAreas = [
    {
      id: "pond-water",
      label: "Pond & Water Care",
      icon: Droplets,
      color: "text-blue-600",
    },
    {
      id: "access-control",
      label: "Farm Access Control",
      icon: Shield,
      color: "text-emerald-600",
    },
    {
      id: "feed-management",
      label: "Feed Management",
      icon: UtensilsCrossed,
      color: "text-amber-600",
    },
    {
      id: "disease-readiness",
      label: "Disease Readiness",
      icon: Target,
      color: "text-violet-600",
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: Droplets,
      color: "text-cyan-600",
    },
  ];

  // Simulate AI recommendation generation
  const generateInvestmentPlan = async () => {
    setViewState("loading");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock recommendations based on input
    const mockRecommendations: Recommendation[] = [
      {
        id: "water-sensors",
        title: "Water Quality Sensors",
        category: "Pond & Water Care",
        estimatedCost: 8500,
        projectedROI: 240,
        likaiTip: "DIY pH monitoring system using Arduino sensors",
        benefit:
          "Prevent disease outbreaks and reduce feed waste through early water quality alerts.",
        categoryColor: "bg-blue-50 border-blue-200 text-blue-700",
        icon: Droplets,
        knowledgeBaseLink: "/knowledge#water-quality-testing",
      },
      {
        id: "aeration-upgrade",
        title: "Pond Aeration Upgrade",
        category: "Pond & Water Care",
        estimatedCost: 15000,
        projectedROI: 180,
        likaiTip: "Solar-powered paddle wheel aerator for cost savings",
        benefit:
          "Improve oxygen levels and reduce electricity costs with renewable energy.",
        categoryColor: "bg-blue-50 border-blue-200 text-blue-700",
        icon: Droplets,
        knowledgeBaseLink: "/knowledge#pond-preparation",
      },
      {
        id: "feed-timer",
        title: "Automated Feeding Timer",
        category: "Feed Management",
        estimatedCost: 6500,
        projectedROI: 320,
        likaiTip: "Programmable timer with multiple feeding schedules",
        benefit:
          "Reduce feed waste and optimize growth rates through consistent feeding.",
        categoryColor: "bg-amber-50 border-amber-200 text-amber-700",
        icon: Timer,
        knowledgeBaseLink: "/knowledge#feeding-schedule",
      },
      {
        id: "disinfection-station",
        title: "Enhanced Disinfection Station",
        category: "Farm Access Control",
        estimatedCost: 4200,
        projectedROI: 450,
        likaiTip:
          "Build with locally-sourced materials and automatic spray system",
        benefit:
          "Prevent disease introduction and meet biosecurity standards effectively.",
        categoryColor: "bg-emerald-50 border-emerald-200 text-emerald-700",
        icon: Shield,
        knowledgeBaseLink: "/knowledge#disinfection-station",
      },
      {
        id: "backup-generator",
        title: "Emergency Backup Generator",
        category: "Infrastructure",
        estimatedCost: 12000,
        projectedROI: 200,
        likaiTip:
          "Hybrid solar-diesel generator for reliability and efficiency",
        benefit:
          "Protect your investment during power outages and severe weather events.",
        categoryColor: "bg-cyan-50 border-cyan-200 text-cyan-700",
        icon: Droplets,
        knowledgeBaseLink: "/knowledge#emergency-response",
      },
    ];

    // Filter recommendations based on selected improvement areas
    const filteredRecommendations = mockRecommendations.filter(rec =>
      input.improvementAreas.some(area =>
        rec.category.toLowerCase().includes(area.replace("-", " "))
      )
    );

    // Calculate budget-appropriate recommendations
    const budgetRange = input.budget.split("-");
    const maxBudget =
      input.budget === "500000+"
        ? 500000
        : parseInt(budgetRange[1] || budgetRange[0]);

    let totalCost = 0;
    const selectedRecommendations = filteredRecommendations.filter(rec => {
      if (totalCost + rec.estimatedCost <= maxBudget) {
        totalCost += rec.estimatedCost;
        return true;
      }
      return false;
    });

    const totalInvestment = selectedRecommendations.reduce(
      (sum, rec) => sum + rec.estimatedCost,
      0
    );
    const projectedAnnualSavings = selectedRecommendations.reduce(
      (sum, rec) => sum + (rec.estimatedCost * rec.projectedROI) / 100,
      0
    );
    const averageROI =
      selectedRecommendations.length > 0
        ? Math.round(
            selectedRecommendations.reduce(
              (sum, rec) => sum + rec.projectedROI,
              0
            ) / selectedRecommendations.length
          )
        : 0;

    setInvestmentPlan({
      recommendations: selectedRecommendations,
      totalInvestment,
      projectedAnnualSavings,
      averageROI,
    });

    // Save to recent history
    const newRecent = {
      input,
      investmentPlan: {
        recommendations: selectedRecommendations,
        totalInvestment,
        projectedAnnualSavings,
        averageROI,
      },
      generatedAt: new Date().toISOString(),
    };
    const history = JSON.parse(
      localStorage.getItem("recentInvestmentPlans") || "[]"
    );
    history.unshift(newRecent);
    localStorage.setItem(
      "recentInvestmentPlans",
      JSON.stringify(history.slice(0, 10))
    );
    setRecentPlans(history.slice(0, 10));
    setViewState("results");
  };

  const handleAreaToggle = (areaId: string, checked: boolean) => {
    setInput(prev => ({
      ...prev,
      improvementAreas: checked
        ? [...prev.improvementAreas, areaId]
        : prev.improvementAreas.filter(id => id !== areaId),
    }));
  };

  const resetForm = () => {
    setViewState("input");
    setInput({ budget: "", timeline: "", improvementAreas: [] });
    setInvestmentPlan(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Save plan to localStorage (placeholder for real backend)
  const handleSavePlan = () => {
    const savedPlans = JSON.parse(
      localStorage.getItem("savedInvestmentPlans") || "[]"
    );
    savedPlans.push({
      input,
      investmentPlan,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("savedInvestmentPlans", JSON.stringify(savedPlans));
    setSaveMessage(
      "Plan saved! You can view it in 'My Saved Investment Plans'."
    );
    setTimeout(() => setSaveMessage(null), 2500);
  };

  // Add to My GAqP Plan (placeholder: show modal/alert)
  const handleAddToGAqPPlan = () => {
    setShowAddToPlanModal(true);
    setSelectedUpgrades(investmentPlan?.recommendations.map(r => r.id) || []);
  };

  const handleUpgradeToggle = (id: string, checked: boolean) => {
    setSelectedUpgrades(prev =>
      checked ? [...prev, id] : prev.filter(upg => upg !== id)
    );
  };

  const handleConfirmAddToPlan = () => {
    setShowAddToPlanModal(false);
    alert(
      `Added ${selectedUpgrades.length} upgrade(s) to your GAqP Plan! (Integrate with main checklist as needed)`
    );
  };

  // Load saved and recent plans on mount
  useEffect(() => {
    const plans = JSON.parse(
      localStorage.getItem("savedInvestmentPlans") || "[]"
    );
    setSavedPlans(plans);
    const history = JSON.parse(
      localStorage.getItem("recentInvestmentPlans") || "[]"
    );
    setRecentPlans(history);
  }, []);

  // Load saved recommendations from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRecs = JSON.parse(
        localStorage.getItem("savedRecommendations") || "[]"
      );
      const state: { [id: string]: boolean } = {};
      savedRecs.forEach((rec: any) => {
        state[rec.id] = true;
      });
      setSavedRecommendations(state);
    }
  }, []);

  if (viewState === "input") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold lg:text-2xl">
            <Calculator className="h-6 w-6 text-orange-600" />
            Plan Your Farm Upgrades: Smart Investment
          </CardTitle>
          <CardDescription className="text-base">
            Tell us your budget and timeline, and LikAI's AI will suggest the
            best biosecurity upgrades for your farm, showing you how much you
            can save!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Wallet className="h-4 w-4 text-green-600" />
              What is your estimated budget for upgrades?
            </label>
            <Select
              value={input.budget}
              onValueChange={value =>
                setInput(prev => ({ ...prev, budget: value }))
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue
                  placeholder="e.g., Php 50,000 - 200,000"
                  className="text-gray-400"
                />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timeline Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Clock className="h-4 w-4 text-blue-600" />
              What is your preferred timeline?
            </label>
            <Select
              value={input.timeline}
              onValueChange={value =>
                setInput(prev => ({ ...prev, timeline: value }))
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue
                  placeholder="e.g., Next 6 months"
                  className="text-gray-400"
                />
              </SelectTrigger>
              <SelectContent>
                {timelineOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Improvement Areas */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-900">
              What areas do you want to improve?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
              {improvementAreas.map(area => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.id}
                    className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                  >
                    <Checkbox
                      id={area.id}
                      checked={input.improvementAreas.includes(area.id)}
                      onCheckedChange={checked =>
                        handleAreaToggle(area.id, checked as boolean)
                      }
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={area.id}
                      className="flex flex-1 cursor-pointer select-none items-center gap-3 text-sm font-medium"
                    >
                      <Icon className={`h-5 w-5 ${area.color}`} />
                      <span>{area.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
            {input.improvementAreas.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">
                Please select at least one area to focus your investment plan.
              </p>
            )}
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateInvestmentPlan}
            disabled={
              !input.budget ||
              !input.timeline ||
              input.improvementAreas.length === 0
            }
            className="h-12 w-full bg-orange-600 text-base font-semibold text-white hover:bg-orange-700"
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Generate Investment Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (viewState === "loading") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="relative">
            <Calculator className="h-12 w-12 text-orange-600" />
            <Loader2 className="absolute -right-1 -top-1 h-6 w-6 animate-spin text-orange-600" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              LikAI is Calculating Your Smart Investments!
            </h3>
            <p className="max-w-md text-gray-600">
              Our AI is analyzing your farm's needs and budget to find the most
              impactful biosecurity upgrades for you.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing investment opportunities...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (viewState === "results" && investmentPlan) {
    const selectedBudgetLabel = budgetOptions.find(
      b => b.value === input.budget
    )?.label;
    const selectedTimelineLabel = timelineOptions.find(
      t => t.value === input.timeline
    )?.label;

    return (
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetForm}
              size="sm"
              className="border-orange-600 text-orange-700 hover:bg-orange-50"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Adjust Inputs
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              size="sm"
              className="border-blue-400 text-blue-700 hover:bg-blue-50"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              New Plan
            </Button>
          </div>
          {saveMessage && (
            <span className="text-sm font-medium text-green-700">
              {saveMessage}
            </span>
          )}
        </div>

        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Your Smart Investment Plan: High ROI Upgrades
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-4 text-sm">
              <span>
                <strong>Budget:</strong> {selectedBudgetLabel}
              </span>
              <span>
                <strong>Timeline:</strong> {selectedTimelineLabel}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recommended Upgrades
          </h3>

          {investmentPlan.recommendations.map(recommendation => {
            const Icon = recommendation.icon;
            const isSaved = !!savedRecommendations[recommendation.id];
            const handleSaveRecommendation = () => {
              if (!isSaved) {
                const savedRecs = JSON.parse(
                  localStorage.getItem("savedRecommendations") || "[]"
                );
                savedRecs.push({
                  ...recommendation,
                  savedAt: new Date().toISOString(),
                });
                localStorage.setItem(
                  "savedRecommendations",
                  JSON.stringify(savedRecs)
                );
                setSavedRecommendations(prev => ({
                  ...prev,
                  [recommendation.id]: true,
                }));
                setSaveMessage(`Saved '${recommendation.title}'!`);
                setTimeout(() => setSaveMessage(null), 2000);
              }
            };
            // Enhanced card for Enhanced Disinfection Station
            if (recommendation.id === "disinfection-station") {
              return (
                <Card
                  key={recommendation.id}
                  className="border-2 border-emerald-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                            Enhanced Disinfection Station
                            <Badge className="ml-2 border-emerald-200 bg-emerald-50 text-emerald-700">
                              Farm Access Control
                            </Badge>
                          </h4>
                          <Button
                            variant={isSaved ? "default" : "outline"}
                            size="sm"
                            aria-label={isSaved ? "Saved" : "Save for Later"}
                            onClick={handleSaveRecommendation}
                            disabled={isSaved}
                            className={
                              isSaved
                                ? "border-green-600 bg-green-600 text-white hover:border-green-700 hover:bg-green-700"
                                : "border-orange-300 text-orange-700 hover:bg-orange-50"
                            }
                          >
                            {isSaved ? (
                              <>
                                <Check className="mr-2 h-5 w-5" /> Saved
                              </>
                            ) : (
                              <>
                                <Bookmark className="mr-2 h-5 w-5" /> Save for
                                Later
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="flex gap-6">
                          <div>
                            <span className="text-sm text-gray-600">
                              Estimated Cost
                            </span>
                            <p className="text-xl font-bold text-gray-900">
                              {formatCurrency(recommendation.estimatedCost)}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">
                              Projected ROI
                            </span>
                            <p className="text-xl font-bold text-green-600">
                              {recommendation.projectedROI}%
                            </p>
                          </div>
                        </div>
                        <div className="border-l-4 border-emerald-400 bg-emerald-50 p-4">
                          <div className="mb-1 font-semibold text-emerald-800">
                            Why It's Important (GAqP Rationale):
                          </div>
                          <div className="text-sm text-gray-700">
                            The GAqP manual requires disinfection points at all
                            farm entrances. An effective disinfection station is
                            a critical biosecurity barrier that kills pathogens
                            on vehicles and equipment, preventing the
                            introduction of devastating diseases that can wipe
                            out your entire crop.
                          </div>
                        </div>
                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                          <div className="mb-1 font-semibold text-emerald-800">
                            Key Benefits & Possible Savings:
                          </div>
                          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                            <li>
                              ✔️ Prevents Disease: Directly addresses the #1
                              risk to your farm's success.
                            </li>
                            <li>
                              ✔️ Reduces Treatment Costs: Avoids the need for
                              expensive antibiotics and chemicals later.
                            </li>
                            <li>
                              ✔️ Meets Certification Standards: A mandatory
                              requirement for BFAR GAqP certification.
                            </li>
                          </ul>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          Projected Annual Savings:{" "}
                          <span className="font-bold text-green-700">
                            ~₱18,900
                          </span>
                        </div>
                        <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                              LikAI Tip (Resource-Optimized)
                            </span>
                            <p className="mt-1 text-sm text-orange-700">
                              {recommendation.likaiTip}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-blue-200 bg-blue-50 font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                          onClick={() =>
                            (window.location.href =
                              recommendation.knowledgeBaseLink)
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View How-To Guide
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            return (
              <Card
                key={recommendation.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border ${recommendation.categoryColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {recommendation.title}
                        </h4>
                        <Button
                          variant={isSaved ? "default" : "outline"}
                          size="sm"
                          aria-label={isSaved ? "Saved" : "Save for Later"}
                          onClick={handleSaveRecommendation}
                          disabled={isSaved}
                          className={
                            isSaved
                              ? "border-green-600 bg-green-600 text-white hover:border-green-700 hover:bg-green-700"
                              : "border-orange-300 text-orange-700 hover:bg-orange-50"
                          }
                        >
                          {isSaved ? (
                            <>
                              <Check className="mr-2 h-5 w-5" /> Saved
                            </>
                          ) : (
                            <>
                              <Bookmark className="mr-2 h-5 w-5" /> Save for
                              Later
                            </>
                          )}
                        </Button>
                      </div>
                      <Badge
                        className={`mt-1 ${recommendation.categoryColor} border`}
                      >
                        {recommendation.category}
                      </Badge>
                      {/* LikAI Tip */}
                      <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                        <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                            LikAI Tip (Resource-Optimized)
                          </span>
                          <p className="mt-1 text-sm text-orange-700">
                            {recommendation.likaiTip}
                          </p>
                        </div>
                      </div>

                      {/* Cost and ROI */}
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-sm text-gray-600">
                            Estimated Cost
                          </span>
                          <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(recommendation.estimatedCost)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            Projected ROI
                          </span>
                          <p className="text-xl font-bold text-green-600">
                            {recommendation.projectedROI}%
                          </p>
                        </div>
                      </div>

                      {/* Benefit */}
                      <p className="text-gray-700">{recommendation.benefit}</p>

                      {/* Learn More Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 border-blue-200 bg-blue-50 font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                        onClick={() =>
                          (window.location.href =
                            recommendation.knowledgeBaseLink)
                        }
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View How-To Guide
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Investment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-sm text-green-700">Total Investment</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(investmentPlan.totalInvestment)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-700">
                  Projected Annual Savings
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(investmentPlan.projectedAnnualSavings)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-green-700">Average ROI</p>
                <p className="text-2xl font-bold text-green-900">
                  {investmentPlan.averageROI}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 bg-green-700 text-white hover:bg-green-800"
            size="lg"
            onClick={handleAddToGAqPPlan}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Add to My GAqP Plan
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Investment Report (PDF)
          </Button>
        </div>
        {/* Add to Plan Modal (simple implementation) */}
        {showAddToPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <button
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowAddToPlanModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-4 text-lg font-bold">
                Select Upgrades to Add to Your GAqP Plan
              </h3>
              <div className="mb-4 space-y-3">
                {investmentPlan.recommendations.map(rec => (
                  <div key={rec.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`add-upgrade-${rec.id}`}
                      checked={selectedUpgrades.includes(rec.id)}
                      onCheckedChange={checked =>
                        handleUpgradeToggle(rec.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`add-upgrade-${rec.id}`}
                      className="text-gray-800"
                    >
                      {rec.title}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-green-700 text-white hover:bg-green-800"
                onClick={handleConfirmAddToPlan}
              >
                Add Selected Upgrades
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Top-level layout
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* My Saved Plans Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">My Saved Plans</h2>
        {savedPlans.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-6 text-gray-500">
            No saved plans yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {savedPlans.map((plan, idx) => (
              <Card key={idx} className="border-2 border-orange-200">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-orange-800">
                      High-ROI Upgrades -{" "}
                      {plan.input.timeline.replace("-", " ")}
                    </div>
                    <span className="text-xs text-gray-500">
                      Saved on {new Date(plan.savedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    Total Investment:{" "}
                    <span className="font-semibold">
                      {formatCurrency(plan.investmentPlan.totalInvestment)}
                    </span>{" "}
                    | Projected Savings:{" "}
                    <span className="font-semibold">
                      {formatCurrency(
                        plan.investmentPlan.projectedAnnualSavings
                      )}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setInvestmentPlan(plan.investmentPlan);
                        setViewState("results");
                      }}
                    >
                      View Plan
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const updated = savedPlans.filter((_, i) => i !== idx);
                        setSavedPlans(updated);
                        localStorage.setItem(
                          "savedInvestmentPlans",
                          JSON.stringify(updated)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Create a New Investment Plan Section */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Create a New Investment Plan
          </h2>
          <Button
            onClick={() => setShowNewPlanForm(v => !v)}
            variant="outline"
            className="border-blue-400 text-blue-700"
          >
            {showNewPlanForm ? "Hide" : "✨ Generate New Plan"}
          </Button>
        </div>
        <p className="mb-4 text-gray-600">
          Tell us your budget and goals to get a new set of recommendations.
        </p>
        {showNewPlanForm && (
          <Card>
            <CardContent className="space-y-6">
              {/* Budget Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Wallet className="h-4 w-4 text-green-600" />
                  What is your estimated budget for upgrades?
                </label>
                <Select
                  value={input.budget}
                  onValueChange={value =>
                    setInput(prev => ({ ...prev, budget: value }))
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder="e.g., Php 50,000 - 200,000"
                      className="text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Clock className="h-4 w-4 text-blue-600" />
                  What is your preferred timeline?
                </label>
                <Select
                  value={input.timeline}
                  onValueChange={value =>
                    setInput(prev => ({ ...prev, timeline: value }))
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder="e.g., Next 6 months"
                      className="text-gray-400"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Improvement Areas */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">
                  What areas do you want to improve?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  {improvementAreas.map(area => {
                    const Icon = area.icon;
                    return (
                      <div
                        key={area.id}
                        className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                      >
                        <Checkbox
                          id={area.id}
                          checked={input.improvementAreas.includes(area.id)}
                          onCheckedChange={checked =>
                            handleAreaToggle(area.id, checked as boolean)
                          }
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={area.id}
                          className="flex flex-1 cursor-pointer select-none items-center gap-3 text-sm font-medium"
                        >
                          <Icon className={`h-5 w-5 ${area.color}`} />
                          <span>{area.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
                {input.improvementAreas.length === 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    Please select at least one area to focus your investment
                    plan.
                  </p>
                )}
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateInvestmentPlan}
                disabled={
                  !input.budget ||
                  !input.timeline ||
                  input.improvementAreas.length === 0
                }
                className="h-12 w-full bg-orange-600 text-base font-semibold text-white hover:bg-orange-700"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Generate Investment Plan
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Recent History Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Recent History</h2>
        {recentPlans.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-6 text-gray-500">
            No recent plans yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {recentPlans.map((plan, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between rounded border p-3"
              >
                <span>
                  Plan generated on{" "}
                  {new Date(plan.generatedAt).toLocaleDateString()} (Budget:{" "}
                  {plan.input.budget}, Timeline: {plan.input.timeline})
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setInvestmentPlan(plan.investmentPlan);
                    setViewState("results");
                  }}
                >
                  View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Results view and rest of the UI */}
      {viewState === "results" && investmentPlan && (
        <div className="space-y-6">
          {/* Top Action Bar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetForm}
                size="sm"
                className="border-orange-600 text-orange-700 hover:bg-orange-50"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Adjust Inputs
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                size="sm"
                className="border-blue-400 text-blue-700 hover:bg-blue-50"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                New Plan
              </Button>
            </div>
            {saveMessage && (
              <span className="text-sm font-medium text-green-700">
                {saveMessage}
              </span>
            )}
          </div>

          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Your Smart Investment Plan: High ROI Upgrades
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-4 text-sm">
                <span>
                  <strong>Budget:</strong> {selectedBudgetLabel}
                </span>
                <span>
                  <strong>Timeline:</strong> {selectedTimelineLabel}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recommended Upgrades
            </h3>

            {investmentPlan.recommendations.map(recommendation => {
              const Icon = recommendation.icon;
              const isSaved = !!savedRecommendations[recommendation.id];
              const handleSaveRecommendation = () => {
                if (!isSaved) {
                  const savedRecs = JSON.parse(
                    localStorage.getItem("savedRecommendations") || "[]"
                  );
                  savedRecs.push({
                    ...recommendation,
                    savedAt: new Date().toISOString(),
                  });
                  localStorage.setItem(
                    "savedRecommendations",
                    JSON.stringify(savedRecs)
                  );
                  setSavedRecommendations(prev => ({
                    ...prev,
                    [recommendation.id]: true,
                  }));
                  setSaveMessage(`Saved '${recommendation.title}'!`);
                  setTimeout(() => setSaveMessage(null), 2000);
                }
              };
              // Enhanced card for Enhanced Disinfection Station
              if (recommendation.id === "disinfection-station") {
                return (
                  <Card
                    key={recommendation.id}
                    className="border-2 border-emerald-200 transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                              Enhanced Disinfection Station
                              <Badge className="ml-2 border-emerald-200 bg-emerald-50 text-emerald-700">
                                Farm Access Control
                              </Badge>
                            </h4>
                            <Button
                              variant={isSaved ? "default" : "outline"}
                              size="sm"
                              aria-label={isSaved ? "Saved" : "Save for Later"}
                              onClick={handleSaveRecommendation}
                              disabled={isSaved}
                              className={
                                isSaved
                                  ? "border-green-600 bg-green-600 text-white hover:border-green-700 hover:bg-green-700"
                                  : "border-orange-300 text-orange-700 hover:bg-orange-50"
                              }
                            >
                              {isSaved ? (
                                <>
                                  <Check className="mr-2 h-5 w-5" /> Saved
                                </>
                              ) : (
                                <>
                                  <Bookmark className="mr-2 h-5 w-5" /> Save for
                                  Later
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <span className="text-sm text-gray-600">
                                Estimated Cost
                              </span>
                              <p className="text-xl font-bold text-gray-900">
                                {formatCurrency(recommendation.estimatedCost)}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">
                                Projected ROI
                              </span>
                              <p className="text-xl font-bold text-green-600">
                                {recommendation.projectedROI}%
                              </p>
                            </div>
                          </div>
                          <div className="border-l-4 border-emerald-400 bg-emerald-50 p-4">
                            <div className="mb-1 font-semibold text-emerald-800">
                              Why It's Important (GAqP Rationale):
                            </div>
                            <div className="text-sm text-gray-700">
                              The GAqP manual requires disinfection points at
                              all farm entrances. An effective disinfection
                              station is a critical biosecurity barrier that
                              kills pathogens on vehicles and equipment,
                              preventing the introduction of devastating
                              diseases that can wipe out your entire crop.
                            </div>
                          </div>
                          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                            <div className="mb-1 font-semibold text-emerald-800">
                              Key Benefits & Possible Savings:
                            </div>
                            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                              <li>
                                ✔️ Prevents Disease: Directly addresses the #1
                                risk to your farm's success.
                              </li>
                              <li>
                                ✔️ Reduces Treatment Costs: Avoids the need for
                                expensive antibiotics and chemicals later.
                              </li>
                              <li>
                                ✔️ Meets Certification Standards: A mandatory
                                requirement for BFAR GAqP certification.
                              </li>
                            </ul>
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            Projected Annual Savings:{" "}
                            <span className="font-bold text-green-700">
                              ~₱18,900
                            </span>
                          </div>
                          <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                                LikAI Tip (Resource-Optimized)
                              </span>
                              <p className="mt-1 text-sm text-orange-700">
                                {recommendation.likaiTip}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 border-blue-200 bg-blue-50 font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                            onClick={() =>
                              (window.location.href =
                                recommendation.knowledgeBaseLink)
                            }
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View How-To Guide
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return (
                <Card
                  key={recommendation.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg border ${recommendation.categoryColor}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {recommendation.title}
                          </h4>
                          <Button
                            variant={isSaved ? "default" : "outline"}
                            size="sm"
                            aria-label={isSaved ? "Saved" : "Save for Later"}
                            onClick={handleSaveRecommendation}
                            disabled={isSaved}
                            className={
                              isSaved
                                ? "border-green-600 bg-green-600 text-white hover:border-green-700 hover:bg-green-700"
                                : "border-orange-300 text-orange-700 hover:bg-orange-50"
                            }
                          >
                            {isSaved ? (
                              <>
                                <Check className="mr-2 h-5 w-5" /> Saved
                              </>
                            ) : (
                              <>
                                <Bookmark className="mr-2 h-5 w-5" /> Save for
                                Later
                              </>
                            )}
                          </Button>
                        </div>
                        <Badge
                          className={`mt-1 ${recommendation.categoryColor} border`}
                        >
                          {recommendation.category}
                        </Badge>
                        {/* LikAI Tip */}
                        <div className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
                          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                              LikAI Tip (Resource-Optimized)
                            </span>
                            <p className="mt-1 text-sm text-orange-700">
                              {recommendation.likaiTip}
                            </p>
                          </div>
                        </div>

                        {/* Cost and ROI */}
                        <div className="flex items-center gap-6">
                          <div>
                            <span className="text-sm text-gray-600">
                              Estimated Cost
                            </span>
                            <p className="text-xl font-bold text-gray-900">
                              {formatCurrency(recommendation.estimatedCost)}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">
                              Projected ROI
                            </span>
                            <p className="text-xl font-bold text-green-600">
                              {recommendation.projectedROI}%
                            </p>
                          </div>
                        </div>

                        {/* Benefit */}
                        <p className="text-gray-700">
                          {recommendation.benefit}
                        </p>

                        {/* Learn More Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-blue-200 bg-blue-50 font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-100"
                          onClick={() =>
                            (window.location.href =
                              recommendation.knowledgeBaseLink)
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View How-To Guide
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">
                Investment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm text-green-700">Total Investment</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(investmentPlan.totalInvestment)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700">
                    Projected Annual Savings
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(investmentPlan.projectedAnnualSavings)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700">Average ROI</p>
                  <p className="text-2xl font-bold text-green-900">
                    {investmentPlan.averageROI}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 bg-green-700 text-white hover:bg-green-800"
              size="lg"
              onClick={handleAddToGAqPPlan}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Add to My GAqP Plan
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Investment Report (PDF)
            </Button>
          </div>
          {/* Add to Plan Modal (simple implementation) */}
          {showAddToPlanModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <button
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-700"
                  onClick={() => setShowAddToPlanModal(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <h3 className="mb-4 text-lg font-bold">
                  Select Upgrades to Add to Your GAqP Plan
                </h3>
                <div className="mb-4 space-y-3">
                  {investmentPlan.recommendations.map(rec => (
                    <div key={rec.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`add-upgrade-${rec.id}`}
                        checked={selectedUpgrades.includes(rec.id)}
                        onCheckedChange={checked =>
                          handleUpgradeToggle(rec.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`add-upgrade-${rec.id}`}
                        className="text-gray-800"
                      >
                        {rec.title}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-800"
                  onClick={handleConfirmAddToPlan}
                >
                  Add Selected Upgrades
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
