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
          </div>
        </div>
      </div>
    </div>
  )
}
