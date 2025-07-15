"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    farmType: "",
    farmerType: "",
    companyName: "",
  });

  const totalSteps = 5;

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

  const updateFormData = (field: string, value: string) => {
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
        <div className="relative w-full max-w-xl space-y-6 overflow-hidden rounded-2xl border border-blue-200/30 bg-white p-10 shadow-2xl">
          {/* Background accent */}
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10"></div>

          <div className="relative z-10">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    What is your name?
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-base font-medium text-gray-700"
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
                      className="h-14 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 text-lg focus:border-[#3498DB] focus:ring-0"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-base font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={e => updateFormData("lastName", e.target.value)}
                      className="h-14 w-full rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-[#3498DB] bg-transparent px-4 text-lg focus:border-[#3498DB] focus:ring-0"
                      placeholder="Last name"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Farm Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Nice to meet you {formData.firstName}!
                  </h1>
                  <h2 className="text-lg font-semibold text-gray-700">
                    What is your farm type?
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
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
                      className={`flex min-h-[100px] flex-col justify-center rounded-lg border-2 p-3 text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmType === option.id
                          ? "border-[#3498DB] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="mb-1 text-sm font-semibold text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Farmer Type */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-xl font-bold text-gray-900">
                    Which best describes your role?
                  </h1>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "owner", label: "Owner" },
                    { id: "executive", label: "Executive Team" },
                    { id: "manager", label: "Manager" },
                    { id: "employee", label: "Employee" },
                    { id: "student", label: "Student/Intern" },
                    { id: "freelancer", label: "Freelancer" },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData("farmerType", option.id)}
                      className={`flex min-h-[70px] items-center justify-center rounded-lg border-2 p-3 text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmerType === option.id
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

                {formData.farmerType && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleNext}
                      className="text-base font-medium text-[#3498DB] hover:text-[#2980B9]"
                    >
                      None of these describe my role
                    </button>
                  </div>
                )}

                {formData.farmerType && (
                  <Button
                    onClick={handleNext}
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C]"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 4: Company Name */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="mb-3 text-xl font-bold text-gray-900">
                    What is your farm's name?
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="mb-2 block text-base font-medium text-gray-700"
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
                        className="h-14 w-full rounded-lg border border-gray-300 px-4 text-lg focus:border-transparent focus:ring-2 focus:ring-[#3498DB]"
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
                    className="mt-6 h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Welcome/Loading */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                  We're glad you're here, {formData.firstName}!
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
                    <p className="mb-6 text-base text-gray-600">
                      Next, let's tailor your aquaculture experience
                    </p>
                    <Button
                      onClick={handleNext}
                      className="h-14 w-full rounded-lg bg-[#FF7F50] text-base font-medium text-white hover:bg-[#E6723C]"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#3498DB]" />
                    <p className="text-base text-gray-600">
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
