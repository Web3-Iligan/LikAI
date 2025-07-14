"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Cloud,
  Users,
  Truck,
  Droplets,
  Heart,
  Shield,
} from "lucide-react";
import Link from "next/link"; // Import Link for navigation
import { DetailedActionPlan } from "@/components/plan/detailed-action-plan"; // Import the new component

interface RiskFactor {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  trend: "increasing" | "decreasing" | "stable";
  impact: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
  icon: any;
}

interface RiskAssessmentProps {
  farmProfile: any;
}

export function RiskAssessment({ farmProfile }: RiskAssessmentProps) {
  const [selectedRiskFactor, setSelectedRiskFactor] =
    useState<RiskFactor | null>(null); // State to hold the selected risk factor for detailed view

  // Sort and filter state
  const [sortBy, setSortBy] = useState<string>("currentLevel");
  const [filterImpact, setFilterImpact] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterTrend, setFilterTrend] = useState<string>("all");
  const [maxRiskLevel, setMaxRiskLevel] = useState<string>("");

  const [riskFactors] = useState<RiskFactor[]>([
    {
      id: "1",
      name: "Weather-Related Risk",
      category: "Environmental",
      currentLevel: 85,
      trend: "increasing",
      impact: "high",
      description:
        "Typhoon approaching with heavy rains expected. High risk of pond overflow and pathogen introduction.",
      recommendations: [
        "Inspect and reinforce pond dykes immediately",
        "Prepare emergency drainage systems",
        "Secure feed storage areas",
        "Review emergency response protocols",
      ],
      icon: Cloud,
    },
    {
      id: "2",
      name: "Neighboring Farm Disease",
      category: "External Biosecurity",
      currentLevel: 75,
      trend: "stable",
      impact: "high",
      description:
        "Disease outbreak reported 2km away. Moderate to high risk of pathogen transmission through vectors.",
      recommendations: [
        "Implement strict visitor protocols",
        "Enhance vehicle disinfection",
        "Monitor shrimp behavior closely",
        "Restrict unnecessary farm visits",
      ],
      icon: Users,
    },
    {
      id: "3",
      name: "Water Quality Stress",
      category: "Water Management",
      currentLevel: 45,
      trend: "decreasing",
      impact: "medium",
      description:
        "Recent improvements in water management showing positive results. Risk decreasing.",
      recommendations: [
        "Continue current water monitoring schedule",
        "Maintain beneficial bacteria applications",
        "Monitor dissolved oxygen levels",
        "Keep emergency aeration ready",
      ],
      icon: Droplets,
    },
    {
      id: "4",
      name: "Feed Quality & Storage",
      category: "Feed Management",
      currentLevel: 30,
      trend: "stable",
      impact: "medium",
      description:
        "Feed storage and quality management within acceptable parameters.",
      recommendations: [
        "Continue regular feed quality checks",
        "Maintain proper storage conditions",
        "Monitor feed conversion ratios",
        "Prepare for weather protection",
      ],
      icon: Truck,
    },
    {
      id: "5",
      name: "Stock Health Status",
      category: "Animal Health",
      currentLevel: 25,
      trend: "stable",
      impact: "low",
      description:
        "Current shrimp stock showing good health indicators with normal behavior patterns.",
      recommendations: [
        "Continue routine health monitoring",
        "Maintain current feeding schedule",
        "Document any behavioral changes",
        "Keep health records updated",
      ],
      icon: Heart,
    },
  ]);

  const overallRiskScore = Math.round(
    riskFactors.reduce((sum, factor) => {
      const weight =
        factor.impact === "high" ? 3 : factor.impact === "medium" ? 2 : 1;
      return sum + factor.currentLevel * weight;
    }, 0) /
      riskFactors.reduce((sum, factor) => {
        const weight =
          factor.impact === "high" ? 3 : factor.impact === "medium" ? 2 : 1;
        return sum + weight;
      }, 0)
  );

  const getRiskColor = (level: number) => {
    if (level >= 70) return "text-red-600 bg-red-50 border-red-200";
    if (level >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getRiskLabel = (level: number) => {
    if (level >= 70) return "HIGH RISK";
    if (level >= 40) return "MEDIUM RISK";
    return "LOW RISK";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (selectedRiskFactor) {
    return (
      <DetailedActionPlan
        riskFactor={selectedRiskFactor}
        onBack={() => setSelectedRiskFactor(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <Card className={`border-2 ${getRiskColor(overallRiskScore)}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Overall Farm Risk Assessment
          </CardTitle>
          <CardDescription>
            AI-calculated risk score based on current conditions and external
            factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">
                {overallRiskScore}/100
              </div>
              <Badge className={`text-sm ${getRiskColor(overallRiskScore)}`}>
                {getRiskLabel(overallRiskScore)}
              </Badge>
            </div>

            <Progress value={overallRiskScore} className="h-3" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                <p className="text-xl font-bold text-red-600">
                  {riskFactors.filter(f => f.currentLevel >= 70).length}
                </p>
                <p className="text-sm text-red-700">High Risk Factors</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-center">
                <p className="text-xl font-bold text-orange-600">
                  {riskFactors.filter(f => f.trend === "increasing").length}
                </p>
                <p className="text-sm text-orange-700">Increasing Risks</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                <p className="text-xl font-bold text-blue-600">
                  {riskFactors.filter(f => f.impact === "high").length}
                </p>
                <p className="text-sm text-blue-700">High Impact Areas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {riskFactors.filter(f => f.currentLevel >= 70).length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Critical Risk Alert</AlertTitle>
          <AlertDescription className="text-red-700">
            {riskFactors.filter(f => f.currentLevel >= 70).length} high-risk
            factor(s) detected. Immediate action recommended to prevent
            potential losses.
          </AlertDescription>
        </Alert>
      )}

      {/* Risk Factors Detail */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Risk Factor Analysis
        </h3>

        {/* Sort and Filter Controls */}
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="sort-by" className="text-sm font-medium">
              Sort by
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentLevel">Risk Level</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="impact">Impact</SelectItem>
                <SelectItem value="trend">Trend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-impact" className="text-sm font-medium">
              Filter by Impact
            </Label>
            <Select value={filterImpact} onValueChange={setFilterImpact}>
              <SelectTrigger id="filter-impact">
                <SelectValue placeholder="All impacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impacts</SelectItem>
                <SelectItem value="high">High Impact</SelectItem>
                <SelectItem value="medium">Medium Impact</SelectItem>
                <SelectItem value="low">Low Impact</SelectItem>
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
                <SelectItem value="Environmental">Environmental</SelectItem>
                <SelectItem value="External Biosecurity">
                  External Biosecurity
                </SelectItem>
                <SelectItem value="Water Management">
                  Water Management
                </SelectItem>
                <SelectItem value="Feed Management">Feed Management</SelectItem>
                <SelectItem value="Stock Health">Stock Health</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-trend" className="text-sm font-medium">
              Filter by Trend
            </Label>
            <Select value={filterTrend} onValueChange={setFilterTrend}>
              <SelectTrigger id="filter-trend">
                <SelectValue placeholder="All trends" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                <SelectItem value="increasing">Increasing</SelectItem>
                <SelectItem value="decreasing">Decreasing</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(() => {
          // Apply filters first
          const filteredFactors = riskFactors.filter(factor => {
            const impactMatch =
              filterImpact === "all" || factor.impact === filterImpact;
            const categoryMatch =
              filterCategory === "all" || factor.category === filterCategory;
            const trendMatch =
              filterTrend === "all" || factor.trend === filterTrend;
            const riskLevelMatch =
              maxRiskLevel === "" ||
              isNaN(Number(maxRiskLevel)) ||
              factor.currentLevel <= Number(maxRiskLevel);
            return impactMatch && categoryMatch && trendMatch && riskLevelMatch;
          });

          // Apply sorting
          const sortedFactors = [...filteredFactors].sort((a, b) => {
            switch (sortBy) {
              case "currentLevel":
                return b.currentLevel - a.currentLevel; // High to low
              case "name":
                return a.name.localeCompare(b.name);
              case "category":
                return a.category.localeCompare(b.category);
              case "impact":
                const impactOrder = { high: 0, medium: 1, low: 2 };
                return impactOrder[a.impact] - impactOrder[b.impact];
              case "trend":
                const trendOrder = { increasing: 0, stable: 1, decreasing: 2 };
                return trendOrder[a.trend] - trendOrder[b.trend];
              default:
                return 0;
            }
          });

          return sortedFactors.length > 0 ? (
            <div className="space-y-4">
              {sortedFactors.map(factor => {
                const IconComponent = factor.icon;
                return (
                  <Card
                    key={factor.id}
                    className={`border-l-4 ${
                      factor.currentLevel >= 70
                        ? "border-l-red-500"
                        : factor.currentLevel >= 40
                          ? "border-l-orange-500"
                          : "border-l-green-500"
                    }`}
                  >
                    {/* ...existing card content... */}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <IconComponent className="mt-1 h-5 w-5 text-blue-600" />
                          <div>
                            <CardTitle className="flex items-center gap-2 text-base">
                              {factor.name}
                              {getTrendIcon(factor.trend)}
                            </CardTitle>
                            <CardDescription>{factor.category}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getImpactColor(factor.impact)}>
                            {factor.impact.toUpperCase()} IMPACT
                          </Badge>
                          <Badge className={getRiskColor(factor.currentLevel)}>
                            {factor.currentLevel}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span>{factor.currentLevel}%</span>
                          </div>
                          <Progress
                            value={factor.currentLevel}
                            className="h-2"
                          />
                        </div>

                        <p className="text-sm text-gray-700">
                          {factor.description}
                        </p>

                        <div>
                          <h4 className="mb-2 text-sm font-medium">
                            AI Recommendations:
                          </h4>
                          <ul className="space-y-1">
                            {factor.recommendations.map((rec, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-600"
                              >
                                <span className="mt-1 text-blue-600">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRiskFactor(factor)}
                          >
                            View Detailed Action Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              {maxRiskLevel !== "" && !isNaN(Number(maxRiskLevel))
                ? "No risk factors found within your specified risk level."
                : "No risk factors match your selected filters."}
            </div>
          );
        })()}

        {/* Results summary */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing{" "}
          {(() => {
            const filtered = riskFactors.filter(factor => {
              const impactMatch =
                filterImpact === "all" || factor.impact === filterImpact;
              const categoryMatch =
                filterCategory === "all" || factor.category === filterCategory;
              const trendMatch =
                filterTrend === "all" || factor.trend === filterTrend;
              const riskLevelMatch =
                maxRiskLevel === "" ||
                isNaN(Number(maxRiskLevel)) ||
                factor.currentLevel <= Number(maxRiskLevel);
              return (
                impactMatch && categoryMatch && trendMatch && riskLevelMatch
              );
            });
            return filtered.length;
          })()}{" "}
          of {riskFactors.length} risk factors
          {filterImpact !== "all" && ` • Impact: ${filterImpact}`}
          {filterCategory !== "all" && ` • Category: ${filterCategory}`}
          {filterTrend !== "all" && ` • Trend: ${filterTrend}`}
          {maxRiskLevel !== "" &&
            !isNaN(Number(maxRiskLevel)) &&
            ` • Max Risk: ≤${Number(maxRiskLevel)}%`}
        </div>
      </div>

      {/* What-If Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What-If Scenario Planning</CardTitle>
          <CardDescription>
            Explore how different scenarios might affect your risk profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link href="/coach" passHref>
              <Button
                variant="outline"
                className="h-auto w-full justify-start bg-transparent p-3"
              >
                <div className="text-left">
                  <p className="text-sm font-medium">New Stock Introduction</p>
                  <p className="text-xs text-gray-600">
                    Assess risks of adding new PLs
                  </p>
                </div>
              </Button>
            </Link>
            <Link href="/coach" passHref>
              <Button
                variant="outline"
                className="h-auto w-full justify-start bg-transparent p-3"
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Extended Weather Event</p>
                  <p className="text-xs text-gray-600">
                    Plan for prolonged typhoon season
                  </p>
                </div>
              </Button>
            </Link>
            <Link href="/coach" passHref>
              <Button
                variant="outline"
                className="h-auto w-full justify-start bg-transparent p-3"
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Equipment Failure</p>
                  <p className="text-xs text-gray-600">
                    Backup plans for critical systems
                  </p>
                </div>
              </Button>
            </Link>
            <Link href="/coach" passHref>
              <Button
                variant="outline"
                className="h-auto w-full justify-start bg-transparent p-3"
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Market Price Changes</p>
                  <p className="text-xs text-gray-600">
                    Adjust biosecurity investment
                  </p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
