"use client";

import {
  ArrowRight,
  CheckCircle,
  Menu,
  Plus,
  Shield,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlanType, setSelectedPlanType] = useState<
    "recommended" | "enterprise"
  >("recommended");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-20 items-center border-b border-gray-100 bg-white px-8 sm:px-12 md:px-16 lg:px-8">
        {/* Logo */}
        <div className="flex-1">
          <Link href="#" className="flex w-fit items-center space-x-3">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
        </div>

        {/* Navigation - Centered */}
        <nav className="hidden flex-1 items-center justify-center space-x-8 md:flex">
          <Link
            href="#about"
            className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="#features"
            className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
          >
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <Link href="#demo">
            <Button
              variant="ghost"
              className="font-medium text-gray-600 hover:text-gray-900"
            >
              Book a Demo
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="rounded-lg bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-6 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:from-[#2980B9] hover:to-[#21618C] hover:shadow-xl">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-gray-100 bg-white shadow-lg md:hidden">
          <div className="space-y-4 px-8 py-4 sm:px-12">
            <Link
              href="#about"
              className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#features"
              className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 border-t border-gray-100 pt-4">
              <Link href="#demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium text-gray-600 hover:text-gray-900"
                >
                  Book a Demo
                </Button>
              </Link>
              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#3498DB] to-[#2980B9] font-medium text-white shadow-lg transition-all duration-200 hover:from-[#2980B9] hover:to-[#21618C] hover:shadow-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="about"
          className="relative overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10"
        >
          <div className="from-[#FF7F50]/3 absolute inset-0 bg-gradient-to-r to-transparent opacity-50"></div>
          {/* Decorative circles */}
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-[#FF7F50]/10 blur-xl"></div>
          <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-[#3498DB]/10 blur-lg"></div>
          <div className="absolute right-1/4 top-1/2 h-16 w-16 rounded-full bg-[#FF7F50]/5 blur-md"></div>
          <div className="container relative z-10 mx-auto max-w-7xl px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 lg:px-8 lg:py-32">
            <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
              {/* Left Column - Content */}
              <div className="relative mx-auto max-w-2xl lg:mx-0">
                <div className="absolute inset-0 -z-10 -m-8 rounded-3xl bg-white/40 backdrop-blur-sm"></div>
                <Badge className="mb-4 bg-[#3498DB]/10 text-[#3498DB] hover:bg-[#3498DB]/10 sm:mb-6">
                  <Zap className="mr-1 h-3 w-3" />
                  AI-Powered Biosecurity
                </Badge>
                <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Prevent outbreaks.
                  <span className="text-[#3498DB]"> Protect your profits.</span>
                </h1>
                <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:mb-8 sm:text-base lg:text-lg">
                  Safeguard your shrimp farm with AI-driven biosecurity, aligned
                  with BFAR GAqP standards, to eliminate outbreaks and boost
                  yields.
                </p>
                <div className="mb-6 flex flex-col gap-4 px-2 sm:mb-8 sm:flex-row sm:gap-4 sm:px-0">
                  <Link href="/auth" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 sm:w-auto sm:px-8"
                    >
                      Start Saving
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-gray-300 px-8 py-4 text-base hover:bg-gray-50 sm:w-auto sm:px-8"
                    >
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Dashboard Preview */}
              <div className="relative mt-8 px-2 sm:px-4 md:px-6 lg:mt-0 lg:px-0">
                <div className="mx-auto max-w-sm overflow-hidden rounded-xl border bg-white shadow-2xl sm:rounded-2xl lg:max-w-none">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="h-2 w-2 rounded-full bg-red-500 sm:h-3 sm:w-3"></div>
                      <div className="h-2 w-2 rounded-full bg-orange-500 sm:h-3 sm:w-3"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
                    </div>
                    <div className="text-xs text-gray-600 sm:text-sm">
                      Dashboard
                    </div>
                    <div className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Live
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-2 sm:p-3 lg:p-6">
                    {/* Single Column Layout on Mobile */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2 lg:gap-6">
                      {/* AI-Generated Insights */}
                      <div className="rounded-lg border bg-white p-2 sm:p-3 lg:p-6">
                        <div className="mb-2 flex items-center sm:mb-4">
                          <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-orange-100 sm:mr-3 sm:h-6 sm:w-6">
                            <span className="text-xs text-orange-600">⚡</span>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 sm:text-sm">
                              AI-Generated Insights
                            </h3>
                            <p className="hidden text-xs text-gray-600 sm:block">
                              Personalized recommendations
                            </p>
                          </div>
                        </div>

                        {/* Insight Cards */}
                        <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                          <div className="rounded border border-red-300 bg-red-50 p-1.5 sm:p-2 lg:p-3">
                            <h4 className="mb-1 text-xs font-medium text-red-900">
                              Weather Impact Analysis
                            </h4>
                            <p className="text-xs leading-tight text-red-800">
                              Typhoon risk: 75% pond overflow. Dyke inspection
                              could prevent ₱200k losses.
                            </p>
                          </div>

                          <div className="rounded border border-green-200 bg-green-50 p-1.5 sm:p-2 lg:p-3">
                            <h4 className="mb-1 text-xs font-medium text-green-900">
                              Cost Optimization
                            </h4>
                            <p className="text-xs leading-tight text-green-800">
                              Solar disinfection: 40% cost reduction, 85%
                              effectiveness.
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-2 border-t pt-2 text-center sm:mt-3 sm:pt-3 lg:mt-4">
                          <button className="text-xs font-medium text-[#3498DB] hover:text-[#2980B9]">
                            Ask AI Coach
                          </button>
                        </div>
                      </div>

                      {/* Farm Health Sentiment */}
                      <div className="rounded-lg border bg-white p-2 sm:p-3 lg:p-6">
                        <div className="mb-2 flex items-center sm:mb-4">
                          <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-blue-100 sm:mr-3 sm:h-6 sm:w-6">
                            <span className="text-xs text-blue-600">🛡️</span>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-900 sm:text-sm">
                              Farm Health
                            </h3>
                            <p className="hidden text-xs text-gray-600 sm:block">
                              Overall assessment
                            </p>
                          </div>
                        </div>

                        {/* Circular Progress */}
                        <div className="mb-3 flex flex-col items-center sm:mb-4 lg:mb-6">
                          <div className="relative mb-2 h-16 w-16 sm:mb-3 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                            <svg
                              className="h-16 w-16 -rotate-90 transform sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                              viewBox="0 0 36 36"
                            >
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
                              <span className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                                92%
                              </span>
                            </div>
                          </div>
                          <p className="text-center text-xs text-gray-600">
                            optimal range
                          </p>
                        </div>

                        {/* Status Items - Simplified for mobile */}
                        <div className="space-y-1 text-xs sm:space-y-2 lg:space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Water Quality</span>
                            <span className="font-medium text-green-600">
                              Excellent
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Stock Health</span>
                            <span className="font-medium text-orange-600">
                              Good
                            </span>
                          </div>
                          <div className="flex items-center justify-between lg:border-t lg:pt-2">
                            <span className="text-gray-700">Current Cycle</span>
                            <span className="font-medium text-blue-600">
                              Day 45/70
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-2 top-8 max-w-28 rounded-lg border bg-white p-2 shadow-lg sm:-right-2 sm:top-12 sm:max-w-32 sm:p-3 md:-right-4 md:top-16 md:max-w-40 lg:-right-4 lg:top-20 lg:max-w-48">
                  <div className="mb-1 flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></div>
                    <span className="text-xs font-medium text-gray-900">
                      Risk Decreased
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Water quality improved by 23%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-8 text-center sm:px-12 md:px-16 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Save up to <span className="font-bold text-[#FF7F50]">75%</span>{" "}
              on your operational costs
            </h2>
            <p className="mx-auto mb-12 max-w-2xl px-4 text-base text-gray-600 sm:px-0 sm:text-lg">
              Leverage AI precision to prevent costly losses. Gain real-time
              control to maximize your yields and profits.
            </p>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8 sm:px-0 md:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Risk Mitigation
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Proactively eliminate costly disease outbreaks before they
                    impact your profitability with AI-powered, predictive
                    insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Profit Maximization
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Optimize every cycle to achieve superior harvest quality and
                    quantity, driven by AI insights for increased market value
                    and profitability.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3498DB]/10">
                    <Target className="h-8 w-8 text-[#3498DB]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Resource Optimization
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Minimize costly resource waste and optimize allocation
                    automatically with AI-driven insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-gradient-to-br from-white to-gray-50/50 py-16 sm:py-20"
        >
          <div className="container mx-auto max-w-7xl px-8 sm:px-12 md:px-16 lg:px-8">
            {/* Feature 1 - Shared Inbox */}
            <div className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Visual Step-by-Step Guides
                  </h2>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Transform complex biosecurity into clear, actionable steps
                  with intuitive visual guides that feel like an expert by your
                  side
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Actionable Guidance for Every Task
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Visual Reinforcement for Critical Alerts
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Simplified Priority Task Execution
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-[#3498DB]/10 p-6 shadow-lg">
                  {/* Main Dashboard Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2">
                      <div className="text-xs font-medium text-gray-700">
                        Step-by-Step Action Plan
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <h4 className="mb-2 text-xs font-semibold text-gray-900">
                          Water Quality Recovery Plan
                        </h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3498DB] text-xs font-bold text-white">
                            1
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-900">
                              Test dissolved oxygen levels
                            </div>
                            <div className="text-xs text-gray-600">
                              Use DO meter in Pond 3 immediately
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-xs text-orange-800">
                            Now
                          </Badge>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                            ✓
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-900">
                              Increase aeration
                            </div>
                            <div className="text-xs text-gray-600">
                              Turn on backup aerators - completed
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-xs text-green-800">
                            Done
                          </Badge>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-600">
                            3
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-gray-700">
                              Monitor for 2 hours
                            </div>
                            <div className="text-xs text-gray-500">
                              Recheck DO levels every 30 minutes
                            </div>
                          </div>
                          <Badge className="bg-gray-100 text-xs text-gray-600">
                            Next
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Live Chat */}
            <div className="mb-16 grid items-center gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="rounded-xl bg-gradient-to-br from-[#3498DB]/10 to-blue-50 p-6 shadow-lg">
                  {/* Chat Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="flex items-center justify-between bg-[#3498DB] px-3 py-2 text-white">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2980B9]">
                          <span className="text-xs font-bold text-white">
                            AI
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            LikAI Assistant
                          </div>
                          <div className="text-xs text-blue-200">Online</div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-200">●</div>
                    </div>

                    <div className="h-48 space-y-3 overflow-y-auto p-3">
                      <div className="flex items-start space-x-2">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#3498DB]">
                          <span className="text-xs text-white">AI</span>
                        </div>
                        <div className="max-w-xs rounded-lg bg-gray-100 p-2">
                          <p className="text-xs text-gray-800">
                            Your pond's pH is trending up. Need recommendations?
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="max-w-xs rounded-lg bg-[#3498DB] p-2 text-white">
                          <p className="text-xs">Yes, please help.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#3498DB]">
                          <span className="text-xs text-white">AI</span>
                        </div>
                        <div className="max-w-xs rounded-lg bg-gray-100 p-2">
                          <p className="text-xs text-gray-800">
                            Reduce feeding by 15% and add beneficial bacteria.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t bg-gray-50 p-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Ask about your farm..."
                          className="flex-1 rounded border px-2 py-1 text-xs"
                          readOnly
                        />
                        <Button
                          size="sm"
                          className="bg-[#3498DB] px-2 py-1 text-xs hover:bg-[#2980B9]"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    AI-Powered Live Support
                  </h2>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Get instant help on any aspect of your farm management with
                  our intelligent AI assistant.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      24/7 instant responses
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Context-aware recommendations
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Seamless email continuation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Knowledge Base */}
            <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                    3
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    24/7 Knowledge Base
                  </h2>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Comprehensive aquaculture resources that help farmers solve
                  problems independently.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Searchable expert guides & tutorials
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Mobile-optimized for field access
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base text-gray-700">
                      Reduces support queries by 43%
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg">
                  {/* Knowledge Base Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="bg-blue-600 px-4 py-4 text-center text-white">
                      <h3 className="mb-2 text-base font-bold">
                        Aquaculture Help Center
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search for help..."
                          className="w-full rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500"
                          readOnly
                        />
                        <button className="absolute right-2 top-2 text-sm text-gray-400">
                          🔍
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4 grid grid-cols-2 gap-3">
                        <div className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50">
                          <div className="mb-1 text-lg">🦐</div>
                          <h4 className="mb-1 text-xs font-medium text-gray-900">
                            Shrimp Health
                          </h4>
                          <p className="text-xs text-gray-600">
                            Disease prevention
                          </p>
                        </div>
                        <div className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50">
                          <div className="mb-1 text-lg">💧</div>
                          <h4 className="mb-1 text-xs font-medium text-gray-900">
                            Water Quality
                          </h4>
                          <p className="text-xs text-gray-600">
                            Monitoring & optimization
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="mb-2 text-xs font-medium text-gray-900">
                          Popular Articles
                        </h4>
                        <div className="space-y-1">
                          <div className="flex cursor-pointer items-center space-x-2 text-xs text-[#3498DB] hover:text-[#2980B9]">
                            <span>📄</span>
                            <span>Optimal dissolved oxygen levels</span>
                          </div>
                          <div className="flex cursor-pointer items-center space-x-2 text-xs text-[#3498DB] hover:text-[#2980B9]">
                            <span>📄</span>
                            <span>Early infection detection</span>
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
        <section
          id="pricing"
          className="bg-gradient-to-br from-orange-50/30 to-blue-50/20 py-16 sm:py-20"
        >
          <div className="container mx-auto max-w-7xl px-8 sm:px-12 md:px-16 lg:px-8">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Pricing
              </h2>
              <p className="mx-auto mb-8 max-w-2xl px-4 text-base text-gray-600 sm:px-0 sm:text-lg">
                Pay just a portion of what we help you save.
              </p>

              {/* Billing Period Toggle */}
              <div className="mb-8 flex justify-center">
                <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                      billingPeriod === "monthly"
                        ? "bg-[#3498DB] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`relative rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                      billingPeriod === "yearly"
                        ? "bg-[#3498DB] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Yearly
                    <span className="absolute -right-1 -top-1 rounded-full bg-green-500 px-1 py-0.5 text-xs text-white">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plan Type Filter */}
              <div className="mb-8 flex justify-center">
                <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setSelectedPlanType("recommended")}
                    className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedPlanType === "recommended"
                        ? "bg-[#FF7F50] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => setSelectedPlanType("enterprise")}
                    className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedPlanType === "enterprise"
                        ? "bg-[#FF7F50] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Enterprise
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Plans (Free Tier + Business) */}
            {selectedPlanType === "recommended" && (
              <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8 sm:px-0">
                {/* Free Tier */}
                <Card className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        Starter
                      </h3>
                      <div className="mb-6">
                        <div className="mb-2 text-5xl font-bold text-gray-900">
                          Free
                        </div>
                        <p className="text-gray-600">100% Free to Use</p>
                      </div>
                    </div>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Basic Farm Profile Setup
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Initial Static Action Plan (5-7 steps)
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Limited "How-To" Guides
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Limited AI Chatbot (3 queries/day)
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          Self-Service Support & FAQ
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gray-100 py-3 font-semibold text-gray-700 hover:bg-gray-200">
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>

                {/* Business Plan - Popular */}
                <Card className="hover:shadow-3xl relative overflow-hidden rounded-2xl border-2 border-[#FF7F50] bg-white shadow-2xl transition-shadow duration-300">
                  <div className="absolute left-0 right-0 top-0 bg-[#FF7F50] py-2 text-center text-sm font-semibold text-white">
                    POPULAR
                  </div>
                  <CardContent className="p-8 pt-12">
                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        Business Plan
                      </h3>
                      <div className="mb-6">
                        <div className="mb-2 text-4xl font-bold text-gray-900">
                          {billingPeriod === "monthly" ? "₱2,000" : "₱4,800"}
                        </div>
                        <p className="text-gray-600">
                          {billingPeriod === "monthly"
                            ? "per month"
                            : "per year (₱400/month)"}
                        </p>
                        {billingPeriod === "yearly" && (
                          <p className="text-sm font-medium text-green-600">
                            Save ₱19,200 yearly!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Everything in Free, PLUS:
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Comprehensive Farm Profile
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Dynamic, Adaptive Action Plan
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Full Access to "How-To" Guides
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Unlimited AI Chatbot Queries
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Resource-Optimized Alternatives
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Proactive Risk Alerts
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Progress Tracking & Biosecurity Score
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
                      Start 14-Day Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Enterprise Plan */}
            {selectedPlanType === "enterprise" && (
              <div className="mx-auto max-w-lg px-4 sm:px-0">
                <Card className="hover:shadow-3xl relative overflow-hidden rounded-2xl border-2 border-[#3498DB] bg-white shadow-2xl transition-shadow duration-300">
                  <div className="absolute left-0 right-0 top-0 bg-[#3498DB] py-2 text-center text-sm font-semibold text-white">
                    ENTERPRISE
                  </div>
                  <CardContent className="p-8 pt-12">
                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        Enterprise Plan
                      </h3>
                      <div className="mb-2 text-lg text-gray-600">
                        Custom Quote
                      </div>
                    </div>

                    <div className="mb-8 space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Everything in Business, PLUS:
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Multi-Farm / Multi-Pond Management
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Advanced Analytics & Benchmarking
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Enhanced Traceability & Compliance
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          On-Demand Expert Consultation
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          API Access & Integrations
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Priority Email & Phone Support
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          Dedicated Account Manager
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#3498DB]">
                          <div className="h-2 w-2 rounded-full bg-[#3498DB]"></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          BFAR & Export Compliance Reports
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-[#3498DB] py-3 font-semibold text-white hover:bg-[#2980B9]">
                      Book a Call
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="mb-4 text-gray-600">
                All plans include unlimited AI Coach Queries and AI-powered
                recommendations
              </p>
              <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-500 sm:flex-row">
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
            <div className="relative mt-20">
              {/* Background decoration */}
              <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-gray-50/50 to-orange-50/30"></div>
              <div className="relative z-10">
                <div className="mb-16 text-center">
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Frequently Asked Questions
                  </h3>
                  <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Everything you need to know about LikAI's aquaculture
                    management platform
                  </p>
                </div>

                <div className="mx-auto max-w-4xl">
                  {/* FAQ Grid Layout */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* General Questions Column */}
                    <div className="space-y-4">
                      <div className="mb-6 flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF7F50]">
                          <span className="text-sm font-bold text-white">
                            ?
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          General
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F50]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "general-1" ? null : "general-1"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                What makes LikAI different from other farm
                                management tools?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#FF7F50] transition-transform ${expandedFaq === "general-1" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "general-1" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                LikAI specializes in AI-driven biosecurity for
                                shrimp aquaculture. Our system provides
                                personalized, adaptive action plans based on
                                Good Aquaculture Practices (GAqP) and
                                continuously evolves with your farm's progress.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F50]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "general-2" ? null : "general-2"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                How quickly can I see results with LikAI?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#FF7F50] transition-transform ${expandedFaq === "general-2" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "general-2" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                Most farmers see immediate improvements in their
                                biosecurity practices within the first week. The
                                AI provides instant recommendations, and our
                                dynamic action plans help optimize your
                                operations from day one.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F50]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "general-3" ? null : "general-3"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                Is my farm data secure and private?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#FF7F50] transition-transform ${expandedFaq === "general-3" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "general-3" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                Absolutely. We use enterprise-grade security to
                                protect your farm data. Your information is
                                never shared with competitors, and you maintain
                                full ownership of your data at all times.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F50]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "general-4" ? null : "general-4"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                What if I'm not tech-savvy?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#FF7F50] transition-transform ${expandedFaq === "general-4" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "general-4" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                LikAI is designed for farmers, not technicians.
                                Our interface is intuitive, and our AI chatbot
                                speaks in plain language. We also provide
                                step-by-step "How-To" guides for every
                                recommendation.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Account & Pricing Questions Column */}
                    <div className="space-y-4">
                      <div className="mb-6 flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#3498DB]">
                          <span className="text-sm font-bold text-white">
                            ₱
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          Account & Pricing
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498DB]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "pricing-1" ? null : "pricing-1"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                Can I upgrade or downgrade my plan anytime?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#3498DB] transition-transform ${expandedFaq === "pricing-1" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "pricing-1" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                Yes! You can switch between Free Tier, Business
                                Plan, or Enterprise at any time. Changes take
                                effect immediately, and billing is prorated for
                                seamless transitions.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498DB]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "pricing-2" ? null : "pricing-2"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                Do you support multiple farm locations?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#3498DB] transition-transform ${expandedFaq === "pricing-2" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "pricing-2" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                The Business Plan supports single farm
                                operations. For multiple farms or ponds, our
                                Enterprise Plan provides centralized management
                                with advanced analytics across all locations.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498DB]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "pricing-3" ? null : "pricing-3"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                What kind of support do you provide?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#3498DB] transition-transform ${expandedFaq === "pricing-3" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "pricing-3" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                Free Tier includes comprehensive FAQ and
                                self-service resources. Business Plan adds email
                                support. Enterprise Plan includes priority phone
                                support and a dedicated account manager.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                          <button
                            className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498DB]"
                            onClick={() =>
                              setExpandedFaq(
                                expandedFaq === "pricing-4" ? null : "pricing-4"
                              )
                            }
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="pr-4 text-sm font-semibold text-gray-900">
                                How does LikAI help with compliance and
                                certification?
                              </h5>
                              <Plus
                                className={`h-4 w-4 flex-shrink-0 text-[#3498DB] transition-transform ${expandedFaq === "pricing-4" ? "rotate-45" : ""}`}
                              />
                            </div>
                          </button>
                          {expandedFaq === "pricing-4" && (
                            <div className="border-t border-gray-100 px-4 pb-4">
                              <p className="pt-3 text-sm leading-relaxed text-gray-600">
                                Our Enterprise Plan generates detailed
                                compliance reports formatted for BFAR
                                accreditation and international export standards
                                (HACCP, EU requirements), helping you meet
                                regulatory requirements.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                    <p className="mb-4 text-gray-600">Still have questions?</p>
                    <Button className="bg-[#FF7F50] px-6 py-2 text-white hover:bg-[#E6644A]">
                      Contact Our Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Analyze Your Farm */}
        <section className="bg-gradient-to-br from-blue-50/40 to-orange-50/20 py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-8 sm:px-12 md:px-16 lg:px-8">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Analyze your farm
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>in{" "}
                <span className="text-[#FF7F50]">15 minutes</span>
              </h2>
              <p className="mb-4 px-4 text-base text-gray-600 sm:px-0 sm:text-lg">
                Start your savings analysis
              </p>
              <p className="text-sm text-gray-500">
                100% free, no credit card required
              </p>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-0">
              <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
                {/* Left side - Demo Preview */}
                <div className="relative">
                  <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 p-8 shadow-xl">
                    {/* Analysis Dashboard Preview */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                      <div className="border-b bg-gray-50 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Farm Analysis Dashboard
                          </div>
                        </div>
                      </div>

                      <div className="p-8 text-center">
                        {/* Analysis Result */}
                        <div className="mb-6">
                          <div className="mb-4 flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                              <span className="font-bold text-white">⚡</span>
                            </div>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Potential Farm Cost Savings Analysis
                          </h3>
                        </div>

                        {/* Savings Amount */}
                        <div className="mb-8">
                          <div className="mb-2 text-5xl font-bold text-gray-900">
                            ₱205,000
                          </div>
                          <div className="text-sm text-gray-600">
                            Annual Savings Potential
                          </div>
                          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <span>Risk Reduction</span>
                            <span>•</span>
                            <span>Cost Optimization</span>
                            <span>•</span>
                            <span>Yield Improvement</span>
                          </div>
                        </div>

                        {/* Recommendations Count */}
                        <div className="mb-6 rounded-lg bg-blue-50 p-4">
                          <div className="mb-1 text-2xl font-bold text-blue-600">
                            23 recommendations
                          </div>
                          <div className="text-sm text-blue-800">
                            Ready to implement
                          </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="rounded-lg bg-green-50 p-3">
                            <div className="mb-1 font-medium text-green-800">
                              Water Quality
                            </div>
                            <div className="text-green-600">Optimized</div>
                          </div>
                          <div className="rounded-lg bg-orange-50 p-3">
                            <div className="mb-1 font-medium text-orange-800">
                              Feed Efficiency
                            </div>
                            <div className="text-orange-600">
                              Needs Attention
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating annotations */}
                  <div className="absolute -left-2 top-12 max-w-40 rounded-lg border bg-white p-2 shadow-lg sm:-left-4 sm:top-16 sm:max-w-48 sm:p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      See how much money
                    </div>
                    <div className="text-xs font-medium text-gray-900 sm:text-sm">
                      we can find in your farm operations
                    </div>
                  </div>

                  <div className="absolute -right-2 bottom-12 max-w-40 rounded-lg border bg-white p-2 shadow-lg sm:-right-4 sm:bottom-16 sm:max-w-48 sm:p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      See your savings
                    </div>
                    <div className="text-xs font-medium text-gray-900 sm:text-sm">
                      potential instantly
                    </div>
                  </div>
                </div>

                {/* Right side - Action Steps */}
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">
                      Get your personalized farm analysis
                    </h3>
                    <p className="mb-8 text-lg text-gray-600">
                      Our AI analyzes your farm operations and identifies
                      specific opportunities to reduce costs and increase yields
                      in just 2 minutes.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        1
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          Connect your farm data
                        </h4>
                        <p className="text-sm text-gray-600">
                          Share basic information about your farm size, species,
                          and current operations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        2
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          AI analyzes opportunities
                        </h4>
                        <p className="text-sm text-gray-600">
                          Our system identifies cost savings and optimization
                          opportunities specific to your farm
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        3
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          Get your custom report
                        </h4>
                        <p className="text-sm text-gray-600">
                          Receive a detailed analysis with actionable
                          recommendations and projected savings
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="px-4 pt-6 sm:px-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                      <Link href="/auth" className="w-full sm:w-auto">
                        <Button
                          size="lg"
                          className="w-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 sm:w-auto sm:text-lg"
                        >
                          Start Free Analysis
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </Link>
                      <Link href="#demo" className="w-full sm:w-auto">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full border-gray-300 px-8 py-4 text-base hover:bg-gray-50 sm:w-auto sm:text-lg"
                        >
                          Watch Demo
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 sm:gap-6">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>100% Free</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>15-minute setup</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>No hidden fees</span>
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
      <footer className="bg-gray-900 py-8 text-white">
        <div className="container mx-auto max-w-7xl px-8 sm:px-12 md:px-16 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo and Description */}
            <div className="text-center md:text-left">
              <div className="mb-3 flex items-center justify-center md:justify-start">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                  <Image
                    src="/Likai-logo.svg"
                    alt="LikAI Logo"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
                <span className="text-xl font-bold">LikAI</span>
              </div>
              <p className="max-w-sm text-sm text-gray-400">
                AI-powered biosecurity solutions for sustainable aquaculture.
              </p>
            </div>

            {/* Essential Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="#about"
                className="text-gray-400 transition-colors hover:text-white"
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2025 LikAI. All rights reserved. Made with ❤️ for Philippine
              aquaculture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
