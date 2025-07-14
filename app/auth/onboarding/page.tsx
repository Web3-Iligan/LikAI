"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    farmType: "",
    farmerType: "",
    companyName: ""
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep === totalSteps) {
      setIsLoading(true)
      // Simulate registration process
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to main dashboard
        window.location.href = '/dashboard'
      }, 3000)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
      {/* Progress Bar */}
      <div className="w-full bg-white/90 backdrop-blur-sm border-b border-blue-200/50">
        <div className="max-w-xl mx-auto px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#FF7F50] to-[#3498DB] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="px-8 py-6">
        <div className="flex items-center justify-between max-w-xl mx-auto">
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
              className="text-[#3498DB] hover:text-[#2980B9] hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-8 pb-16">
        <div className="w-full max-w-xl space-y-6 bg-white rounded-2xl shadow-2xl border border-blue-200/30 p-10 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    What is your name?
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="w-full h-14 px-4 text-lg border-b-2 border-[#3498DB] border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0 focus:border-[#3498DB] bg-transparent"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="w-full h-14 px-4 text-lg border-b-2 border-[#3498DB] border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0 focus:border-[#3498DB] bg-transparent"
                      placeholder="Last name"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName}
                    className="w-full h-14 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Farm Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Nice to meet you {formData.firstName}!
                  </h1>
                  <h2 className="text-lg font-semibold text-gray-700">
                    What is your farm type?
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { id: "small", label: "Small Scale Farm", desc: "Individual or family-owned operations" },
                    { id: "medium", label: "Medium Scale Farm", desc: "Commercial operations with moderate capacity" },
                    { id: "enterprise", label: "Enterprise Farm", desc: "Large-scale commercial aquaculture facilities" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        updateFormData("farmType", option.id)
                        setTimeout(handleNext, 300)
                      }}
                      className={`p-3 border-2 rounded-lg text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 min-h-[100px] flex flex-col justify-center ${
                        formData.farmType === option.id 
                          ? 'border-[#3498DB] bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1">{option.label}</div>
                      <div className="text-xs text-gray-600 leading-relaxed">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Farmer Type */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 mb-3">
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
                    { id: "freelancer", label: "Freelancer" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData("farmerType", option.id)}
                      className={`p-3 border-2 rounded-lg text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 min-h-[70px] flex items-center justify-center ${
                        formData.farmerType === option.id 
                          ? 'border-[#3498DB] bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>

                {formData.farmerType && (
                  <div className="text-center mt-6">
                    <button
                      onClick={handleNext}
                      className="text-[#3498DB] hover:text-[#2980B9] font-medium text-base"
                    >
                      None of these describe my role
                    </button>
                  </div>
                )}

                {formData.farmerType && (
                  <Button
                    onClick={handleNext}
                    className="w-full h-14 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium text-base rounded-lg mt-6"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 4: Company Name */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 mb-3">
                    What is your farm's name?
                  </h1>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="companyName" className="block text-base font-medium text-gray-700 mb-2">
                      Farm name
                    </label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        className="w-full h-14 px-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
                        placeholder="Enter your farm name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs">i</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.companyName && (
                    <div className="bg-gray-800 text-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">No items to show</span>
                      </div>
                      <button className="text-[#3498DB] text-sm mt-2 flex items-center">
                        <span className="mr-2">+</span> New Identity
                      </button>
                    </div>
                  )}

                  <Button
                    onClick={handleNext}
                    disabled={!formData.companyName}
                    className="w-full h-14 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Welcome/Loading */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  We're glad you're here, {formData.firstName}!
                </h1>

                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-200/50">
                    <Image 
                      src="/Likai-logo.svg" 
                      alt="LikAI Logo" 
                      width={48} 
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>
                </div>

                {!isLoading ? (
                  <>
                    <p className="text-gray-600 mb-6 text-base">
                      Next, let's tailor your aquaculture experience
                    </p>
                    <Button
                      onClick={handleNext}
                      className="w-full h-14 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium text-base rounded-lg"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#3498DB]" />
                    <p className="text-gray-600 text-base">
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
  )
}
