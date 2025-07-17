"use client";

import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  Download,
  Droplets,
  FileText,
  Lightbulb,
  Loader2,
  Shield,
  Target,
  Timer,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";

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
      icon: Zap,
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
        icon: Zap,
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
            return (
              <Card
                key={recommendation.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border ${recommendation.categoryColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {recommendation.title}
                        </h4>
                        <Badge
                          className={`mt-1 ${recommendation.categoryColor} border`}
                        >
                          {recommendation.category}
                        </Badge>
                      </div>

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
            className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
            size="lg"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Implement This Plan
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Investment Report (PDF)
          </Button>
          <Button variant="outline" onClick={resetForm} size="lg">
            Create New Plan
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
