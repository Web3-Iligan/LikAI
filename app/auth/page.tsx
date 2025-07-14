"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fish, ArrowRight } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-orange-100">
      {/* Header */}
      <header className="px-8 py-6 border-b border-blue-200/50 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-xl flex items-center justify-center shadow-lg">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LikAI</span>
          </Link>
          <div className="text-sm text-gray-600">
            Have an account? 
            <Link href="/login" className="text-[#3498DB] hover:text-[#2980B9] ml-1 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-2xl border border-blue-200/30 p-8 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3498DB]/10 to-[#FF7F50]/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FF7F50]/10 to-[#3498DB]/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Title */}
          <div className="text-center relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create your free account
            </h1>
            <p className="text-gray-600">
              100% free. No credit card needed.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4 relative z-10">
            {/* ICP Identity Login */}
            <Button 
              className="w-full h-14 bg-gradient-to-r from-[#3498DB] to-[#2980B9] hover:from-[#2980B9] hover:to-[#1F618D] text-white font-medium text-base flex items-center justify-center space-x-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[#3498DB] font-bold text-sm">∞</span>
              </div>
              <span>Continue with ICP Identity</span>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
                />
              </div>

              <Button 
                className="w-full h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-[#3498DB] hover:to-[#2980B9] hover:text-white text-gray-700 font-medium flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 hover:shadow-lg"
                onClick={() => window.location.href = '/auth/onboarding'}
              >
                <span>Verify email</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="text-center text-sm text-gray-600 leading-relaxed mt-6">
              We're committed to your privacy. LikAI uses the information 
              you provide to us to contact you about our relevant content, 
              products, and services for sustainable aquaculture. You may unsubscribe from these 
              communications at any time. For more information, check out 
              our{" "}
              <Link href="/privacy" className="text-[#3498DB] hover:text-[#2980B9] font-medium">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
