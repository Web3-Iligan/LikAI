"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fish, ArrowLeft, ArrowRight, Eye, EyeOff, Check, Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    farmType: "",
    farmerType: "",
    companyName: ""
  })

  const totalSteps = 6

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

  const getPasswordRequirements = () => {
    const requirements = [
      { text: "At least 12 characters", met: formData.password.length >= 12 },
      { text: "One lowercase character", met: /[a-z]/.test(formData.password) },
      { text: "One uppercase character", met: /[A-Z]/.test(formData.password) },
      { text: "One number, symbol or whitespace character", met: /[\d\W]/.test(formData.password) }
    ]
    return requirements
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
      {/* Progress Bar */}
      <div className="w-full bg-white/90 backdrop-blur-sm border-b border-blue-200/50">
        <div className="max-w-md mx-auto px-8 py-4">
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
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-xl flex items-center justify-center shadow-lg">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LikAI</span>
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
        <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-200/30 p-8 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            {/* Step 1: Create Password */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Create your password
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        className="w-full h-12 px-4 pr-12 border-2 border-[#3498DB] rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    {getPasswordRequirements().map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {req.met && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-600'}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!getPasswordRequirements().every(req => req.met)}
                    className="w-full h-12 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Name */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    What is your name?
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="w-full h-12 px-4 border-b-2 border-[#3498DB] border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0 focus:border-[#3498DB] bg-transparent"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="w-full h-12 px-4 border-b-2 border-[#3498DB] border-t-0 border-l-0 border-r-0 rounded-none focus:ring-0 focus:border-[#3498DB] bg-transparent"
                      placeholder="Last name"
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName}
                    className="w-full h-12 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Farm Type */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Nice to meet you {formData.firstName}!
                  </h1>
                  <h2 className="text-2xl font-semibold text-gray-700">
                    What is your farm type?
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
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
                      className={`p-4 border-2 rounded-lg text-left transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmType === option.id 
                          ? 'border-[#3498DB] bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{option.label}</div>
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
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
                    { id: "other", label: "Other" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateFormData("farmerType", option.id)}
                      className={`p-4 border-2 rounded-lg text-center transition-all hover:border-[#3498DB] hover:bg-blue-50 ${
                        formData.farmerType === option.id 
                          ? 'border-[#3498DB] bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{option.label}</div>
                    </button>
                  ))}
                </div>

                {formData.farmerType && (
                  <div className="text-center">
                    <button
                      onClick={handleNext}
                      className="text-[#3498DB] hover:text-[#2980B9] font-medium"
                    >
                      None of these describe my role
                    </button>
                  </div>
                )}

                {formData.farmerType && (
                  <Button
                    onClick={handleNext}
                    className="w-full h-12 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium rounded-lg"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 5: Company Name */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    What is your farm's name?
                  </h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Farm name
                    </label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
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
                    className="w-full h-12 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Welcome/Loading */}
            {currentStep === 6 && (
              <div className="space-y-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  We're glad you're here, {formData.firstName}!
                </h1>

                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-2xl flex items-center justify-center shadow-lg">
                    <Fish className="h-16 w-16 text-white" />
                  </div>
                </div>

                {!isLoading ? (
                  <>
                    <p className="text-gray-600 mb-6">
                      Next, let's tailor your aquaculture experience
                    </p>
                    <Button
                      onClick={handleNext}
                      className="w-full h-12 bg-[#FF7F50] hover:bg-[#E6723C] text-white font-medium rounded-lg"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#3498DB]" />
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
  )
}
