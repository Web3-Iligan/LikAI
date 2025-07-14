"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Fish, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Users, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Award,
  Menu,
  X,
  Plus
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlanType, setSelectedPlanType] = useState<'recommended' | 'enterprise'>('recommended')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-8 sm:px-12 md:px-16 lg:px-8 h-20 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-50">
        {/* Logo */}
        <Link href="#" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-xl flex items-center justify-center shadow-lg">
            <Fish className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">LikAI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            About
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#demo">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
              Book a Demo
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] hover:from-[#2980B9] hover:to-[#21618C] text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-8 sm:px-12 py-4 space-y-4">
            <Link 
              href="#about" 
              className="block text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#features" 
              className="block text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="block text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Link href="#demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 font-medium">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#3498DB] to-[#2980B9] hover:from-[#2980B9] hover:to-[#21618C] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="about" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <Badge className="mb-4 sm:mb-6 bg-[#3498DB]/10 text-[#3498DB] hover:bg-[#3498DB]/10">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Biosecurity
                </Badge>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
                  Prevent outbreaks.
                  <span className="text-[#3498DB]"> Protect your profits.</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Making aquaculture risk management automated, effortless, and science-based. 
                  Protect your shrimp farm with AI-driven biosecurity solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
                  <Link href="/auth" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 sm:px-8 py-4 text-base">
                      Start Saving
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 px-8 sm:px-8 py-4 text-base">
                      Get a Demo
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm text-gray-500 justify-center sm:justify-start px-2 sm:px-0">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">DA</span>
                    </div>
                    <span className="text-xs sm:text-sm">Department of Agriculture</span>
                  </div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">PH</span>
                    </div>
                    <span className="text-xs sm:text-sm">Philippines.gov</span>
                  </div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                    </div>
                    <span className="text-xs sm:text-sm">SEAFDEC</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Dashboard Preview */}
              <div className="relative mt-8 lg:mt-0 px-2 sm:px-4 md:px-6 lg:px-0">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border overflow-hidden max-w-sm mx-auto lg:max-w-none">
                  {/* Dashboard Header */}
                  <div className="bg-gray-50 px-3 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">dashboard.likai.com</div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      Live
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-2 sm:p-3 lg:p-6">
                    {/* Single Column Layout on Mobile */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2 lg:gap-6">
                      {/* AI-Generated Insights */}
                      <div className="bg-white border rounded-lg p-2 sm:p-3 lg:p-6">
                        <div className="flex items-center mb-2 sm:mb-4">
                          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-orange-600 text-xs">⚡</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">AI-Generated Insights</h3>
                            <p className="text-xs text-gray-600 hidden sm:block">Personalized recommendations based on your farm data</p>
                          </div>
                        </div>

                        {/* Insight Cards */}
                        <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                          <div className="bg-[#3498DB]/10 border border-[#3498DB]/30 rounded p-1.5 sm:p-2 lg:p-3">
                            <h4 className="font-medium text-[#3498DB] text-xs mb-1">Weather Impact Analysis</h4>
                            <p className="text-[#3498DB]/80 text-xs leading-tight">Typhoon risk: 75% pond overflow. Dyke inspection could prevent ₱200k losses.</p>
                          </div>
                          
                          <div className="bg-green-50 border border-green-200 rounded p-1.5 sm:p-2 lg:p-3">
                            <h4 className="font-medium text-green-900 text-xs mb-1">Cost Optimization</h4>
                            <p className="text-green-800 text-xs leading-tight">Solar disinfection: 40% cost reduction, 85% effectiveness.</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-2 sm:mt-3 lg:mt-4 pt-2 sm:pt-3 border-t text-center">
                          <button className="text-xs text-[#3498DB] hover:text-[#2980B9] font-medium">
                            Ask AI Coach
                          </button>
                        </div>
                      </div>

                      {/* Farm Health Sentiment */}
                      <div className="bg-white border rounded-lg p-2 sm:p-3 lg:p-6">
                        <div className="flex items-center mb-2 sm:mb-4">
                          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-100 rounded flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-blue-600 text-xs">🛡️</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Farm Health</h3>
                            <p className="text-xs text-gray-600 hidden sm:block">Overall assessment</p>
                          </div>
                        </div>

                        {/* Circular Progress */}
                        <div className="flex flex-col items-center mb-3 sm:mb-4 lg:mb-6">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3">
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#F59E0B"
                                strokeWidth="2"
                                strokeDasharray="92, 100"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">92%</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 text-center">optimal range</p>
                        </div>

                        {/* Status Items - Simplified for mobile */}
                        <div className="space-y-1 sm:space-y-2 lg:space-y-3 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Water Quality</span>
                            <span className="text-green-600 font-medium">Excellent</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Stock Health</span>
                            <span className="text-orange-600 font-medium">Good</span>
                          </div>
                          <div className="flex justify-between items-center lg:pt-2 lg:border-t">
                            <span className="text-gray-700">Current Cycle</span>
                            <span className="text-blue-600 font-medium">Day 45/70</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-2 sm:-right-2 md:-right-4 lg:-right-4 top-8 sm:top-12 md:top-16 lg:top-20 bg-white rounded-lg shadow-lg border p-2 sm:p-3 max-w-28 sm:max-w-32 md:max-w-40 lg:max-w-48">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 mb-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-900">Risk Decreased</span>
                  </div>
                  <p className="text-xs text-gray-600">Water quality improved by 23%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 text-center max-w-7xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Save up to <span className="text-blue-600">75%</span> on your operational costs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto px-4 sm:px-0">
              The precision of AI-driven biosecurity, the flexibility of real-time monitoring.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Risk Prevention</h3>
                  <p className="text-gray-600 mb-4">Prevent disease outbreaks before they happen with AI-powered early detection</p>
                  <div className="text-3xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-500">Risk Reduction</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Yield Optimization</h3>
                  <p className="text-gray-600 mb-4">Maximize harvest quality and quantity with data-driven insights</p>
                  <div className="text-3xl font-bold text-green-600">45%</div>
                  <div className="text-sm text-gray-500">Yield Increase</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Cost Control</h3>
                  <p className="text-gray-600 mb-4">Reduce feed waste and optimize resource allocation automatically</p>
                  <div className="text-3xl font-bold text-purple-600">60%</div>
                  <div className="text-sm text-gray-500">Cost Savings</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 max-w-7xl">
            {/* Feature 1 - Shared Inbox */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-24 sm:mb-32">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    A powerful monitoring system<br />
                    that feels just like email.
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  LikAI's intuitive monitoring interface makes it easy for farm members to organize, prioritize and solve 
                  aquaculture challenges - all in a familiar interface.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Risk assignment</span>
                      <span className="text-gray-600"> so it's clear who owns what.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Collision detection</span>
                      <span className="text-gray-600"> to stop embarrassing double responses.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Private internal notes</span>
                      <span className="text-gray-600"> for team members to collaborate.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">@mentions & notifications</span>
                      <span className="text-gray-600"> to keep the team in the loop.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                  {/* Main Dashboard Interface */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Farm Monitoring Dashboard</div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#3498DB]/10 rounded-lg border-l-4 border-[#3498DB]">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#3498DB] rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">🏠</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Pond 3 - Water Quality Alert</div>
                              <div className="text-sm text-gray-600">Dissolved oxygen below optimal range</div>
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">High Priority</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Feeding Schedule Optimized</div>
                              <div className="text-sm text-gray-600">AI recommendations applied successfully</div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">⚠</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Weather Alert - Heavy Rain</div>
                              <div className="text-sm text-gray-600">Prepare drainage systems in 6 hours</div>
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">Action Required</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Annotations */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-40">
                    <div className="text-xs text-gray-600 mb-1">Team collaboration</div>
                    <div className="text-sm font-medium text-gray-900">See who is working on what</div>
                  </div>
                  
                  <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg p-3 max-w-40">
                    <div className="text-xs text-gray-600 mb-1">Priority system</div>
                    <div className="text-sm font-medium text-gray-900">Auto-prioritize critical alerts</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Live Chat */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl">
                  {/* Chat Interface */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-purple-600 px-4 py-3 text-white flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div>
                          <div className="font-medium">LikAI Assistant</div>
                          <div className="text-xs text-purple-200">Online</div>
                        </div>
                      </div>
                      <div className="text-purple-200">●</div>
                    </div>
                    
                    <div className="p-4 space-y-4 h-64 overflow-y-auto">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">AI</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-gray-800">
                            I noticed your pond's pH level is trending upward. Would you like me to suggest some corrective actions?
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-purple-500 text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Yes, please provide recommendations.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">AI</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm text-gray-800">
                            Based on your current conditions, I recommend reducing feeding by 15% and adding beneficial bacteria. This should stabilize pH within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          placeholder="Ask about your farm..." 
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                          readOnly
                        />
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Live chat for personal,<br />
                    realtime support.
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Instill confidence in your aquaculture by offering instant help on any aspect of your farm management - 
                  with all the powerful features of our AI assistant.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Round Robin assignment</span>
                      <span className="text-gray-600"> to spread the workload.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Unattended message logic</span>
                      <span className="text-gray-600"> to never leave a chat hanging.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Email continuation</span>
                      <span className="text-gray-600"> for when farmers drop offline.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Alerts & notifications</span>
                      <span className="text-gray-600"> to make sure you never miss a chat.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Knowledge Base */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Deliver 24/7 support with a<br />
                    Knowledge Base.
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Watch support requests dwindle as your farmers help themselves - lowering farmer queries by up to 43%.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Full team access</span>
                      <span className="text-gray-600"> so everyone can contribute to articles.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Mobile optimized</span>
                      <span className="text-gray-600"> for easy accessibility on all devices.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Complete brand control</span>
                      <span className="text-gray-600"> ensuring your brand looks great.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Embeddable widget</span>
                      <span className="text-gray-600"> so your knowledge base is accessible on every page of your platform.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-xl">
                  {/* Knowledge Base Interface */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 px-6 py-8 text-white text-center">
                      <h3 className="text-xl font-bold mb-2">Aquaculture Help Center</h3>
                      <p className="text-blue-100 mb-4">Find answers to common farming questions</p>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search for help..." 
                          className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                          readOnly
                        />
                        <button className="absolute right-3 top-3 text-gray-400">
                          🔍
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="text-2xl mb-2">🦐</div>
                          <h4 className="font-medium text-gray-900 mb-1">Shrimp Health</h4>
                          <p className="text-sm text-gray-600">Disease prevention & treatment</p>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="text-2xl mb-2">💧</div>
                          <h4 className="font-medium text-gray-900 mb-1">Water Quality</h4>
                          <p className="text-sm text-gray-600">Monitoring & optimization</p>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="text-2xl mb-2">🌾</div>
                          <h4 className="font-medium text-gray-900 mb-1">Feeding Guide</h4>
                          <p className="text-sm text-gray-600">Best practices & schedules</p>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="text-2xl mb-2">🛡️</div>
                          <h4 className="font-medium text-gray-900 mb-1">Biosecurity</h4>
                          <p className="text-sm text-gray-600">Protocols & procedures</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Popular Articles</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-[#3498DB] hover:text-[#2980B9] cursor-pointer">
                            <span>📄</span>
                            <span>How to maintain optimal dissolved oxygen levels</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-[#3498DB] hover:text-[#2980B9] cursor-pointer">
                            <span>📄</span>
                            <span>Early signs of bacterial infections in shrimp</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-[#3498DB] hover:text-[#2980B9] cursor-pointer">
                            <span>📄</span>
                            <span>Setting up effective pond drainage systems</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pricing</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0 mb-8">
                Pay just a portion of what we help you save.
              </p>

              {/* Billing Period Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      billingPeriod === 'monthly'
                        ? 'bg-[#3498DB] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                      billingPeriod === 'yearly'
                        ? 'bg-[#3498DB] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plan Type Filter */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setSelectedPlanType('recommended')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedPlanType === 'recommended'
                        ? 'bg-[#FF7F50] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => setSelectedPlanType('enterprise')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedPlanType === 'enterprise'
                        ? 'bg-[#FF7F50] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Enterprise
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Plans (Free Tier + Business) */}
            {selectedPlanType === 'recommended' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
                {/* Free Tier */}
                <Card className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                      <div className="mb-6">
                        <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
                        <p className="text-gray-600">100% Free to Use</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">Basic Farm Profile Setup</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">Initial Static Action Plan (5-7 steps)</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">Limited "How-To" Guides</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">Limited AI Chatbot (3 queries/day)</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">Self-Service Support & FAQ</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3">
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>

                {/* Business Plan - Popular */}
                <Card className="relative bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl overflow-hidden border-2 border-[#FF7F50]">
                  <div className="absolute top-0 left-0 right-0 bg-[#FF7F50] text-white text-center py-2 text-sm font-semibold">
                    POPULAR
                  </div>
                  <CardContent className="p-8 pt-12">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Plan</h3>
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {billingPeriod === 'monthly' ? '₱2,000' : '₱4,800'}
                        </div>
                        <p className="text-gray-600">
                          {billingPeriod === 'monthly' ? 'per month' : 'per year (₱400/month)'}
                        </p>
                        {billingPeriod === 'yearly' && (
                          <p className="text-green-600 text-sm font-medium">Save ₱19,200 yearly!</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm font-medium">Everything in Free, PLUS:</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Comprehensive Farm Profile</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Dynamic, Adaptive Action Plan</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Full Access to "How-To" Guides</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Unlimited AI Chatbot Queries</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Resource-Optimized Alternatives</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Proactive Risk Alerts</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Progress Tracking & Biosecurity Score</span>
                      </div>
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
                      Start 14-Day Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Enterprise Plan */}
            {selectedPlanType === 'enterprise' && (
              <div className="max-w-lg mx-auto px-4 sm:px-0">
                <Card className="relative bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 rounded-2xl overflow-hidden border-2 border-purple-500">
                  <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 text-sm font-semibold">
                    ENTERPRISE
                  </div>
                  <CardContent className="p-8 pt-12">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Plan</h3>
                      <div className="text-gray-600 text-lg mb-2">Custom Quote</div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm font-medium">Everything in Business, PLUS:</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Multi-Farm / Multi-Pond Management</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Advanced Analytics & Benchmarking</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Enhanced Traceability & Compliance</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">On-Demand Expert Consultation</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">API Access & Integrations</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Priority Email & Phone Support</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">Dedicated Account Manager</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 text-sm">BFAR & Export Compliance Reports</span>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3">
                      Book a Call
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Additional Info */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                All plans include unlimited farm monitoring and AI-powered recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 support included</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h3>
              
              <div className="max-w-6xl mx-auto space-y-6">
                {/* General Category */}
                <div className="bg-gradient-to-r from-[#FF7F50] to-[#FF6347] rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-white mb-6">General</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'general-1' ? null : 'general-1')}>
                        <h5 className="font-semibold text-white text-sm">What makes LikAI different from other farm management tools?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'general-1' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'general-1' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          LikAI specializes in AI-driven biosecurity for shrimp aquaculture. Our system provides personalized, 
                          adaptive action plans based on Good Aquaculture Practices (GAqP) and continuously evolves with your farm's progress.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'general-2' ? null : 'general-2')}>
                        <h5 className="font-semibold text-white text-sm">How quickly can I see results with LikAI?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'general-2' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'general-2' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          Most farmers see immediate improvements in their biosecurity practices within the first week. 
                          The AI provides instant recommendations, and our dynamic action plans help optimize your operations from day one.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'general-3' ? null : 'general-3')}>
                        <h5 className="font-semibold text-white text-sm">Is my farm data secure and private?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'general-3' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'general-3' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          Absolutely. We use enterprise-grade security to protect your farm data. Your information is never shared 
                          with competitors, and you maintain full ownership of your data at all times.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'general-4' ? null : 'general-4')}>
                        <h5 className="font-semibold text-white text-sm">What if I'm not tech-savvy?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'general-4' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'general-4' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          LikAI is designed for farmers, not technicians. Our interface is intuitive, and our AI chatbot 
                          speaks in plain language. We also provide step-by-step "How-To" guides for every recommendation.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account & Pricing Category */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-white mb-6">Account & Pricing</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'pricing-1' ? null : 'pricing-1')}>
                        <h5 className="font-semibold text-white text-sm">Can I upgrade or downgrade my plan anytime?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'pricing-1' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'pricing-1' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          Yes! You can switch between Free Tier, Business Plan, or Enterprise at any time. 
                          Changes take effect immediately, and billing is prorated for seamless transitions.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'pricing-2' ? null : 'pricing-2')}>
                        <h5 className="font-semibold text-white text-sm">Do you support multiple farm locations?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'pricing-2' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'pricing-2' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          The Business Plan supports single farm operations. For multiple farms or ponds, 
                          our Enterprise Plan provides centralized management with advanced analytics across all locations.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'pricing-3' ? null : 'pricing-3')}>
                        <h5 className="font-semibold text-white text-sm">What kind of support do you provide?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'pricing-3' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'pricing-3' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          Free Tier includes comprehensive FAQ and self-service resources. Business Plan adds email support. 
                          Enterprise Plan includes priority phone support and a dedicated account manager.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === 'pricing-4' ? null : 'pricing-4')}>
                        <h5 className="font-semibold text-white text-sm">How does LikAI help with compliance and certification?</h5>
                        <Plus className={`h-4 w-4 text-white transition-transform ${expandedFaq === 'pricing-4' ? 'rotate-45' : ''}`} />
                      </div>
                      {expandedFaq === 'pricing-4' && (
                        <p className="text-white/90 text-sm mt-3 pt-3 border-t border-white/20">
                          Our Enterprise Plan generates detailed compliance reports formatted for BFAR accreditation 
                          and international export standards (HACCP, EU requirements), helping you meet regulatory requirements.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
     
        {/* CTA Section - Analyze Your Farm */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Analyze your farm
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>in two minutes
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 px-4 sm:px-0">Start your savings analysis</p>
              <p className="text-sm text-gray-500">100% free, no credit card required</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Left side - Demo Preview */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-xl">
                    {/* Analysis Dashboard Preview */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="text-sm text-gray-600">Farm Analysis Dashboard</div>
                        </div>
                      </div>
                      
                      <div className="p-8 text-center">
                        {/* Analysis Result */}
                        <div className="mb-6">
                          <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">⚡</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Potential Farm Cost Savings Analysis
                          </h3>
                        </div>

                        {/* Savings Amount */}
                        <div className="mb-8">
                          <div className="text-5xl font-bold text-gray-900 mb-2">₱205,000</div>
                          <div className="text-sm text-gray-600">Annual Savings Potential</div>
                          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <span>Risk Reduction</span>
                            <span>•</span>
                            <span>Cost Optimization</span>
                            <span>•</span>
                            <span>Yield Improvement</span>
                          </div>
                        </div>

                        {/* Recommendations Count */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                          <div className="text-2xl font-bold text-blue-600 mb-1">23 recommendations</div>
                          <div className="text-sm text-blue-800">Ready to implement</div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-medium text-green-800 mb-1">Water Quality</div>
                            <div className="text-green-600">Optimized</div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <div className="font-medium text-orange-800 mb-1">Feed Efficiency</div>
                            <div className="text-orange-600">Needs Attention</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating annotations */}
                  <div className="absolute -left-2 sm:-left-4 top-12 sm:top-16 bg-white rounded-lg shadow-lg border p-2 sm:p-3 max-w-40 sm:max-w-48">
                    <div className="text-xs text-gray-600 mb-1">See how much money</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">we can find in your farm operations</div>
                  </div>
                  
                  <div className="absolute -right-2 sm:-right-4 bottom-12 sm:bottom-16 bg-white rounded-lg shadow-lg border p-2 sm:p-3 max-w-40 sm:max-w-48">
                    <div className="text-xs text-gray-600 mb-1">See your savings</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">potential instantly</div>
                  </div>
                </div>

                {/* Right side - Action Steps */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Get your personalized farm analysis
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      Our AI analyzes your farm operations and identifies specific opportunities 
                      to reduce costs and increase yields in just 2 minutes.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Connect your farm data</h4>
                        <p className="text-gray-600 text-sm">
                          Share basic information about your farm size, species, and current operations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">AI analyzes opportunities</h4>
                        <p className="text-gray-600 text-sm">
                          Our system identifies cost savings and optimization opportunities specific to your farm
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Get your custom report</h4>
                        <p className="text-gray-600 text-sm">
                          Receive a detailed analysis with actionable recommendations and projected savings
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-6 px-4 sm:px-0">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
                      <Link href="/auth" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-base sm:text-lg">
                          Start Free Analysis
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </Link>
                      <Link href="#demo" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 px-8 py-4 text-base sm:text-lg">
                          Watch Demo
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>100% Free</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>2-minute setup</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>No commitment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-lg mr-2">
                  <Fish className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LikAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered biosecurity solutions for sustainable aquaculture.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">FB</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">TW</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">LI</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Community</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 LikAI. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Made with ❤️ for Philippine aquaculture</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
