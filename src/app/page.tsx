"use client";

import { useState } from "react";

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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-20 items-center border-b border-gray-100 bg-white px-4 sm:px-6 md:px-8 lg:px-6">
        {/* Logo */}
        <h1 className="flex-1">
          <Link href="#" className="flex w-fit items-center space-x-3">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
        </h1>

        {/* Navigation - Centered */}
        <nav className="hidden flex-1 items-center justify-center space-x-8 md:flex">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="#about"
                className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons */}
        <aside
          className="hidden flex-1 items-center justify-end space-x-4 md:flex"
          aria-label="Call to action buttons"
        >
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
        </aside>

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
        <nav
          className="border-b border-gray-100 bg-white shadow-lg md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-4 px-4 py-4 sm:px-6">
            <li>
              <Link
                href="#about"
                className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="block font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="border-t border-gray-100 pt-4">
              <aside
                className="flex flex-col space-y-2"
                aria-label="Mobile call to action buttons"
              >
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
              </aside>
            </li>
          </ul>
        </nav>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="about"
          className="relative overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10"
          aria-labelledby="hero-heading"
        >
          <div className="from-[#FF7F50]/3 absolute inset-0 bg-gradient-to-r to-transparent opacity-50"></div>
          <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-6 lg:py-32">
            <div className="flex flex-col items-center gap-8 text-center sm:gap-12">
              {/* Content - Centered */}
              <header className="relative mx-auto max-w-4xl">
                <div className="absolute inset-0 -z-10 -m-8 rounded-3xl bg-white/40 backdrop-blur-sm"></div>
                <Badge className="mb-4 bg-[#3498DB]/10 text-[#3498DB] hover:bg-[#3498DB]/10 sm:mb-6">
                  <Zap className="mr-1 h-3 w-3" />
                  AI-driven Biosecurity
                </Badge>
                <h1
                  id="hero-heading"
                  className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  AI-Driven Aquaculture Biosecurity
                </h1>
                <h2 className="mb-4 text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl">
                  <span className="text-[#FF7F50]">Reduce Disease Risk</span>
                  <span className="text-gray-700"> & </span>
                  <span className="text-green-600">
                    Secure Your Farm Profits
                  </span>
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:mb-8 sm:text-base lg:text-lg">
                  Safeguard your shrimp farm with AI-driven biosecurity, aligned
                  with Philippine BFAR GAqP standards, to minimize disease risk and
                  maximize your harvest potential.
                </p>
                <nav
                  className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:justify-center sm:gap-4"
                  aria-label="Primary call-to-action buttons"
                >
                  <Link href="/onboarding/" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 sm:w-auto sm:px-8"
                    >
                      Get Free Analysis
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
                </nav>
              </header>
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section
          className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 sm:py-20"
          aria-labelledby="savings-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 md:px-8 lg:px-6">
            <header className="mb-12">
              <h2
                id="savings-heading"
                className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                <span className="text-[#FF7F50]">Boost Farm Efficiency</span>{" "}
                Through GAqP
              </h2>
              <p className="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:px-0 sm:text-lg">
                Likai's AI guides your farm to adopt precise Good Aquaculture Practices (GAqP), preventing
                costly losses and maximizing resource efficiency to boost your
                yields and profits.
              </p>
            </header>

            <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-6 px-2 sm:grid-cols-2 sm:gap-8 sm:px-0 md:grid-cols-2">
              <li>
                <Card className="h-full border-0 bg-gradient-to-br from-blue-50/80 to-blue-50/40 shadow-lg transition-all duration-300 hover:from-blue-50 hover:to-blue-100/60">
                  <CardContent className="flex h-full min-h-[280px] flex-col justify-center p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-200/50 bg-blue-100">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      GAqP-Driven Risk Control
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Likai's AI guides your farm to implement robust GAqP,
                      proactively minimizing costly disease outbreaks before
                      they impact your profitability with intelligent,
                      predictive insights.
                    </p>
                  </CardContent>
                </Card>
              </li>

              <li>
                <Card className="h-full border-0 bg-gradient-to-br from-green-50/80 to-green-50/40 shadow-lg transition-all duration-300 hover:from-green-50 hover:to-green-100/60">
                  <CardContent className="flex h-full min-h-[280px] flex-col justify-center p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-200/50 bg-green-100">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      Profit Maximization
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Optimize every cycle to achieve superior harvest quality
                      and quantity, driven by AI insights for increased market
                      value and profitability.
                    </p>
                  </CardContent>
                </Card>
              </li>

              <li>
                <Card className="h-full border-0 bg-gradient-to-br from-cyan-50/80 to-cyan-50/40 shadow-lg transition-all duration-300 hover:from-cyan-50 hover:to-cyan-100/60">
                  <CardContent className="flex h-full min-h-[280px] flex-col justify-center p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#3498DB]/20 bg-[#3498DB]/10">
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
              </li>

              <li>
                <Card className="h-full border-0 bg-gradient-to-br from-orange-50/80 to-orange-50/40 shadow-lg transition-all duration-300 hover:from-orange-50 hover:to-orange-100/60">
                  <CardContent className="flex h-full min-h-[280px] flex-col justify-center p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-200/50 bg-orange-100">
                      <svg
                        className="h-8 w-8 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      Compliance & Market Access
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Achieve BFAR GAqP compliance effortlessly, unlocking new
                      market opportunities and enhancing your farm's reputation.
                    </p>
                  </CardContent>
                </Card>
              </li>
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-gradient-to-br from-white to-gray-50/50 py-16 sm:py-20"
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-6">
            <h2 id="features-heading" className="sr-only">
              Product Features
            </h2>
            {/* Feature 1 - Visual Step-by-Step Guides */}
            <article className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2">
              <header className="order-2 lg:order-1">
                <div className="mb-4 flex items-center">
                  <div
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Visual Step-by-Step Guides
                  </h3>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Transform complex biosecurity into clear, actionable steps
                  with intuitive visual guides that feel like an expert by your
                  side. Get detailed, prioritized action plans with progress
                  tracking.
                </p>

                <ul className="list-none space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Interactive Action Plans
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Visual Task Management
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Smart Sequencing
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Emergency Protocols
                    </span>
                  </li>
                </ul>
              </header>

              <figure className="relative order-1 lg:order-2">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-[#3498DB]/10 p-4 shadow-lg">
                  {/* Enhanced Step-by-Step Dashboard Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    {/* Header with progress indicator */}
                    <div className="border-b bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-3 py-3 text-white">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="text-sm font-bold">
                          Step-by-Step Action Plan
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs opacity-90">
                          Progress: 2/5 steps
                        </div>
                        <div className="flex-1 rounded-full bg-white/20">
                          <div className="h-1 w-2/5 rounded-full bg-white"></div>
                        </div>
                        <div className="text-xs opacity-90">40%</div>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Current Plan Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            Water Quality Recovery Plan
                          </h4>
                          <p className="text-xs text-gray-600">
                            Pond 3 - Critical Priority
                          </p>
                        </div>
                        <div className="rounded-full bg-red-100 px-2 py-0.5">
                          <span className="text-xs font-medium text-red-700">
                            🚨 Urgent
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Step List */}
                      <div className="space-y-2">
                        {/* Step 1 - Current */}
                        <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-2.5">
                          <div className="flex items-start space-x-2">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                              1
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900">
                                Test dissolved oxygen levels
                              </div>
                              <div className="mb-1 text-xs text-gray-700">
                                Use DO meter in Pond 3 immediately - readings
                                below 4mg/L
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-800">
                                  In Progress
                                </span>
                                <span className="text-xs text-gray-500">
                                  Started 5 min ago
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Step 2 - Completed */}
                        <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-2.5">
                          <div className="flex items-start space-x-2">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                              ✓
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900">
                                Increase aeration
                              </div>
                              <div className="mb-1 text-xs text-gray-700">
                                Turn on backup aerators - all 3 units activated
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
                                  Completed
                                </span>
                                <span className="text-xs text-gray-500">
                                  ✅ 15 min ago
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Step 3 - Next */}
                        <div className="rounded-lg border-l-4 border-gray-300 bg-gray-50 p-2.5">
                          <div className="flex items-start space-x-2">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
                              3
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-700">
                                Monitor for 2 hours
                              </div>
                              <div className="mb-1 text-xs text-gray-600">
                                Recheck DO levels every 30 minutes - target:
                                &gt;5mg/L
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                                  Pending
                                </span>
                                <span className="text-xs text-gray-500">
                                  Starts after step 1
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Steps 4-5 - Collapsed view */}
                        <div className="rounded-lg border border-gray-200 bg-white p-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                                  4
                                </div>
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                                  5
                                </div>
                              </div>
                              <span className="text-sm text-gray-700">
                                2 more steps planned
                              </span>
                            </div>
                            <button className="text-xs text-[#3498DB] hover:underline">
                              View all →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 flex space-x-2">
                        <button className="flex-1 rounded-lg bg-[#3498DB] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#2980B9]">
                          Mark Step 1 Complete
                        </button>
                        <button className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                          Get Help
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
            </article>

            {/* Feature 2 - AI Biosecurity Coach & Troubleshooting */}
            <article className="mb-16 grid items-center gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2">
              <figure className="relative">
                <div className="rounded-xl bg-gradient-to-br from-[#3498DB]/10 to-blue-50 p-6 shadow-lg">
                  {/* Enhanced Chat Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-4 py-3 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                          <span className="text-sm font-bold text-white">
                            🤖
                          </span>
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            LikAI Assistant
                          </div>
                          <div className="flex items-center text-xs text-blue-100">
                            <div className="mr-1 h-2 w-2 rounded-full bg-green-400"></div>
                            Online • Expert advisor
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-red-400"></div>
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                        <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      </div>
                    </div>

                    {/* Smart Alert Banner */}
                    <div className="border-b bg-orange-50 px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span className="text-xs font-medium text-orange-700">
                          🚨 pH Alert: Pond 3 trending high (8.2)
                        </span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-56 space-y-4 overflow-y-auto p-4">
                      {/* AI Message with avatar */}
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3498DB]">
                          <span className="text-xs font-bold text-white">
                            AI
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="max-w-xs rounded-lg bg-gray-100 p-3">
                            <p className="text-sm text-gray-800">
                              I've detected elevated pH levels in Pond 3. This
                              could stress your fish and affect growth rates.
                              Would you like specific recommendations?
                            </p>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            2 min ago
                          </div>
                        </div>
                      </div>

                      {/* User Response */}
                      <div className="flex justify-end">
                        <div className="flex flex-col items-end">
                          <div className="max-w-xs rounded-lg bg-[#3498DB] p-3 text-white">
                            <p className="text-sm">
                              Yes, what should I do immediately?
                            </p>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Just now
                          </div>
                        </div>
                      </div>

                      {/* AI Response with typing indicator */}
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3498DB]">
                          <span className="text-xs font-bold text-white">
                            AI
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="max-w-xs rounded-lg bg-gray-100 p-3">
                            <p className="text-sm text-gray-800">
                              <strong>Immediate actions:</strong>
                              <br />
                              1. Reduce feeding by 20% for next 2 days
                              <br />
                              2. Increase aeration in affected area
                              <br />
                              3. Test again in 4 hours
                              <br />
                              <br />
                              I'll monitor and alert you of changes.
                            </p>
                          </div>
                          <div className="mt-1 flex items-center space-x-2">
                            <div className="text-xs text-gray-500">Now</div>
                            <div className="flex space-x-1">
                              <div className="h-1 w-1 animate-pulse rounded-full bg-gray-400"></div>
                              <div
                                className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="border-t bg-gray-50 px-4 py-2">
                      <div className="mb-2 text-xs font-medium text-gray-600">
                        Quick questions:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded-full bg-white px-3 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-100">
                          Water quality tips
                        </button>
                        <button className="rounded-full bg-white px-3 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-100">
                          Feeding schedule
                        </button>
                        <button className="rounded-full bg-white px-3 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-100">
                          Disease prevention
                        </button>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t bg-white p-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Ask about biosecurity, water quality, feeding..."
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#3498DB] focus:outline-none focus:ring-1 focus:ring-[#3498DB]"
                          readOnly
                        />
                        <Button
                          size="sm"
                          className="bg-[#3498DB] px-4 py-2 text-sm hover:bg-[#2980B9]"
                        >
                          <span className="mr-1">📤</span>
                          Send
                        </Button>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        AI is analyzing your farm data...
                      </div>
                    </div>
                  </div>

                  {/* Floating status indicator */}
                  <div className="absolute -right-4 top-4 rounded-lg bg-white p-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-gray-700">
                        AI Expert Online
                      </span>
                    </div>
                  </div>
                </div>
              </figure>

              <header>
                <div className="mb-4 flex items-center">
                  <div
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    AI Coach & Knowledge Assistant
                  </h3>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Get instant, expert-level guidance on your farm's biosecurity
                  and GAqP challenges with our intelligent AI assistant. From
                  routine questions to emergency situations, get expert support
                  24/7.
                </p>

                <ul className="list-none space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Proactive Issue Detection
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Contextual Responses
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Instant Action Integration
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Multi-format Support
                    </span>
                  </li>
                </ul>
              </header>
            </article>

            {/* Feature 3 - Smart Investment Guidance */}
            <article className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2">
              <header className="order-2 lg:order-1">
                <div className="mb-4 flex items-center">
                  <div
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Smart Investment Guidance
                  </h3>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Maximize your farm's budget efficiency with AI-driven
                  insights, ensuring every biosecurity investment delivers
                  optimal returns.
                </p>

                <ul className="list-none space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Practical DIY Alternatives
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Budget-Fit Recommendations
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      ROI Analysis
                    </span>
                  </li>
                </ul>
              </header>

              <figure className="relative order-1 lg:order-2">
                <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg">
                  {/* Investment Dashboard Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-5 text-center text-white">
                      <h3 className="mb-3 text-lg font-bold">
                        Investment ROI Calculator
                      </h3>
                      <div className="text-sm opacity-90">
                        Budget: ₱50,000 | Timeline: 6 months
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Investment Recommendations */}
                      <div className="mb-5 space-y-3">
                        <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-green-900">
                                Water Quality Sensors
                              </h4>
                              <p className="text-xs text-green-700">
                                DIY pH monitoring system
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-green-600">
                                ₱8,500
                              </div>
                              <div className="text-xs text-green-500">
                                ROI: 240%
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-blue-900">
                                Pond Aeration Upgrade
                              </h4>
                              <p className="text-xs text-blue-700">
                                Solar-powered solution
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-blue-600">
                                ₱25,000
                              </div>
                              <div className="text-xs text-blue-500">
                                ROI: 180%
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-orange-900">
                                Feed Management System
                              </h4>
                              <p className="text-xs text-orange-700">
                                Automated feeding timer
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-orange-600">
                                ₱12,000
                              </div>
                              <div className="text-xs text-orange-500">
                                ROI: 150%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Budget Summary */}
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Total Investment
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            ₱45,500
                          </span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Projected Annual Savings
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            ₱89,200
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900">
                              Average ROI
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              196%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
            </article>

            {/* Feature 4 - Practical Biosecurity Library */}
            <article className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <figure className="relative order-1 lg:order-1">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 shadow-lg">
                  {/* Enhanced Knowledge Base Interface */}
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    {/* Header with improved styling */}
                    <div className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-3 py-4 text-center text-white">
                      <h3 className="mb-2 text-base font-bold">
                        Biosecurity Library
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search for help..."
                          className="w-full rounded-lg border-0 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-white/50"
                          readOnly
                        />
                        <button className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600">
                          🔍
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Category Cards with improved design */}
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-gradient-to-br from-red-50 to-orange-50 p-3 transition-all hover:border-red-300 hover:shadow-md">
                          <div className="mb-1 text-xl">🦐</div>
                          <h4 className="mb-0.5 text-sm font-semibold text-gray-900">
                            Shrimp Health
                          </h4>
                          <p className="text-xs text-gray-600">
                            Disease prevention & monitoring
                          </p>
                        </div>
                        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-3 transition-all hover:border-blue-300 hover:shadow-md">
                          <div className="mb-1 text-xl">💧</div>
                          <h4 className="mb-0.5 text-sm font-semibold text-gray-900">
                            Water Quality
                          </h4>
                          <p className="text-xs text-gray-600">
                            Monitoring & optimization
                          </p>
                        </div>
                      </div>

                      {/* Popular Articles with visual enhancements */}
                      <div className="border-t border-gray-100 pt-3">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Popular Step-by-Step Guides
                          </h4>
                          <span className="rounded-full bg-[#3498DB]/10 px-2 py-0.5 text-xs font-medium text-[#3498DB]">
                            24 guides
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="group flex cursor-pointer items-center space-x-2 rounded-lg p-1.5 transition-colors hover:bg-gray-50">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#3498DB]/10">
                              <span className="text-xs">💧</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-medium text-gray-900 group-hover:text-[#3498DB]">
                                Optimal dissolved oxygen levels
                              </div>
                              <div className="text-xs text-gray-500">
                                Step-by-step testing guide
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              5 min read
                            </div>
                          </div>
                          <div className="group flex cursor-pointer items-center space-x-2 rounded-lg p-1.5 transition-colors hover:bg-gray-50">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-green-100">
                              <span className="text-xs">🎥</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-medium text-gray-900 group-hover:text-[#3498DB]">
                                Early infection detection
                              </div>
                              <div className="text-xs text-gray-500">
                                Visual demonstration
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">Video</div>
                          </div>
                          <div className="group flex cursor-pointer items-center space-x-2 rounded-lg p-1.5 transition-colors hover:bg-gray-50">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-100">
                              <span className="text-xs">📋</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-medium text-gray-900 group-hover:text-[#3498DB]">
                                Emergency pond treatment
                              </div>
                              <div className="text-xs text-gray-500">
                                Field-ready checklist
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              Quick ref
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile-optimized indicator */}
                      <div className="mt-3 flex items-center justify-center rounded-lg bg-green-50 px-2 py-1.5">
                        <div className="flex items-center space-x-1.5">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                            <span className="text-xs text-white">📱</span>
                          </div>
                          <span className="text-xs font-medium text-green-700">
                            Mobile-optimized for field access
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>

              <header className="order-2 lg:order-2">
                <div className="mb-4 flex items-center">
                  <div
                    className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Practical Biosecurity Library
                  </h3>
                </div>
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Access comprehensive, GAqP-aligned aquaculture resources that
                  empower farmers to solve challenges confidently and
                  independently.
                </p>

                <ul className="list-none space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Expert Guides & Tutorials
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Mobile-Optimized Access
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-base font-medium text-gray-900">
                      Immediate Solutions
                    </span>
                  </li>
                </ul>
              </header>
            </article>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="bg-gradient-to-br from-orange-50/30 to-blue-50/20 py-16 sm:py-20"
          aria-labelledby="pricing-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-6">
            <header className="mb-12 text-center sm:mb-16">
              <h2
                id="pricing-heading"
                className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                Plans and Pricing
              </h2>
              <p className="mx-auto mb-8 max-w-2xl px-2 text-base text-gray-600 sm:px-0 sm:text-lg">
                Choose the plan that fits your farm's biosecurity needs. Upgrade
                as your operation grows.
              </p>

              {/* Billing Period Toggle */}
              <div className="mb-12 flex justify-center">
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
                    Annual
                    <span className="ml-1 rounded bg-green-500 px-1.5 py-0.5 text-xs text-white">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </header>

            {/* Three Column Layout */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-2 sm:gap-8 sm:px-0 lg:grid-cols-3">
              {/* Free Plan */}
              <Card className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                      Starter
                    </h3>
                    <div className="mb-6">
                      <div className="mb-2 text-4xl font-bold text-gray-900">
                        ₱0
                      </div>
                      <p className="text-sm text-gray-600">
                        Get started with basic biosecurity
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Perfect for getting familiar with GAqP standards
                    </p>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        Static GAqP biosecurity plan template
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        Basic farm profile setup
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        Limited biosecurity library access
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        3 AI coaching queries per day
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        Community support forum
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gray-100 py-3 font-medium text-gray-700 hover:bg-gray-200">
                    Get started for free
                  </Button>
                </CardContent>
              </Card>

              {/* Business Plan - Highlighted */}
              <Card className="hover:shadow-3xl relative overflow-hidden rounded-2xl border-2 border-[#FF7F50] bg-white shadow-2xl transition-all duration-300">
                <div className="absolute right-4 top-4 rounded-full bg-[#FF7F50] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                      Business
                    </h3>
                    <div className="mb-6">
                      <div className="mb-2 text-4xl font-bold text-gray-900">
                        {billingPeriod === "monthly" ? "₱1,200" : "₱12,000"}
                      </div>
                      <p className="text-sm text-gray-600">
                        {billingPeriod === "monthly"
                          ? "per month, billed monthly"
                          : "per year, billed annually"}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-700">
                        Continuous biosecurity coaching for GAqP compliance
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Everything in Free, plus:
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Adaptive biosecurity plans (GAqP)
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Unlimited AI biosecurity coaching
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Real-time resource optimization alerts
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Continuous compliance monitoring
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7F50]" />
                      <span className="text-sm text-gray-700">
                        Complete biosecurity library & email support
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#FF7F50] py-3 font-semibold text-white hover:bg-orange-600">
                    Get started with Business
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative overflow-hidden rounded-2xl bg-gray-900 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-6 text-xl font-bold text-white">
                      Enterprise
                    </h3>
                    <div className="mb-6">
                      <div className="mb-2 text-4xl font-bold text-white">
                        Custom
                      </div>
                      <p className="text-sm text-gray-300">
                        Strategic oversight for large-scale operations
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                      <span className="text-sm text-gray-200">
                        Everything in Business, plus:
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                      <span className="text-sm text-gray-200">
                        Multi-site farm management & oversight
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                      <span className="text-sm text-gray-200">
                        Advanced compliance analytics & reporting
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                      <span className="text-sm text-gray-200">
                        Export requirement management
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                      <span className="text-sm text-gray-200">
                        Human expert consultation & API integrations
                      </span>
                    </div>
                  </div>

                  <Button className="w-full border border-white bg-transparent py-3 font-semibold text-white hover:bg-white hover:text-gray-900">
                    Get started with Enterprise
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <aside className="mt-12 text-center">
              <p className="mb-4 text-gray-600">
                All plans include BFAR GAqP-aligned biosecurity guidance and
                ongoing compliance support
              </p>
              <ul className="flex list-none flex-col items-center justify-center gap-4 text-sm text-gray-500 sm:flex-row">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Expert biosecurity support</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="bg-gradient-to-br from-gray-50/50 to-orange-50/20 py-16 sm:py-20"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-6">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-gray-50/50 to-orange-50/30"></div>
              <div className="relative z-10">
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Frequently Asked Questions
                  </h2>
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
                                BFAR Good Aquaculture Practices (GAqP) and
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
                                The AI provides instant recommendations, and our
                                GAqP action plans can help optimize your
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
                                Your farm's information is precious, and we keep
                                it safe. Likai uses advanced digital 'locks'
                                (blockchain) and a secure, private system (ICP)
                                to make sure your data is always protected,
                                never seen by others, and completely yours to
                                control.
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
                                Our Enterprise Plan empowers you to effortlessly
                                meet complex regulatory demands. It
                                automatically generates detailed compliance
                                reports, precisely formatted for BFAR
                                accreditation and stringent international export
                                standards (including HACCP and EU requirements),
                                ensuring seamless market access.
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
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-6">
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                Complete Your Initial Farm Assessment{" "}
                <span className="text-[#FF7F50]">in 15 Minutes</span>
              </h2>
              <p className="mb-4 px-2 text-base text-gray-600 sm:px-0 sm:text-lg">
                Start your personalized biosecurity journey now
              </p>
              <p className="text-sm text-gray-500">
                100% free, no credit card required
              </p>
            </div>

            <div className="mx-auto max-w-6xl px-2 sm:px-0">
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
                          <div className="mb-4 flex items-center justify-center"></div>
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Potential Farm Cost Savings Analysis
                          </h3>
                        </div>

                        {/* Savings Amount */}
                        <div className="mb-8">
                          <div className="mb-2 text-5xl font-bold text-green-600">
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
                </div>

                {/* Right side - Action Steps */}
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">
                      Unlock Your Farm's Profit Potential
                    </h3>
                    <p className="mb-8 text-lg text-gray-600">
                      Likai's AI rapidly analyzes your farm's operations,
                      delivering actionable insights to immediately cut costs
                      and significantly boost yields.
                    </p>
                  </div>

                  {/* Steps */}
                  <ol className="list-none space-y-6">
                    <li className="flex items-start space-x-4">
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
                    </li>

                    <li className="flex items-start space-x-4">
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
                    </li>

                    <li className="flex items-start space-x-4">
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
                    </li>
                  </ol>

                  {/* CTA Buttons */}
                  <div className="px-4 pt-6 sm:px-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                      <Link
                        href="/auth/onboarding"
                        className="w-full sm:w-auto"
                      >
                        <Button
                          size="lg"
                          className="w-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 sm:w-auto sm:text-lg"
                        >
                          Quick Scan
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
                        <span>No hidden fees</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>No setup fees</span>
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
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-6">
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
                AI-driven biosecurity solutions for sustainable aquaculture.
              </p>
            </div>

            {/* Essential Links */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <ul className="flex list-none flex-wrap justify-center gap-6">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
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
