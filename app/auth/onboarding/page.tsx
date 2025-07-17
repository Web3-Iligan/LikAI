"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState(
    "Analyzing your farm data..."
  );
  const [formData, setFormData] = useState({
    farmName: "",
    farmLocation: "",
    shrimpSpecies: "",
    shrimpSpeciesOther: "",
    farmingSystem: "",
    farmSize: "",
    farmSizeUnit: "hectares",
    waterSources: [] as string[],
    waterSourceOther: "",
    pondDrying: "",
    shrimpSource: "",
    shrimpSourceOther: "",
    farmAccess: "",
    diseaseHistory: "",
    diseaseDescription: "",
    budget: "",
  });

  const totalSteps = 7;

  // Dynamic analysis messages
  const analysisMessages = [
    "Analyzing your farm data...",
    "Evaluating biosecurity gaps...",
    "Creating custom recommendations...",
    "Almost done, finalizing your plan...",
  ];

  // Cycle through analysis messages
  useEffect(() => {
    if (currentStep === 5.5) {
      let messageIndex = 0;
      setAnalysisMessage(analysisMessages[0]);

      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % analysisMessages.length;
        setAnalysisMessage(analysisMessages[messageIndex]);
      }, 750); // Change message every 750ms

      return () => clearInterval(interval);
    }
  }, [currentStep, analysisMessages]);

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
    if (currentStep === 5) {
      // After Step 5, go to analysis screen
      setCurrentStep(5.5);
      // Simulate analysis time, then automatically go to "ready" screen
      setTimeout(() => {
        setCurrentStep(5.7);
      }, 3000); // 3 second analysis simulation
    } else if (currentStep === 5.7) {
      // From "ready" screen, go to the report
      setCurrentStep(6);
    } else if (currentStep === totalSteps) {
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
        <div className="mx-auto max-w-xl px-4 py-4 md:px-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {currentStep === 5.5
                ? "Analyzing..."
                : currentStep === 5.7
                  ? "Step 6 of 7: Plan Ready!"
                  : `Step ${Math.floor(currentStep)} of ${totalSteps}`}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {currentStep === 5.5
                ? "Processing..."
                : currentStep === 5.7
                  ? "100% Complete"
                  : `${Math.round((Math.floor(currentStep) / totalSteps) * 100)}% Complete`}
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#FF7F50] to-[#3498DB] transition-all duration-300"
              style={{
                width:
                  currentStep === 5.5
                    ? "85%"
                    : currentStep === 5.7
                      ? "100%"
                      : `${(Math.floor(currentStep) / totalSteps) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold md:text-2xl">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
          {currentStep > 0 &&
            currentStep < totalSteps &&
            currentStep !== 5.5 &&
            currentStep !== 5.7 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-700 md:px-4 md:py-2 md:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 pb-8 md:px-8 md:pb-16">
        <div
          className={`relative w-full overflow-hidden rounded-2xl border border-blue-200/30 bg-white shadow-2xl ${
            currentStep === 6
              ? "max-w-4xl space-y-6 p-4 md:space-y-8 md:p-8"
              : "max-w-xl space-y-6 p-6 md:p-10"
          }`}
        >
          {/* Background accent */}
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10"></div>

          <div className="relative z-10">
            {/* Step 0: Introduction */}
            {currentStep === 0 && (
              <div className="space-y-7">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    Complete Your Initial Farm Assessment in 15 Minutes
                  </h1>
                  <p className="mb-9 text-lg text-gray-600">
                    Get instant insights on your farm's operations and discover
                    opportunities to reduce costs and boost yields.
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
                      See your current farm operations clearly
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
                      Find what's limiting your farm's potential
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
                      Get priority actions to improve next
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-7 text-base text-gray-600">
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

                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      100% Free • No Credit Card Required
                    </p>

                    <div className="flex items-center justify-center">
                      <span className="text-sm text-gray-400">
                        Already have an account?
                      </span>
                      <Link
                        href="/auth"
                        className="ml-2 text-sm font-medium text-[#3498DB] hover:text-[#2980b9] hover:underline"
                      >
                        Log in here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Farm at a Glance */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Tell Us About Your Farm
                  </h1>
                  <p className="text-base text-gray-600">
                    Just a few quick details to create your personalized plan
                  </p>
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
                      className="h-14 w-full rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 text-lg font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
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
                      className="h-14 w-full rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 text-lg font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
                      placeholder="e.g., Tagum City, Davao del Norte"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.farmName || !formData.farmLocation}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Farm Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Tell Us More About Your Farm
                  </h1>
                  <p className="text-base text-gray-600">
                    Help us understand your shrimp and farming style
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is the main shrimp species you currently farm or plan
                      to farm?
                    </label>
                    <div className="space-y-3">
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
                        <div key={option.id}>
                          <button
                            onClick={() => {
                              updateFormData("shrimpSpecies", option.id);
                              if (option.id !== "other") {
                                updateFormData("shrimpSpeciesOther", "");
                              }
                            }}
                            className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                              formData.shrimpSpecies === option.id
                                ? "border-[#3498DB] bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                                {formData.shrimpSpecies === option.id && (
                                  <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                                )}
                              </div>
                              <div className="text-base font-medium text-gray-900">
                                {option.label}
                              </div>
                            </div>
                          </button>
                          {option.id === "other" &&
                            formData.shrimpSpecies === "other" && (
                              <div className="ml-8 mt-3">
                                <Input
                                  type="text"
                                  value={formData.shrimpSpeciesOther}
                                  onChange={e =>
                                    updateFormData(
                                      "shrimpSpeciesOther",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 text-base font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
                                  placeholder="Please specify your shrimp species..."
                                />
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your current farming system?
                    </label>
                    <div className="space-y-3">
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
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.farmingSystem === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                              {formData.farmingSystem === option.id && (
                                <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                              )}
                            </div>
                            <div className="text-base font-medium text-gray-900">
                              {option.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={
                      !formData.shrimpSpecies ||
                      !formData.farmingSystem ||
                      (formData.shrimpSpecies === "other" &&
                        !formData.shrimpSpeciesOther.trim())
                    }
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Water & Pond Basics */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Water & Pond Basics
                  </h1>
                  <p className="text-base text-gray-600">
                    Tell us about your water sources and pond preparation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your main water source for the ponds? (Select all
                      that apply)
                    </label>{" "}
                    <div className="space-y-3">
                      {[
                        { id: "river", label: "River" },
                        { id: "sea", label: "Sea/Ocean" },
                        { id: "well", label: "Deep Well" },
                        { id: "rain", label: "Rainwater" },
                        { id: "other", label: "Other" },
                      ].map(option => (
                        <div key={option.id}>
                          <button
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

                              // Clear the "Other" field if "Other" is unchecked
                              if (
                                option.id === "other" &&
                                currentSources.includes("other")
                              ) {
                                updateFormData("waterSourceOther", "");
                              }
                            }}
                            className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                              formData.waterSources.includes(option.id)
                                ? "border-[#3498DB] bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-gray-300">
                                {formData.waterSources.includes(option.id) && (
                                  <svg
                                    className="h-3 w-3 text-[#3498DB]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="text-base font-medium text-gray-900">
                                {option.label}
                              </div>
                            </div>
                          </button>
                          {option.id === "other" &&
                            formData.waterSources.includes("other") && (
                              <div className="ml-8 mt-3">
                                <Input
                                  type="text"
                                  value={formData.waterSourceOther}
                                  onChange={e =>
                                    updateFormData(
                                      "waterSourceOther",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 text-base font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
                                  placeholder="Please specify your water source..."
                                />
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Before stocking shrimp, do you completely drain and
                      sun-dry your ponds until the bottom cracks?
                    </label>
                    <div className="space-y-3">
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
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.pondDrying === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                              {formData.pondDrying === option.id && (
                                <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                              )}
                            </div>
                            <div className="text-base font-medium text-gray-900">
                              {option.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={
                      formData.waterSources.length === 0 ||
                      !formData.pondDrying ||
                      (formData.waterSources.includes("other") &&
                        !formData.waterSourceOther.trim())
                    }
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Stock & Farm Entry */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Shrimp Stock & Farm Security
                  </h1>
                  <p className="text-base text-gray-600">
                    Tell us about your shrimp sources and farm access control
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Where do you typically get your young shrimp (post-larvae
                      / PLs) from?
                    </label>
                    <div className="space-y-3">
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
                        <div key={option.id}>
                          <button
                            onClick={() => {
                              updateFormData("shrimpSource", option.id);
                              if (option.id !== "other") {
                                updateFormData("shrimpSourceOther", "");
                              }
                            }}
                            className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                              formData.shrimpSource === option.id
                                ? "border-[#3498DB] bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                                {formData.shrimpSource === option.id && (
                                  <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                                )}
                              </div>
                              <div className="text-base font-medium text-gray-900">
                                {option.label}
                              </div>
                            </div>
                          </button>
                          {option.id === "other" &&
                            formData.shrimpSource === "other" && (
                              <div className="ml-8 mt-3">
                                <Input
                                  type="text"
                                  value={formData.shrimpSourceOther}
                                  onChange={e =>
                                    updateFormData(
                                      "shrimpSourceOther",
                                      e.target.value
                                    )
                                  }
                                  className="h-12 w-full rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 text-base font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
                                  placeholder="Please specify your shrimp source..."
                                />
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Do you have basic measures to control who enters your farm
                      (e.g., a fence, gate, or sign)?
                    </label>
                    <div className="space-y-3">
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
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.farmAccess === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                              {formData.farmAccess === option.id && (
                                <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                              )}
                            </div>
                            <div className="text-base font-medium text-gray-900">
                              {option.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={
                      !formData.shrimpSource ||
                      !formData.farmAccess ||
                      (formData.shrimpSource === "other" &&
                        !formData.shrimpSourceOther.trim())
                    }
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Health & Challenges */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Health History & Budget Planning
                  </h1>
                  <p className="text-base text-gray-600">
                    Help us understand your challenges and investment capacity
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      Have you experienced any disease outbreaks or unexplained
                      mass mortalities in your shrimp in the past year?
                    </label>
                    <div className="space-y-3">
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
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.diseaseHistory === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                              {formData.diseaseHistory === option.id && (
                                <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                              )}
                            </div>
                            <div className="text-base font-medium text-gray-900">
                              {option.label}
                            </div>
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
                      <Textarea
                        id="diseaseDescription"
                        value={formData.diseaseDescription}
                        onChange={e =>
                          updateFormData("diseaseDescription", e.target.value)
                        }
                        rows={3}
                        className="w-full resize-none rounded-lg border-2 border-gray-200 bg-gray-50/50 px-4 py-3 text-lg font-medium text-gray-900 placeholder:text-gray-500 focus:border-[#3498DB] focus:bg-white focus:ring-0"
                        placeholder="e.g., White spot disease, sudden mortality, early morning deaths..."
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-3 block text-base font-medium text-gray-700">
                      What is your estimated budget range for biosecurity
                      improvements in the next 6-12 months?
                    </label>
                    <div className="space-y-3">
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
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                            formData.budget === option.id
                              ? "border-[#3498DB] bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                              {formData.budget === option.id && (
                                <div className="h-3 w-3 rounded-full bg-[#3498DB]"></div>
                              )}
                            </div>
                            <div className="text-base font-medium text-gray-900">
                              {option.label}
                            </div>
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

            {/* Step 5.5: Analyzing Your Farm (Analysis in Progress) */}
            {currentStep === 5.5 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    LikAI is Crafting Your Personalized Plan!
                  </h1>
                  <p className="text-base text-gray-600">
                    Our AI is hard at work, combining your farm's unique details
                    with expert GAqP knowledge to create your custom action
                    plan.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  {/* Animated Loading Element */}
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-orange-100">
                      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#3498DB]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🦐</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Progress Text */}
                  <div className="space-y-3 text-center">
                    <p className="text-lg font-medium text-gray-700">
                      {analysisMessage}
                    </p>
                    <p className="text-sm text-gray-500">
                      This might take a moment. We're making sure your plan is
                      perfect for your farm!
                    </p>
                  </div>

                  {/* Progress Indicators */}
                  <div className="w-full max-w-md space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>✓ Farm details reviewed</span>
                        <span className="text-green-600">Complete</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>⚡ Analyzing biosecurity gaps</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-[#3498DB]">In progress</span>
                          <div className="flex space-x-0.5">
                            <div className="h-1 w-1 animate-pulse rounded-full bg-[#3498DB]"></div>
                            <div
                              className="h-1 w-1 animate-pulse rounded-full bg-[#3498DB]"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-1 w-1 animate-pulse rounded-full bg-[#3498DB]"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>📋 Creating action plan</span>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Encouraging Message */}
                  <div className="rounded-lg bg-gradient-to-r from-blue-50 to-orange-50 p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Soon, you'll have clear steps to a healthier, more
                      profitable farm! 🌟
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5.7: Your Plan is Ready! (Report Ready) */}
            {currentStep === 5.7 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    Your Personalized Plan is Ready!
                  </h1>
                  <p className="text-base text-gray-600">
                    LikAI's AI has finished building your custom biosecurity
                    action plan. It's tailored to your farm's unique needs to
                    help you minimize risks and boost your yields.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  {/* Celebratory Visual */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 shadow-lg">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                        <svg
                          className="h-10 w-10 text-white"
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
                    </div>
                    {/* Celebration sparkles */}
                    <div className="absolute -right-2 -top-2 text-yellow-400">
                      ✨
                    </div>
                    <div className="absolute -bottom-2 -left-2 text-yellow-400">
                      ⭐
                    </div>
                    <div className="absolute -left-4 top-0 text-yellow-400">
                      🎉
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="text-center">
                    <h2 className="mb-2 text-lg font-bold text-green-800">
                      Great News,{" "}
                      {(() => {
                        if (formData.farmName) {
                          // Extract first word from farm name as farmer's name
                          const farmNameWords = formData.farmName
                            .trim()
                            .split(" ");
                          const firstName = farmNameWords[0];
                          // Check if it looks like a person's name (not containing words like "Farm", "Aqua", etc.)
                          const farmWords = [
                            "farm",
                            "aqua",
                            "shrimp",
                            "pond",
                            "fishing",
                            "fishery",
                          ];
                          const isPersonName = !farmWords.some(word =>
                            firstName.toLowerCase().includes(word.toLowerCase())
                          );

                          if (isPersonName && firstName.length > 1) {
                            return `Farmer ${firstName}`;
                          }
                        }
                        return "Farmer";
                      })()}
                      !
                    </h2>
                    <p className="text-base text-gray-600">
                      You're just one tap away from clear, actionable steps to a
                      healthier, more profitable farm.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full space-y-4">
                    <Button
                      onClick={handleNext}
                      className="h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white shadow-lg transition-all hover:bg-[#E6723C] hover:shadow-xl"
                    >
                      View My Personalized Report
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  {/* Benefit Text */}
                  <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      💡 Keep your plan handy, even offline, for reference in
                      the field!
                    </p>
                  </div>

                  {/* Small LikAI branding */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Powered by</span>
                    <span className="font-bold text-[#3498DB]">LikAI</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Biosecurity Report */}
            {currentStep === 6 && (
              <div className="space-y-14">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 md:text-4xl">
                    🦐 Your Personalized Biosecurity Starter Plan!
                  </h1>
                  <p className="mx-auto max-w-3xl text-base font-medium leading-7 text-gray-700 md:text-lg md:leading-8">
                    Great job,{" "}
                    {formData.farmName
                      ? `Farmer ${formData.farmName.split(" ")[0] || formData.farmName}`
                      : "Mang/Aling Farmer"}
                    ! LikAI's AI has created your custom plan to help you grow
                    healthier shrimp and protect your profits. Here's your
                    farm's quick health report:
                  </p>
                  {/* Add a subtle water ripple decoration */}
                  <div className="mt-3 flex justify-center space-x-2 opacity-30 md:mt-4">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></div>
                    <div
                      className="h-2 w-2 animate-pulse rounded-full bg-blue-300"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Farm Health Status */}
                <div className="space-y-4">
                  {/* Quick Score Legend */}
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-4 rounded-lg bg-gray-50 px-4 py-2 text-xs md:text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-700">80%+ Excellent</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">60%+ Good</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-gray-700">40%+ Needs Work</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-gray-700">Under 40% Urgent</span>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const scores = calculateBiosecurityScores();

                    const farmAreas = [
                      {
                        name: "Pond & Water Care",
                        score: scores.pondWaterCare,
                        icon: "💧",
                        description: "How well you prepare your ponds",
                      },
                      {
                        name: "Farm Access Control",
                        score: scores.farmAccess,
                        icon: "🚪",
                        description: "Who can enter your farm",
                      },
                      {
                        name: "Healthy Stock Sourcing",
                        score: scores.stockSourcing,
                        icon: "🦐",
                        description: "Where you get your baby shrimp",
                      },
                      {
                        name: "Farm Setup Basics",
                        score: scores.farmSetup,
                        icon: "🏗️",
                        description: "Your farm design and species choice",
                      },
                      {
                        name: "Disease Readiness",
                        score: scores.diseaseReadiness,
                        icon: "🛡️",
                        description: "How ready you are for health problems",
                      },
                    ];

                    const getStatusInfo = (score: number) => {
                      if (score > 80)
                        return {
                          status: "Excellent",
                          numericScore: "5/5",
                          color: "bg-green-500",
                          bgColor: "bg-green-50 border-green-300",
                          textColor: "text-green-800",
                          shadowColor: "shadow-green-100",
                        };
                      if (score > 60)
                        return {
                          status: "Good",
                          numericScore: "4/5",
                          color: "bg-blue-500",
                          bgColor: "bg-blue-50 border-blue-300",
                          textColor: "text-blue-800",
                          shadowColor: "shadow-blue-100",
                        };
                      if (score > 40)
                        return {
                          status: "Needs Work",
                          numericScore: "3/5",
                          color: "bg-yellow-500",
                          bgColor: "bg-yellow-50 border-yellow-300",
                          textColor: "text-yellow-800",
                          shadowColor: "shadow-yellow-100",
                        };
                      return {
                        status: "Urgent Focus",
                        numericScore: "2/5",
                        color: "bg-red-500",
                        bgColor: "bg-red-50 border-red-300",
                        textColor: "text-red-800",
                        shadowColor: "shadow-red-100",
                      };
                    };

                    return farmAreas.map((area, index) => {
                      const statusInfo = getStatusInfo(area.score);

                      return (
                        <div
                          key={index}
                          className={`rounded-xl border-2 p-4 md:p-5 ${statusInfo.bgColor} ${statusInfo.shadowColor} shadow-md transition-all hover:scale-[1.01] hover:shadow-lg`}
                        >
                          <div className="mb-4 flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
                            <div className="flex items-center space-x-3 md:space-x-4">
                              <div className="flex-shrink-0 text-2xl md:text-3xl">
                                {area.icon}
                              </div>
                              <div>
                                <h4
                                  className={`text-lg font-bold md:text-xl ${statusInfo.textColor} mb-1`}
                                >
                                  {area.name}
                                </h4>
                                <p className="text-sm text-gray-600 md:text-base">
                                  {area.description}
                                </p>
                              </div>
                            </div>
                            <div className="w-full text-center sm:w-auto sm:text-right">
                              <div
                                className={`rounded-xl px-3 py-1.5 text-sm font-bold md:px-4 md:py-2 md:text-base ${statusInfo.bgColor} ${statusInfo.textColor} border-2 shadow-sm`}
                              >
                                {statusInfo.status} ({statusInfo.numericScore})
                              </div>
                              <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">
                                {area.score}% score
                              </p>
                            </div>
                          </div>{" "}
                          {/* Enhanced Visual Progress Bar */}
                          <div className="relative h-5 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
                            <div
                              className={`h-full transition-all duration-1000 ${statusInfo.color} relative shadow-sm`}
                              style={{ width: `${area.score}%` }}
                            >
                              {/* Subtle shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Enhanced What This Means Section */}
                <div className="space-y-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 p-6 shadow-lg">
                  <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 md:mb-6 md:text-3xl">
                    📊 What This Means for Your Farm
                  </h3>

                  {(() => {
                    const scores = calculateBiosecurityScores();
                    const strengths = [];
                    const improvements = [];

                    if (scores.farmSetup >= 60)
                      strengths.push({
                        name: "Farm Setup",
                        icon: "⭐",
                        detail: "Good species choice and design.",
                      });
                    else
                      improvements.push({
                        name: "Farm Setup",
                        icon: "🔧",
                        detail: "Better setup = healthier shrimp.",
                      });

                    if (scores.stockSourcing >= 60)
                      strengths.push({
                        name: "Stock Sourcing",
                        icon: "⭐",
                        detail: "You pick quality baby shrimp.",
                      });
                    else
                      improvements.push({
                        name: "Stock Sourcing",
                        icon: "🔧",
                        detail: "Better babies = more harvest.",
                      });

                    if (scores.pondWaterCare >= 60)
                      strengths.push({
                        name: "Pond Care",
                        icon: "⭐",
                        detail: "Your pond prep protects shrimp.",
                      });
                    else
                      improvements.push({
                        name: "Pond Care",
                        icon: "🔧",
                        detail: "Clean ponds prevent diseases.",
                      });

                    if (scores.farmAccess >= 60)
                      strengths.push({
                        name: "Farm Security",
                        icon: "⭐",
                        detail: "You control farm access well.",
                      });
                    else
                      improvements.push({
                        name: "Farm Security",
                        icon: "🔧",
                        detail: "Control access = stop diseases.",
                      });

                    if (scores.diseaseReadiness >= 60)
                      strengths.push({
                        name: "Disease Prep",
                        icon: "⭐",
                        detail: "You're ready for health issues.",
                      });
                    else
                      improvements.push({
                        name: "Disease Prep",
                        icon: "🔧",
                        detail: "Being prepared saves crops.",
                      });

                    return (
                      <div className="mx-auto grid max-w-4xl gap-4 md:gap-6 lg:grid-cols-2">
                        {strengths.length > 0 && (
                          <div className="rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-lg md:p-6">
                            <h4 className="mb-4 flex items-center text-xl font-bold text-green-800 md:mb-6 md:text-2xl">
                              <span className="mr-2 text-2xl md:mr-3 md:text-3xl">
                                🌟
                              </span>
                              What You're Doing Great!
                            </h4>
                            <div className="space-y-3 md:space-y-4">
                              {strengths.map((strength, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 rounded-xl border-2 border-green-300 bg-white p-3 shadow-sm transition-all hover:shadow-md md:space-x-4 md:p-4"
                                >
                                  <span className="flex-shrink-0 text-xl md:text-2xl">
                                    {strength.icon}
                                  </span>
                                  <div>
                                    <div className="mb-1 text-sm font-bold text-green-800 md:text-base">
                                      {strength.name}
                                    </div>
                                    <div className="text-xs text-green-700 md:text-sm">
                                      {strength.detail}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {improvements.length > 0 && (
                          <div className="rounded-2xl border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50 p-4 shadow-lg md:p-6">
                            <h4 className="mb-4 flex items-center text-xl font-bold text-orange-800 md:mb-6 md:text-2xl">
                              <span className="mr-2 text-2xl md:mr-3 md:text-3xl">
                                🚀
                              </span>
                              Where You Can Improve
                            </h4>
                            <div className="space-y-3 md:space-y-4">
                              {improvements.map((improvement, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 rounded-xl border-2 border-orange-300 bg-white p-3 shadow-sm transition-all hover:shadow-md md:space-x-4 md:p-4"
                                >
                                  <span className="flex-shrink-0 text-xl md:text-2xl">
                                    {improvement.icon}
                                  </span>
                                  <div>
                                    <div className="mb-1 text-sm font-bold text-orange-800 md:text-base">
                                      {improvement.name}
                                    </div>
                                    <div className="text-xs text-orange-700 md:text-sm">
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
                <div className="space-y-6 rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg">
                  <div className="text-center">
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 md:mb-4 md:text-3xl">
                      🎯 Your Simple Action Plan
                    </h3>
                    <p className="mx-auto max-w-2xl text-base font-medium text-gray-700 md:text-lg">
                      Follow these easy steps to improve your farm. Start with
                      Step 1!
                    </p>
                  </div>

                  {(() => {
                    const scores = calculateBiosecurityScores();
                    const actionItems = [];

                    if (scores.pondWaterCare < 60) {
                      actionItems.push({
                        title: "Clean & Dry Your Ponds",
                        priority: "Urgent Focus",
                        priorityColor: "bg-red-500 text-white",
                        why: "Prevents diseases, boosts growth.",
                        what: [
                          "Drain all water",
                          "Remove mud/feed",
                          "Sun-dry until cracks",
                          "Check fresh smell",
                        ],
                        tip: "💰 Use sunshine instead of chemicals. Simple and saves money!",
                        visualTip: "📸 See How",
                        icon: "☀️",
                        timeframe: "1-2 weeks",
                        cost: "Almost Free!",
                      });
                    }

                    if (scores.farmAccess < 60) {
                      actionItems.push({
                        title: "Secure Your Farm Entrance",
                        priority: "Needs Work",
                        priorityColor: "bg-yellow-500 text-white",
                        why: "Stops diseases from entering.",
                        what: [
                          "Put up simple fence",
                          "Make one entrance",
                          "Set up lime footbath",
                          "Add 'Private Farm' sign",
                        ],
                        tip: "💰 Bamboo and fishing net work great. Old basin = perfect footbath!",
                        visualTip: "� See How",
                        icon: "🚪",
                        timeframe: "1 week",
                        cost: "Low Cost",
                      });
                    }

                    if (scores.stockSourcing < 60) {
                      actionItems.push({
                        title: "Get Better Baby Shrimp",
                        priority: "Important",
                        priorityColor: "bg-blue-500 text-white",
                        why: "Healthy babies = healthy adults.",
                        what: [
                          "Buy from BFAR hatchery",
                          "Check active, same size",
                          "Ask for health certificate",
                          "Test small batch first",
                        ],
                        tip: "💰 Good babies cost more but give 2x harvest. Worth it!",
                        visualTip: "📸 See How",
                        icon: "🦐",
                        timeframe: "Next stocking",
                        cost: "Worth It!",
                      });
                    }

                    if (scores.diseaseReadiness < 60) {
                      actionItems.push({
                        title: "Prepare for Health Problems",
                        priority: "Good to Have",
                        priorityColor: "bg-green-500 text-white",
                        why: "Ready before problems hit.",
                        what: [
                          "Make emergency contact list",
                          "Stock basic supplies",
                          "Learn disease symptoms",
                          "Find trusted aqua vet",
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
                      <div className="mx-auto max-w-3xl space-y-4">
                        {actionItems.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-3 shadow-md transition-all duration-300 hover:shadow-lg md:p-4"
                          >
                            {/* Step Header */}
                            <div className="mb-3 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:space-y-0 md:mb-4">
                              <div className="flex items-center space-x-2 md:space-x-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7F50] to-[#E6723C] text-sm font-bold text-white shadow-md md:h-10 md:w-10 md:text-base">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="mb-1 text-base font-bold text-gray-900 md:text-lg">
                                    {item.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                    <span
                                      className={`rounded-full px-2 py-0.5 font-medium ${
                                        item.priority === "Urgent Focus"
                                          ? "bg-red-100 text-red-800"
                                          : item.priority === "Needs Work"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : item.priority === "Good"
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {item.priority}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                                      {item.timeframe}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                                      {item.cost}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl">
                                {item.icon}
                              </div>
                            </div>

                            {/* Step Content */}
                            <div className="space-y-2.5">
                              {/* Why Important */}
                              <div className="flex items-start space-x-2 rounded-lg border border-blue-100 bg-white p-3">
                                <div className="text-base">💡</div>
                                <div>
                                  <div className="mb-0.5 text-sm font-semibold text-gray-900">
                                    Why it's important:
                                  </div>
                                  <div className="text-xs leading-6 text-gray-700 md:text-sm">
                                    {item.why}
                                  </div>
                                </div>
                              </div>

                              {/* What to Do */}
                              <div className="flex items-start space-x-2 rounded-lg border border-blue-100 bg-white p-3">
                                <div className="text-base">📋</div>
                                <div className="flex-1">
                                  <div className="mb-1 text-sm font-semibold text-gray-900">
                                    What to do:
                                  </div>
                                  <ul className="space-y-1.5">
                                    {item.what.map((step, stepIndex) => (
                                      <li
                                        key={stepIndex}
                                        className="flex items-start space-x-1.5"
                                      >
                                        <span className="mt-0.5 text-xs text-[#3498DB]">
                                          •
                                        </span>
                                        <span className="text-xs text-gray-700 md:text-sm">
                                          {step}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* LikAI Tip with Prominent Visual Guide */}
                              <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-3">
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-2">
                                    <div className="text-base">🎯</div>
                                    <div className="flex-1">
                                      <div className="mb-0.5 text-sm font-semibold text-orange-800">
                                        LikAI's Smart Tip:
                                      </div>
                                      <div className="text-xs leading-relaxed text-orange-700 md:text-sm">
                                        {item.tip}
                                      </div>
                                    </div>
                                  </div>
                                  {/* Prominent Visual Guide Button */}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex h-10 w-full items-center justify-center gap-2 border-2 border-orange-500 bg-white text-sm font-bold text-orange-700 shadow-sm hover:border-orange-600 hover:bg-orange-50 hover:shadow-md md:h-12 md:text-base"
                                    onClick={() => {
                                      // This would open a visual guide/tutorial
                                      console.log(
                                        `Opening visual guide for: ${item.title}`
                                      );
                                    }}
                                  >
                                    <span className="text-xl md:text-2xl">
                                      📹
                                    </span>
                                    Watch How-To Video
                                  </Button>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col space-y-1.5 pt-1.5 sm:flex-row sm:space-x-2 sm:space-y-0">
                                <Button
                                  variant="outline"
                                  className="h-8 flex-1 border-green-500 text-xs font-medium text-green-600 hover:bg-green-50 md:text-sm"
                                >
                                  ✅ Mark Complete
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="h-8 px-4 text-xs font-medium text-gray-600 hover:bg-gray-50 md:text-sm"
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
                <div className="space-y-6 pt-8 text-center md:pt-12">
                  <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
                    <h4 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                      🚀 Ready to transform your farm?
                    </h4>
                    <p className="mx-auto mb-6 max-w-2xl text-base text-gray-600 md:text-lg">
                      Your personalized plan is ready! Let's take you to your
                      dashboard where you can track progress, get AI coaching,
                      and watch your farm thrive.
                    </p>
                    <Button
                      onClick={handleNext}
                      className="h-12 w-full transform rounded-lg bg-gradient-to-r from-[#FF7F50] to-[#E6723C] px-8 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#E6723C] hover:to-[#D35400] hover:shadow-xl sm:w-auto md:h-14 md:px-10 md:text-lg"
                    >
                      Download the Report{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Final Completion */}
            {currentStep === 7 && (
              <div className="space-y-8 text-center">
                <div className="space-y-6">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    🎉 You've Completed Your Quick Assessment!
                  </h1>

                  <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-7 text-gray-700">
                    Great job,{" "}
                    {formData.farmName
                      ? `Farmer ${formData.farmName.split(" ")[0] || formData.farmName}`
                      : "Farmer"}
                    ! By following these steps, you're already making your farm
                    much safer and more profitable. Now, take your next step
                    towards a thriving farm!
                  </p>
                </div>

                {!isLoading ? (
                  <>
                    {/* Primary Options */}
                    <div className="space-y-7">
                      {/* Option 1: Download Report */}
                      <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <h3 className="mb-3 flex items-center justify-center text-xl font-bold text-gray-900">
                          <span className="mr-2 text-xl">📄</span>
                          Download Your Personalized Report
                        </h3>
                        <p className="mb-4 text-sm leading-6 text-gray-600">
                          Keep your plan handy, even offline. Perfect for
                          reference while working on your farm.
                        </p>
                        <Button
                          variant="outline"
                          className="h-12 w-full border-2 border-blue-500 text-base font-semibold text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            // This would trigger the PDF download
                            console.log("Downloading PDF report...");
                          }}
                        >
                          <svg
                            className="mr-3 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download My Report (PDF)
                        </Button>
                      </div>

                      {/* Option 2: Continue Journey */}
                      <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
                        <h3 className="mb-3 flex items-center justify-center text-xl font-bold text-gray-900">
                          <span className="mr-2 text-xl">🚀</span>
                          Continue Your Journey with LikAI
                        </h3>
                        <p className="mb-4 text-sm leading-6 text-gray-600">
                          Access your plan anytime, track progress, and unlock
                          more powerful AI tools!
                        </p>
                        <Button
                          onClick={() => router.push("/auth")}
                          className="h-14 w-full transform rounded-lg bg-gradient-to-r from-[#FF7F50] to-[#E6723C] text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#E6723C] hover:to-[#D35400] hover:shadow-xl"
                        >
                          Get Free Access Now!{" "}
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Upgrade Pitch */}
                    <div className="mt-10 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-gray-900">
                          Ready to unlock your farm's full potential?
                        </h4>
                        <p className="text-sm leading-6 text-gray-600">
                          Upgrade to our Business Plan: Dynamic plans, unlimited
                          AI coaching, and smart investment guidance!
                        </p>
                        <Button
                          variant="outline"
                          className="h-10 w-full border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Learn More About Business Plan
                        </Button>
                      </div>
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
