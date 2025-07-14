"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AuthPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10">
      {/* Background Effects - Similar to Hero Section */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50]/3 to-transparent opacity-50"></div>
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#FF7F50]/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#3498DB]/10 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#FF7F50]/5 rounded-full blur-md"></div>
      <div className="absolute top-20 left-1/4 w-20 h-20 bg-[#3498DB]/8 rounded-full blur-lg"></div>
      {/* Header */}
      <header className="px-8 py-6 border-b border-blue-200/50 bg-white/90 backdrop-blur-sm relative z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-8 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Auth Form */}
          <div className="w-full max-w-lg mx-auto space-y-8 relative">
            {/* Backdrop blur effect similar to hero */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl -m-8 -z-10"></div>
            
            {/* Title */}
            <div className="text-left relative z-10">
              <h1 className="text-5xl font-bold text-[#FF7F50] mb-6 leading-tight">
                Create your free account
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                100% free. No credit card needed.
              </p>
            </div>

            {/* Auth Button */}
            <div className="space-y-6 relative z-10">
              <Link href="/dashboard">
                <Button 
                  className="w-full h-16 bg-gradient-to-r from-[#3498DB] to-[#2980B9] hover:from-[#2980B9] hover:to-[#1F618D] text-white font-medium text-lg flex items-center justify-center space-x-4 rounded-xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image 
                      src="/internet-computer-icp-logo.svg" 
                      alt="Internet Computer" 
                      width={32} 
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <span>Continue with Internet Identity</span>
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500 text-center">
                By signing up, you agree to our{' '}
                <Link href="/privacy" className="text-[#3498DB] hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-[#3498DB] hover:underline">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Mock Dashboard Content */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Farm Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-100/80 to-green-50/60 p-4 rounded-lg border border-green-200/50">
                    <div className="text-sm text-gray-600 mb-2">Cost Savings</div>
                    <div className="text-2xl font-bold text-green-600">₱45,000</div>
                    <div className="text-xs text-gray-500 mt-1">This cycle</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#FF7F50]/10 to-[#FF7F50]/5 p-4 rounded-lg border border-[#FF7F50]/20">
                    <div className="text-sm text-gray-600 mb-2">Farm Health</div>
                    <div className="text-2xl font-bold text-[#FF7F50]">94%</div>
                    <div className="text-xs text-gray-500 mt-1">Optimal</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100/80 to-orange-50/60 p-4 rounded-lg border border-orange-200/50">
                    <div className="text-sm text-gray-600 mb-2">Overall Risk Score</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-600">68/100</div>
                      <div className="w-6 h-6 text-orange-500">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V14.5C14.8,16.9 13.4,18.5 12,18.5C10.6,18.5 9.2,16.9 9.2,14.5V10C9.2,8.6 10.6,7 12,7Z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">+5 from yesterday</div>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="bg-gray-50 rounded-lg p-6 h-40 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-[#3498DB]/20 via-[#FF7F50]/20 to-[#3498DB]/20 rounded-lg flex items-end justify-center space-x-2">
                    {[40, 65, 30, 80, 45, 90, 55, 75].map((height, i) => (
                      <div 
                        key={i}
                        className="bg-gradient-to-t from-[#3498DB] to-[#FF7F50] rounded-t"
                        style={{ height: `${height}%`, width: '12px' }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Activity List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#3498DB] rounded-full flex items-center justify-center">
                      <Image 
                        src="/Likai-logo.svg" 
                        alt="LikAI" 
                        width={16} 
                        height={16}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Water quality check completed</div>
                      <div className="text-xs text-gray-500">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#FF7F50] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Alert: Temperature variance detected</div>
                      <div className="text-xs text-gray-500">15 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-lg shadow-lg flex items-center justify-center transform -rotate-12">
              <span className="text-white font-bold">AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
