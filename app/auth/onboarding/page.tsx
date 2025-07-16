"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmName: "",
    farmLocation: "",
    shrimpSpecies: "",
    farmingSystem: "",
    farmSize: "",
    farmSizeUnit: "hectares",
    waterSources: [] as string[],
    pondDrying: "",
    shrimpSource: "",
    farmAccess: "",
    diseaseHistory: "",
    diseaseDescription: "",
    budget: "",
  });

  const totalSteps = 7;

  // Calculate biosecurity scores based on form data
  const calculateBiosecurityScores = () => {
    const scores = {
      farmSetup: 0,
      pondWaterCare: 0,
      stockSourcing: 0,
      farmAccess: 0,
      diseaseReadiness: 0,
    };

    // Farm Setup Basics (species selection and farming system)
    if (
      formData.shrimpSpecies === "vannamei" ||
      formData.shrimpSpecies === "monodon"
    ) {
      scores.farmSetup += 50;
    }
    if (
      formData.farmingSystem === "intensive" ||
      formData.farmingSystem === "semi-intensive"
    ) {
      scores.farmSetup += 50;
    }

    // Pond & Water Care (water sources and pond drying)
    if (
      formData.waterSources.includes("well") ||
      formData.waterSources.includes("sea")
    ) {
      scores.pondWaterCare += 40;
    }
    if (formData.pondDrying === "always") {
      scores.pondWaterCare += 60;
    } else if (formData.pondDrying === "sometimes") {
      scores.pondWaterCare += 30;
    }

    // Healthy Stock Sourcing
    if (formData.shrimpSource === "bfar-hatchery") {
      scores.stockSourcing = 100;
    } else if (formData.shrimpSource === "own-hatchery") {
      scores.stockSourcing = 80;
    } else if (formData.shrimpSource === "local-hatchery") {
      scores.stockSourcing = 60;
    } else {
      scores.stockSourcing = 30;
    }

    // Farm Access Control
    if (formData.farmAccess === "yes") {
      scores.farmAccess = 100;
    } else if (formData.farmAccess === "partial") {
      scores.farmAccess = 60;
    } else {
      scores.farmAccess = 20;
    }

    // Disease Readiness (based on history and budget)
    if (formData.diseaseHistory === "no") {
      scores.diseaseReadiness += 40;
    } else if (formData.diseaseHistory === "once-twice") {
      scores.diseaseReadiness += 20;
    }

    if (formData.budget === "sufficient") {
      scores.diseaseReadiness += 60;
    } else if (formData.budget === "moderate") {
      scores.diseaseReadiness += 40;
    } else if (formData.budget === "limited") {
      scores.diseaseReadiness += 20;
    } else {
      scores.diseaseReadiness += 10;
    }

    return scores;
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
      setIsLoading(true);
      // Simulate registration process
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to main dashboard
        window.location.href = "/dashboard";
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
      {/* Progress Bar */}
      <div className="w-full border-b border-blue-200/50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-xl px-8 py-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#FF7F50] to-[#3498DB] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="px-8 py-6">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
          {currentStep > 0 && currentStep < totalSteps && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-[#3498DB] hover:bg-blue-50 hover:text-[#2980B9]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-8 pb-16">
        <div
          className={`relative w-full overflow-hidden rounded-2xl border border-blue-200/30 bg-white shadow-2xl ${
            currentStep === 6
              ? "max-w-6xl space-y-6 p-12"
              : "max-w-xl space-y-6 p-10"
          }`}
        >
          {/* Background accent */}
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10"></div>

          <div className="relative z-10">
            {/* Step 0: Introduction */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    Complete Your Initial Farm Assessment in 15 Minutes
                  </h1>
                  <p className="mb-8 text-lg text-gray-600">
                    Our AI quickly assesses your farm's basic operations,
                    instantly highlighting key opportunities to reduce costs and
                    boost yields.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-700">
                      Gain clarity on your current farm operations
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-700">
                      Understand the habits that are holding you back
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-700">
                      Identify which aspects to work on next (and why)
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-6 text-base text-gray-600">
                    You'll also download a personalised report after completing
                    the assessment.
                  </p>

                  <Button
                    onClick={handleNext}
                    className="mb-4 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C]"
                  >
                    Start My Farm Assessment{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-sm text-gray-500">
                    100% Free • No Credit Card Required
                  </p>
                </div>
              </div>
            )}

            {/* Step 1: Farm at a Glance */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Your Farm at a Glance
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="farmName"
                      className="mb-2 block text-base font-medium text-gray-700"
                    >
                      What is your farm's name?
                    </label>
                    <Input
                      id="farmName"
                      type="text"
                      value={formData.farmName}
                      onChange={e => updateFormData("farmName", e.target.value)}
                      className="h-14 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 text-lg focus:border-[#3498DB] focus:ring-0"
                      placeholder="e.g., Sunrise Aqua Farm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="farmLocation"
                      className="mb-2 block text-base font-medium text-gray-700"
                    >
                      Where is your farm located?
                    </label>
                    <Input
                      id="farmLocation"
                      type="text"
                      value={formData.farmLocation}
                      onChange={e =>
                        updateFormData("farmLocation", e.target.value)
                      }
                      className="h-14 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 text-lg focus:border-[#3498DB] focus:ring-0"
                      placeholder="e.g., Tagum City, Davao del Norte"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.farmName || !formData.farmLocation}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Farm Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Farm Specifications
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is the main shrimp species you currently farm or plan
                      to farm?
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "vannamei",
                          label:
                            "Penaeus vannamei (Pacific White Shrimp / Suati)",
                        },
                        {
                          id: "monodon",
                          label:
                            "Penaeus monodon (Giant Black Tiger Shrimp / Sugpo)",
                        },
                        {
                          id: "other",
                          label: "Other (Please specify briefly)",
                        },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("shrimpSpecies", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.shrimpSpecies === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your current farming system?
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "intensive",
                          label:
                            "Intensive (High density, relies on commercial feed)",
                        },
                        {
                          id: "semi-intensive",
                          label:
                            "Semi-intensive (Medium density, uses natural food & commercial feed)",
                        },
                        {
                          id: "extensive",
                          label:
                            "Extensive (Low density, relies mostly on natural food)",
                        },
                        {
                          id: "polyculture",
                          label:
                            "Polyculture (Raising shrimp with other species)",
                        },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("farmingSystem", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.farmingSystem === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={
                      !formData.shrimpSpecies || !formData.farmingSystem
                    }
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Water & Pond Basics */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-xl font-bold text-gray-900">
                    Water & Pond Basics
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your main water source for the ponds? (Select all
                      that apply)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "river", label: "River" },
                        { id: "sea", label: "Sea/Ocean" },
                        { id: "well", label: "Deep Well" },
                        { id: "rain", label: "Rainwater" },
                        { id: "other", label: "Other" },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => {
                            const currentSources = formData.waterSources;
                            const newSources = currentSources.includes(
                              option.id
                            )
                              ? currentSources.filter(
                                  source => source !== option.id
                                )
                              : [...currentSources, option.id];
                            updateFormData("waterSources", newSources);
                          }}
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.waterSources.includes(option.id)
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Before stocking shrimp, do you completely drain and
                      sun-dry your ponds until the bottom cracks?
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "always", label: "Yes, always" },
                        { id: "sometimes", label: "Partially or sometimes" },
                        { id: "rarely", label: "No, rarely or never" },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("pondDrying", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.pondDrying === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={
                      formData.waterSources.length === 0 || !formData.pondDrying
                    }
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Stock & Farm Entry */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-xl font-bold text-gray-900">
                    Stock & Farm Entry
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Where do you typically get your young shrimp (post-larvae
                      / PLs) from?
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "bfar-hatchery",
                          label: "BFAR-accredited hatchery",
                        },
                        {
                          id: "local-hatchery",
                          label: "Non-accredited local hatchery",
                        },
                        { id: "wild-caught", label: "Wild-caught" },
                        { id: "own-hatchery", label: "Own hatchery" },
                        { id: "other", label: "Other" },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("shrimpSource", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.shrimpSource === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Do you have basic measures to control who enters your farm
                      (e.g., a fence, gate, or sign)?
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "yes", label: "Yes, we have some control" },
                        {
                          id: "partial",
                          label: "Partially, some areas are controlled",
                        },
                        { id: "no", label: "No, access is generally open" },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("farmAccess", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.farmAccess === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.shrimpSource || !formData.farmAccess}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Health & Challenges */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-xl font-bold text-gray-900">
                    Health & Challenges
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Have you experienced any disease outbreaks or unexplained
                      mass mortalities in your shrimp in the past year?
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "several", label: "Yes, several times" },
                        { id: "once-twice", label: "Yes, once or twice" },
                        { id: "no", label: "No, not really" },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("diseaseHistory", option.id)
                          }
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.diseaseHistory === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(formData.diseaseHistory === "several" ||
                    formData.diseaseHistory === "once-twice") && (
                    <div>
                      <label
                        htmlFor="diseaseDescription"
                        className="mb-2 block text-base font-medium text-gray-700"
                      >
                        Briefly describe the most common issue you faced
                        (optional)
                      </label>
                      <Input
                        id="diseaseDescription"
                        type="text"
                        value={formData.diseaseDescription}
                        onChange={e =>
                          updateFormData("diseaseDescription", e.target.value)
                        }
                        className="h-14 w-full rounded-lg border border-gray-300 px-4 text-lg focus:border-transparent focus:ring-2 focus:ring-[#3498DB]"
                        placeholder="e.g., White spot disease, sudden mortality..."
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your estimated budget range for biosecurity
                      improvements in the next 6-12 months?
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "very-limited",
                          label: "Very Limited (< Php 50,000)",
                        },
                        {
                          id: "limited",
                          label: "Limited (Php 50,000 - Php 200,000)",
                        },
                        {
                          id: "moderate",
                          label: "Moderate (Php 200,000 - Php 500,000)",
                        },
                        {
                          id: "sufficient",
                          label: "Sufficient (> Php 500,000)",
                        },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => updateFormData("budget", option.id)}
                          className={`w-full rounded-lg border-2 p-3 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.budget === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.diseaseHistory || !formData.budget}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Complete Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Biosecurity Report */}
            {currentStep === 6 && (
              <div className="space-y-16">
                <div className="text-center">
                  <h1 className="mb-6 text-4xl font-bold text-gray-900">
                    Your Personalized Biosecurity Starter Plan!
                  </h1>
                  <p className="text-2xl leading-relaxed text-gray-700 font-medium">
                    Great job,{" "}
                    {formData.farmName
                      ? `Farmer ${formData.farmName}`
                      : "Farmer"}
                    ! Based on your quick assessment, Likai's AI has created
                    your first personalized plan to help you start strong and
                    keep your shrimp healthy.
                  </p>
                </div>

                {/* Farm Health Status - Simple Traffic Light System */}
                <div className="border-b border-gray-200 pb-8 text-center bg-blue-50 rounded-2xl p-8 mb-8">
                  <h2 className="mb-6 text-4xl font-bold text-gray-900">
                    🎯 Your Farm's Health Report
                  </h2>
                  <p className="mb-4 text-2xl text-gray-700 font-medium">
                    Quick Look at Your Farm's Strengths
                  </p>
                  <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    We checked your answers and here's what we found. Green is good, 
                    yellow needs some work, red needs urgent attention.
                  </p>
                </div>

                <div className="space-y-6">
                  {(() => {
                    const scores = calculateBiosecurityScores();
                    
                    const farmAreas = [
                      {
                        name: "Pond & Water Care",
                        score: scores.pondWaterCare,
                        icon: "💧",
                        description: "How well you prepare your ponds"
                      },
                      {
                        name: "Farm Access Control", 
                        score: scores.farmAccess,
                        icon: "🚪",
                        description: "Who can enter your farm"
                      },
                      {
                        name: "Healthy Stock Sourcing",
                        score: scores.stockSourcing,
                        icon: "🦐", 
                        description: "Where you get your baby shrimp"
                      },
                      {
                        name: "Farm Setup Basics",
                        score: scores.farmSetup,
                        icon: "🏗️",
                        description: "Your farm design and species choice"
                      },
                      {
                        name: "Disease Readiness",
                        score: scores.diseaseReadiness,
                        icon: "🛡️",
                        description: "How ready you are for health problems"
                      }
                    ];

                    const getStatusInfo = (score: number) => {
                      if (score > 80) return { 
                        status: "Excellent", 
                        color: "bg-green-500", 
                        bgColor: "bg-green-50 border-green-200",
                        textColor: "text-green-800"
                      };
                      if (score > 60) return { 
                        status: "Good", 
                        color: "bg-blue-500", 
                        bgColor: "bg-blue-50 border-blue-200",
                        textColor: "text-blue-800"
                      };
                      if (score > 40) return { 
                        status: "Needs Work", 
                        color: "bg-yellow-500", 
                        bgColor: "bg-yellow-50 border-yellow-200",
                        textColor: "text-yellow-800"
                      };
                      return { 
                        status: "Urgent Focus", 
                        color: "bg-red-500", 
                        bgColor: "bg-red-50 border-red-200",
                        textColor: "text-red-800"
                      };
                    };

                    return farmAreas.map((area, index) => {
                      const statusInfo = getStatusInfo(area.score);
                      
                      return (
                        <div key={index} className={`rounded-2xl border-2 p-6 ${statusInfo.bgColor} transition-all hover:shadow-lg`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="text-4xl">{area.icon}</div>
                              <div>
                                <h4 className={`text-2xl font-bold ${statusInfo.textColor}`}>
                                  {area.name}
                                </h4>
                                <p className="text-lg text-gray-600">{area.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold px-4 py-2 rounded-full ${statusInfo.bgColor} ${statusInfo.textColor} border-2`}>
                                {statusInfo.status}
                              </div>
                              <p className="text-lg text-gray-600 mt-1">{area.score}/100</p>
                            </div>
                          </div>
                          
                          {/* Visual Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${statusInfo.color}`}
                              style={{ width: `${area.score}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* What Your Snapshot Means */}
                <div className="space-y-8 bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-center text-4xl font-bold text-gray-900 mb-8">
                    📊 What This Means for Your Farm
                  </h3>

                  {(() => {
                    const scores = calculateBiosecurityScores();
                    const strengths = [];
                    const improvements = [];

                    if (scores.farmSetup >= 60)
                      strengths.push({
                        name: "Farm Setup",
                        icon: "✅",
                        detail: "Good species choice and farm design."
                      });
                    else
                      improvements.push({
                        name: "Farm Setup", 
                        icon: "🎯",
                        detail: "Better farm setup = healthier shrimp and higher profits."
                      });

                    if (scores.stockSourcing >= 60)
                      strengths.push({
                        name: "Stock Sourcing",
                        icon: "✅", 
                        detail: "You know how to pick quality baby shrimp."
                      });
                    else
                      improvements.push({
                        name: "Stock Sourcing",
                        icon: "🎯",
                        detail: "Better baby shrimp = fewer diseases and more harvest."
                      });

                    if (scores.pondWaterCare >= 60)
                      strengths.push({
                        name: "Pond Care",
                        icon: "✅",
                        detail: "Your pond preparation protects your shrimp."
                      });
                    else
                      improvements.push({
                        name: "Pond Care", 
                        icon: "🎯",
                        detail: "Clean, dry ponds prevent diseases and boost growth."
                      });

                    if (scores.farmAccess >= 60)
                      strengths.push({
                        name: "Farm Security",
                        icon: "✅",
                        detail: "You control who enters your farm well."
                      });
                    else
                      improvements.push({
                        name: "Farm Security",
                        icon: "🎯", 
                        detail: "Controlling access stops diseases from entering."
                      });

                    if (scores.diseaseReadiness >= 60)
                      strengths.push({
                        name: "Disease Prep",
                        icon: "✅",
                        detail: "You're ready to handle health problems."
                      });
                    else
                      improvements.push({
                        name: "Disease Prep",
                        icon: "🎯",
                        detail: "Being prepared saves your crops when problems hit."
                      });

                    return (
                      <div className="grid max-w-6xl mx-auto gap-8 lg:grid-cols-2">
                        {strengths.length > 0 && (
                          <div className="rounded-2xl border-2 border-green-300 bg-green-50 p-8 shadow-lg">
                            <h4 className="mb-6 flex items-center text-3xl font-bold text-green-800">
                              <span className="mr-4 text-4xl">🌟</span>
                              What You're Doing Great!
                            </h4>
                            <div className="space-y-4">
                              {strengths.map((strength, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-4 rounded-xl border-2 border-green-200 bg-white p-4 shadow-sm"
                                >
                                  <span className="text-3xl">{strength.icon}</span>
                                  <div>
                                    <div className="text-xl font-bold text-green-800">
                                      {strength.name}
                                    </div>
                                    <div className="text-lg text-green-700">
                                      {strength.detail}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {improvements.length > 0 && (
                          <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-8 shadow-lg">
                            <h4 className="mb-6 flex items-center text-3xl font-bold text-orange-800">
                              <span className="mr-4 text-4xl">🚀</span>
                              Where You Can Improve
                            </h4>
                            <div className="space-y-4">
                              {improvements.map((improvement, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-4 rounded-xl border-2 border-orange-200 bg-white p-4 shadow-sm"
                                >
                                  <span className="text-3xl">{improvement.icon}</span>
                                  <div>
                                    <div className="text-xl font-bold text-orange-800">
                                      {improvement.name}
                                    </div>
                                    <div className="text-lg text-orange-700">
                                      {improvement.detail}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Enhanced Action Plan */}
                <div className="space-y-8">
                  <div className="border-b border-gray-200 pb-6 text-center">
                    <h3 className="mb-4 text-3xl font-bold text-gray-900">
                      🎯 Your First Steps: Personalized Action Plan
                    </h3>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                      Likai's AI has prioritized these simple steps for you
                      based on your snapshot. Follow them to make your farm
                      safer and more profitable!
                    </p>
                  </div>

                  {(() => {
                    const scores = calculateBiosecurityScores();
                    const actionItems = [];

                    if (scores.pondWaterCare < 60) {
                      actionItems.push({
                        title: "Master Pond Preparation",
                        priority: "High Priority",
                        why: "A clean, dry pond bottom is your first defense against diseases and creates optimal growing conditions.",
                        what: [
                          "Drain completely and remove all organic matter",
                          "Sun-dry until soil cracks (7-14 days minimum)",
                          "Remove accumulated muck and debris",
                          "Test soil pH before next cycle",
                        ],
                        tip: "Use sunshine and a simple rake. Consider agricultural lime for faster drying if soil is acidic. This simple step can reduce disease risk by up to 70%.",
                        icon: "☀️",
                        difficulty: "Easy",
                        timeframe: "1-2 weeks",
                        cost: "Low Cost",
                      });
                    }

                    if (scores.farmAccess < 60) {
                      actionItems.push({
                        title: "Secure Your Farm's Entry Points",
                        priority: "High Priority",
                        why: "Uncontrolled access is a major pathway for diseases and contamination to enter your farm.",
                        what: [
                          "Install basic fence/barrier around pond area",
                          "Set up footbath at main entrance",
                          "Post clear signage for visitors",
                          "Create designated entry/exit points",
                        ],
                        tip: "Bamboo or recycled netting works for a basic fence. A basin with lime solution makes a great DIY footbath. Simple but effective!",
                        icon: "🚪",
                        difficulty: "Easy",
                        timeframe: "1 week",
                        cost: "Low Cost",
                      });
                    }

                    if (scores.stockSourcing < 60) {
                      actionItems.push({
                        title: "Upgrade Your Stock Source",
                        priority: "Medium Priority",
                        why: "Quality post-larvae are the foundation of a healthy crop and successful harvest.",
                        what: [
                          "Source from BFAR-accredited hatcheries",
                          "Always inspect PLs before stocking",
                          "Request health certificates",
                          "Quarantine new stock if possible",
                        ],
                        tip: "Look for active, uniform-sized PLs. Ask for health certificates from your supplier. Quality PLs cost more upfront but save money long-term.",
                        icon: "🦐",
                        difficulty: "Medium",
                        timeframe: "Next stocking",
                        cost: "Medium Cost",
                      });
                    }

                    if (scores.diseaseReadiness < 60) {
                      actionItems.push({
                        title: "Build Your Disease Defense Kit",
                        priority: "Medium Priority",
                        why: "Early detection and quick response can save your entire crop when health issues arise.",
                        what: [
                          "Create emergency contact list",
                          "Stock basic treatment supplies",
                          "Learn to recognize disease symptoms",
                          "Establish relationship with aqua vet",
                        ],
                        tip: "Start with basics: water test kit, lime, salt, and emergency aeration. Knowledge is your best tool - learn the early warning signs.",
                        icon: "🛡️",
                        difficulty: "Medium",
                        timeframe: "2-3 weeks",
                        cost: "Medium Cost",
                      });
                    }

                    if (actionItems.length === 0) {
                      actionItems.push({
                        title: "Maintain Your Excellent Practices",
                        priority: "Ongoing",
                        why: "Your farm shows strong biosecurity practices across all areas - keep up the great work!",
                        what: [
                          "Continue current excellent practices",
                          "Monitor for any changes in conditions",
                          "Stay updated on best practices",
                          "Consider sharing knowledge with other farmers",
                        ],
                        tip: "You're doing great! Consider documenting your successful practices to help other farmers in your area.",
                        icon: "⭐",
                        difficulty: "Easy",
                        timeframe: "Ongoing",
                        cost: "No Cost",
                      });
                    }

                    return (
                      <div className="mx-auto max-w-4xl space-y-8">
                        {actionItems.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                          >
                            {/* Step Header */}
                            <div className="mb-6 flex items-start justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7F50] to-[#E6723C] text-2xl font-bold text-white shadow-lg">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="mb-2 text-2xl font-bold text-gray-900">
                                    {item.title}
                                  </h4>
                                  <div className="flex items-center space-x-3 text-sm">
                                    <span
                                      className={`rounded-full px-3 py-1 font-medium ${
                                        item.priority === "High Priority"
                                          ? "bg-red-100 text-red-800"
                                          : item.priority === "Medium Priority"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {item.priority}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                                      {item.difficulty}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                                      {item.timeframe}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                                      {item.cost}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-4xl">{item.icon}</div>
                            </div>

                            {/* Step Content */}
                            <div className="space-y-4">
                              {/* Why Important */}
                              <div className="flex items-start space-x-3 rounded-lg border border-blue-100 bg-white p-4">
                                <div className="text-xl">💡</div>
                                <div>
                                  <div className="mb-1 font-semibold text-gray-900">
                                    Why it's important:
                                  </div>
                                  <div className="leading-relaxed text-gray-700">
                                    {item.why}
                                  </div>
                                </div>
                              </div>

                              {/* What to Do */}
                              <div className="flex items-start space-x-3 rounded-lg border border-blue-100 bg-white p-4">
                                <div className="text-xl">📋</div>
                                <div className="flex-1">
                                  <div className="mb-2 font-semibold text-gray-900">
                                    What to do:
                                  </div>
                                  <ul className="space-y-1">
                                    {item.what.map((step, stepIndex) => (
                                      <li
                                        key={stepIndex}
                                        className="flex items-start space-x-2"
                                      >
                                        <span className="mt-1 text-[#3498DB]">
                                          •
                                        </span>
                                        <span className="text-gray-700">
                                          {step}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Likai Tip */}
                              <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 p-4">
                                <div className="flex items-start space-x-3">
                                  <div className="text-xl">🎯</div>
                                  <div>
                                    <div className="mb-1 font-semibold text-orange-800">
                                      Likai's Smart Tip:
                                    </div>
                                    <div className="leading-relaxed text-orange-700">
                                      {item.tip}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex space-x-3 pt-2">
                                <Button
                                  variant="outline"
                                  className="h-12 flex-1 border-[#3498DB] font-medium text-[#3498DB] hover:bg-blue-50"
                                >
                                  ✅ Mark Complete
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="h-12 px-6 font-medium text-gray-600 hover:bg-gray-50"
                                >
                                  ❓ Get Help
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Enhanced CTA Section */}
                <div className="space-y-6 pt-8 text-center">
                  <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
                    <h4 className="mb-4 text-2xl font-bold text-gray-900">
                      🚀 Ready to transform your farm?
                    </h4>
                    <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
                      Your personalized plan is ready! Let's take you to your
                      dashboard where you can track progress, get AI coaching,
                      and watch your farm thrive.
                    </p>
                    <Button
                      onClick={handleNext}
                      className="h-16 transform rounded-xl bg-gradient-to-r from-[#FF7F50] to-[#E6723C] px-12 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#E6723C] hover:to-[#D35400]"
                    >
                      Get Access{" "}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Final Completion */}
            {currentStep === 7 && (
              <div className="space-y-6 text-center">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                  You've completed your Starter Plan!
                </h1>

                <div className="mb-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-gray-200/50 bg-white shadow-lg">
                    <Image
                      src="/Likai-logo.svg"
                      alt="LikAI Logo"
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />
                  </div>
                </div>

                {!isLoading ? (
                  <>
                    <div className="space-y-4">
                      <p className="text-base text-gray-600">
                        Keep up the great work,{" "}
                        {formData.farmName
                          ? `Farmer ${formData.farmName}`
                          : "Farmer"}
                        ! By following these steps, you're already making your
                        farm much safer and more profitable.
                      </p>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-base text-blue-800">
                          <span className="font-semibold">
                            Want to unlock your full farm potential?
                          </span>{" "}
                          Upgrade to our Business Plan for a Dynamic Plan that
                          adapts to your farm every day, unlimited AI coaching,
                          and smart investment guidance!
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button
                        onClick={handleNext}
                        className="h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C]"
                      >
                        Go to Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 w-full rounded-lg border-[#3498DB] text-[#3498DB] hover:bg-blue-50"
                      >
                        Learn More About Business Plan
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#3498DB]" />
                    <p className="text-base text-gray-600">
                      Setting up your personalized aquaculture dashboard...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
