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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Calculator,
  Wrench,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  BarChart2,
  Hammer,
  Leaf,
  Zap,
  ArrowRight,
  Droplets,
} from "lucide-react"; // Added Trash2 for BiosecurityPlan

interface ResourceOption {
  id: string;
  name: string;
  category: string;
  budgetTier: "budget" | "mid-range" | "premium";
  cost: string;
  effectiveness: number;
  implementation: string;
  materials: string[];
  pros: string[];
  cons: string[];
  roi: string;
}

interface CostBenefit {
  practice: string;
  investment: number;
  annualSavings: number;
  roiMonths: number;
  riskReduction: number;
  description: string;
}

export function ResourceOptimizer() {
  const [selectedCategory, setSelectedCategory] = useState("water-treatment");

  const resourceOptions: Record<string, ResourceOption[]> = {
    "water-treatment": [
      {
        id: "1",
        name: "Solar Water Disinfection",
        category: "Water Treatment",
        budgetTier: "budget",
        cost: "₱2,000-5,000",
        effectiveness: 70,
        implementation: "2-3 days",
        materials: [
          "Clear plastic bottles",
          "Black paint",
          "Reflective sheets",
          "Storage tanks",
        ],
        pros: [
          "Very low cost",
          "No electricity needed",
          "Easy maintenance",
          "Environmentally friendly",
        ],
        cons: ["Weather dependent", "Limited capacity", "Slower process"],
        roi: "2-3 months",
      },
      {
        id: "2",
        name: "Chlorination System",
        category: "Water Treatment",
        budgetTier: "mid-range",
        cost: "₱8,000-15,000",
        effectiveness: 85,
        implementation: "1 week",
        materials: [
          "Chlorine tablets",
          "Dosing pump",
          "Storage tank",
          "Test kit",
        ],
        pros: [
          "Reliable disinfection",
          "Automated dosing",
          "Proven technology",
        ],
        cons: [
          "Ongoing chemical costs",
          "Requires monitoring",
          "Residual concerns",
        ],
        roi: "4-6 months",
      },
      {
        id: "3",
        name: "UV Treatment System",
        category: "Water Treatment",
        budgetTier: "premium",
        cost: "₱25,000-45,000",
        effectiveness: 95,
        implementation: "2-3 weeks",
        materials: [
          "UV lamps",
          "Control unit",
          "Flow sensors",
          "Quartz sleeves",
        ],
        pros: [
          "99% pathogen kill",
          "No chemicals",
          "Instant treatment",
          "Low maintenance",
        ],
        cons: ["High initial cost", "Electricity required", "Lamp replacement"],
        roi: "8-12 months",
      },
    ],
    "access-control": [
      {
        id: "4",
        name: "Basic Footbath Setup",
        category: "Access Control",
        budgetTier: "budget",
        cost: "₱300-800",
        effectiveness: 60,
        implementation: "1 day",
        materials: [
          "Plastic container",
          "Disinfectant",
          "Scrub brush",
          "Instructions sign",
        ],
        pros: ["Very affordable", "Quick setup", "Immediate use"],
        cons: [
          "Manual maintenance",
          "Limited effectiveness",
          "Weather exposure",
        ],
        roi: "1 month",
      },
      {
        id: "5",
        name: "Automated Disinfection Station",
        category: "Access Control",
        budgetTier: "mid-range",
        cost: "₱5,000-12,000",
        effectiveness: 80,
        implementation: "3-5 days",
        materials: [
          "Sensor system",
          "Spray nozzles",
          "Disinfectant tank",
          "Control panel",
        ],
        pros: [
          "Hands-free operation",
          "Consistent application",
          "Professional appearance",
        ],
        cons: ["Higher maintenance", "Power requirement", "More complex"],
        roi: "3-4 months",
      },
      {
        id: "6",
        name: "Complete Biosecurity Gate",
        category: "Access Control",
        budgetTier: "premium",
        cost: "₱20,000-35,000",
        effectiveness: 95,
        implementation: "1-2 weeks",
        materials: [
          "Automated gate",
          "Vehicle wash system",
          "Visitor facilities",
          "Monitoring cameras",
        ],
        pros: [
          "Complete control",
          "Vehicle disinfection",
          "Visitor tracking",
          "Professional image",
        ],
        cons: [
          "High investment",
          "Complex installation",
          "Ongoing maintenance",
        ],
        roi: "6-10 months",
      },
    ],
  };

  const costBenefitAnalysis: CostBenefit[] = [
    {
      practice: "Footbath Protocol Implementation",
      investment: 500,
      annualSavings: 15000,
      roiMonths: 1,
      riskReduction: 40,
      description:
        "Basic footbath reduces pathogen entry through footwear and equipment",
    },
    {
      practice: "Water Quality Monitoring System",
      investment: 8000,
      annualSavings: 35000,
      roiMonths: 3,
      riskReduction: 60,
      description:
        "Early detection prevents major losses from water quality issues",
    },
    {
      practice: "Pond Liner Installation",
      investment: 25000,
      annualSavings: 80000,
      roiMonths: 4,
      riskReduction: 70,
      description: "Prevents soil contamination and improves water management",
    },
    {
      practice: "Backup Aeration System",
      investment: 15000,
      annualSavings: 120000,
      roiMonths: 2,
      riskReduction: 85,
      description:
        "Prevents total loss during power outages or equipment failure",
    },
  ];

  const getBudgetColor = (tier: string) => {
    switch (tier) {
      case "budget":
        return "bg-green-100 text-green-800";
      case "mid-range":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentOptions = resourceOptions[selectedCategory] || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Resource-Optimized Solutions
          </CardTitle>
          <CardDescription>
            AI-generated alternatives considering budget constraints and local
            materials
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="solutions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solutions">Tiered Solutions</TabsTrigger>
          <TabsTrigger value="cost-benefit">Cost-Benefit Analysis</TabsTrigger>
          <TabsTrigger value="diy">DIY & Local Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="solutions" className="space-y-4">
          {/* Category Selection */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={
                selectedCategory === "water-treatment" ? "default" : "outline"
              }
              onClick={() => setSelectedCategory("water-treatment")}
              size="sm"
            >
              <Droplets className="mr-2 h-4 w-4" /> Water Treatment
            </Button>
            <Button
              variant={
                selectedCategory === "access-control" ? "default" : "outline"
              }
              onClick={() => setSelectedCategory("access-control")}
              size="sm"
            >
              <Shield className="mr-2 h-4 w-4" /> Access Control
            </Button>
          </div>

          {/* Solutions Grid */}
          <div className="grid gap-4">
            {currentOptions.map(option => (
              <Card
                key={option.id}
                className="border-l-4 border-l-blue-500 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {option.category === "Water Treatment" ? (
                        <Droplets className="mt-1 h-5 w-5 text-blue-600" />
                      ) : (
                        <Shield className="mt-1 h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {option.name}
                        </CardTitle>
                        <CardDescription>{option.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getBudgetColor(option.budgetTier)}>
                        {option.budgetTier.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <BarChart2 className="h-3 w-3" /> {option.effectiveness}
                        % effective
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
                          <DollarSign className="h-4 w-4 text-gray-600" />{" "}
                          Investment & Timeline
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Cost:</span>{" "}
                            {option.cost}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">
                              Implementation:
                            </span>{" "}
                            {option.implementation}
                          </p>
                          <p className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">ROI:</span>{" "}
                            {option.roi}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
                          <Hammer className="h-4 w-4 text-gray-600" /> Materials
                          Needed
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {option.materials.map((material, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1 text-xs"
                            >
                              <Leaf className="h-3 w-3" /> {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-green-700">
                          <CheckCircle className="h-4 w-4" /> Advantages
                        </h4>
                        <ul className="space-y-1">
                          {option.pros.map((pro, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-green-700"
                            >
                              <CheckCircle className="mt-1 h-4 w-4 shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-orange-700">
                          <XCircle className="h-4 w-4" /> Considerations
                        </h4>
                        <ul className="space-y-1">
                          {option.cons.map((con, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-orange-700"
                            >
                              <XCircle className="mt-1 h-4 w-4 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      Get Implementation Guide{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost-benefit" className="space-y-4">
          <div className="grid gap-4">
            {costBenefitAnalysis.map((analysis, index) => (
              <Card
                key={index}
                className="shadow-sm transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    {analysis.practice}
                  </CardTitle>
                  <CardDescription>{analysis.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                      <DollarSign className="mb-1 h-6 w-6 text-red-600" />
                      <p className="text-xl font-bold text-red-600">
                        ₱{analysis.investment.toLocaleString()}
                      </p>
                      <p className="text-sm text-red-700">Initial Investment</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                      <DollarSign className="mb-1 h-6 w-6 text-green-600" />
                      <p className="text-xl font-bold text-green-600">
                        ₱{analysis.annualSavings.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-700">Annual Savings</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                      <Clock className="mb-1 h-6 w-6 text-blue-600" />
                      <p className="text-xl font-bold text-blue-600">
                        {analysis.roiMonths} months
                      </p>
                      <p className="text-sm text-blue-700">Break-even Time</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-purple-200 bg-purple-50 p-3 text-center">
                      <Shield className="mb-1 h-6 w-6 text-purple-600" />
                      <p className="text-xl font-bold text-purple-600">
                        {analysis.riskReduction}%
                      </p>
                      <p className="text-sm text-purple-700">Risk Reduction</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Return on Investment
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {Math.round(
                          (analysis.annualSavings / analysis.investment) * 100
                        )}
                        % annually
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diy" className="space-y-4">
          <div className="grid gap-4">
            <Card className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  DIY Pond Aeration System
                </CardTitle>
                <CardDescription>
                  Build an emergency backup aeration system using local
                  materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="flex items-start gap-2 text-sm text-gray-700">
                    <Hammer className="mt-1 h-4 w-4 shrink-0 text-gray-600" />
                    <span className="font-medium">Materials:</span> Old car
                    battery, small DC motor, plastic fan blades, PVC pipes,
                    plastic container.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="mb-1 flex items-center gap-2 font-medium">
                      <Zap className="h-4 w-4 text-gray-600" /> Steps:
                    </span>
                    <ol className="ml-4 list-inside list-decimal space-y-1">
                      <li>Mount motor to fan blades.</li>
                      <li>Create a floating base from plastic container.</li>
                      <li>Connect motor to battery.</li>
                      <li>Position in pond for emergency aeration.</li>
                    </ol>
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Estimated Cost:</span> ₱500 -
                    ₱1,500 (if materials are repurposed)
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Benefit:</span> Provides
                    crucial oxygen during power outages, preventing mass
                    mortality.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 flex w-full items-center gap-2 bg-transparent"
                  size="sm"
                >
                  View Detailed DIY Guide <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Local Material Fencing
                </CardTitle>
                <CardDescription>
                  Construct a farm perimeter fence using readily available local
                  resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="flex items-start gap-2 text-sm text-gray-700">
                    <Hammer className="mt-1 h-4 w-4 shrink-0 text-gray-600" />
                    <span className="font-medium">Materials:</span> Bamboo
                    poles, woven bamboo mats (sawali), coconut coir rope, local
                    thorny bushes.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="mb-1 flex items-center gap-2 font-medium">
                      <Zap className="h-4 w-4 text-gray-600" /> Steps:
                    </span>
                    <ol className="ml-4 list-inside list-decimal space-y-1">
                      <li>Erect bamboo poles as fence posts.</li>
                      <li>
                        Attach woven bamboo mats or create a lattice with bamboo
                        strips.
                      </li>
                      <li>
                        Reinforce with thorny bushes at the base for added
                        deterrence.
                      </li>
                      <li>Secure all connections with coconut coir rope.</li>
                    </ol>
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Estimated Cost:</span> ₱200 -
                    ₱800 per 10 meters (depending on material availability)
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Benefit:</span> Deters
                    unauthorized entry and prevents large animal intrusion.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 flex w-full items-center gap-2 bg-transparent"
                  size="sm"
                >
                  View Detailed DIY Guide <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
