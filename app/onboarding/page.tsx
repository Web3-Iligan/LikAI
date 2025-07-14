"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Fish,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    farmType: "",
    farmerType: "",
    companyName: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep === totalSteps) {
      setIsLoading(true);
      // Simulate registration process
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to dashboard or success page
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordRequirements = () => {
    const requirements = [
      { text: "At least 12 characters", met: formData.password.length >= 12 },
      { text: "One lowercase character", met: /[a-z]/.test(formData.password) },
      { text: "One uppercase character", met: /[A-Z]/.test(formData.password) },
      {
        text: "One number, symbol or whitespace character",
        met: /[\d\W]/.test(formData.password),
      },
    ];
    return requirements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
      {/* Progress Bar */}
      <div className="w-full border-b border-blue-200/50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-md px-8 py-4">
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
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3498DB] to-[#2980B9] shadow-lg">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
          {currentStep > 1 && currentStep < totalSteps && (
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
        <div className="relative w-full max-w-md space-y-8 overflow-hidden rounded-2xl border border-blue-200/30 bg-white p-8 shadow-2xl">
          {/* Background accent */}
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10"></div>

          <div className="relative z-10">
            {/* Step 1: Create Password */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    Create your password
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={e =>
                          updateFormData("password", e.target.value)
                        }
                        className="h-12 w-full rounded-lg border-2 border-[#3498DB] px-4 pr-12 focus:border-transparent focus:ring-2 focus:ring-[#3498DB]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    {getPasswordRequirements().map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full ${req.met ? "bg-green-500" : "bg-gray-300"}`}
                        >
                          {req.met && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span
                          className={`text-sm ${req.met ? "text-green-600" : "text-gray-600"}`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!getPasswordRequirements().every(req => req.met)}
                    className="h-12 w-full rounded-lg bg-[#FF7F50] font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Name */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    What is your name?
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={e =>
                        updateFormData("firstName", e.target.value)
                      }
                      className="h-12 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 focus:border-[#3498DB] focus:ring-0"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={e => updateFormData("lastName", e.target.value)}
                      className="h-12 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 focus:border-[#3498DB] focus:ring-0"
                      placeholder="Last name"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName}
                    className="h-12 w-full rounded-lg bg-[#FF7F50] font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Farm Type */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Nice to meet you {formData.firstName}!
                  </h1>
                  <h2 className="text-2xl font-semibold text-gray-700">
                    What is your farm type?
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      id: "small",
                      label: "Small Scale Farm",
                      desc: "Individual or family-owned operations",
                    },
                    {
                      id: "medium",
                      label: "Medium Scale Farm",
                      desc: "Commercial operations with moderate capacity",
                    },
                    {
                      id: "enterprise",
                      label: "Enterprise Farm",
                      desc: "Large-scale commercial aquaculture facilities",
                    },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        updateFormData("farmType", option.id);
                        setTimeout(handleNext, 300);
                      }}
                      className={`rounded-lg border-2 p-4 text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmType === option.id
                          ? "border-[#3498DB] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Farmer Type */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    Which best describes you?
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "new", label: "New Farmer" },
                    { id: "existing", label: "Existing Farmer" },
                    { id: "consultant", label: "Consultant" },
                    { id: "researcher", label: "Researcher" },
                    { id: "investor", label: "Investor" },
                    { id: "other", label: "Other" },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData("farmerType", option.id)}
                      className={`rounded-lg border-2 p-4 text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmerType === option.id
                          ? "border-[#3498DB] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>

                {formData.farmerType && (
                  <div className="text-center">
                    <button
                      onClick={handleNext}
                      className="font-medium text-[#3498DB] hover:text-[#2980B9]"
                    >
                      None of these describe my role
                    </button>
                  </div>
                )}

                {formData.farmerType && (
                  <Button
                    onClick={handleNext}
                    className="h-12 w-full rounded-lg bg-[#FF7F50] font-medium text-white hover:bg-[#E6723C]"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 5: Company Name */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-4 text-3xl font-bold text-gray-900">
                    What is your farm's name?
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Farm name
                    </label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={e =>
                          updateFormData("companyName", e.target.value)
                        }
                        className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:border-transparent focus:ring-2 focus:ring-[#3498DB]"
                        placeholder="Enter your farm name"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500">
                          <span className="text-xs text-white">i</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.companyName && (
                    <div className="rounded-lg bg-gray-800 p-3 text-white">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">No items to show</span>
                      </div>
                      <button className="mt-2 flex items-center text-sm text-[#3498DB]">
                        <span className="mr-2">+</span> New Identity
                      </button>
                    </div>
                  )}

                  <Button
                    onClick={handleNext}
                    disabled={!formData.companyName}
                    className="h-12 w-full rounded-lg bg-[#FF7F50] font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Welcome/Loading */}
            {currentStep === 6 && (
              <div className="space-y-6 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                  We're glad you're here, {formData.firstName}!
                </h1>

                <div className="mb-6 flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3498DB] to-[#2980B9] shadow-lg">
                    <Fish className="h-16 w-16 text-white" />
                  </div>
                </div>

                {!isLoading ? (
                  <>
                    <p className="mb-6 text-gray-600">
                      Next, let's tailor your aquaculture experience
                    </p>
                    <Button
                      onClick={handleNext}
                      className="h-12 w-full rounded-lg bg-[#FF7F50] font-medium text-white hover:bg-[#E6723C]"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#3498DB]" />
                    <p className="text-gray-600">
                      Setting up your aquaculture dashboard...
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
