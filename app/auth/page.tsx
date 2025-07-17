"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sign Up - LikAI",
    description:
      "Create your free LikAI account and access AI-driven biosecurity solutions for aquaculture farms",
    url: "https://likai.ai/auth",
    mainEntity: {
      "@type": "Startup",
      name: "LikAI",
      description: "AI-driven biosecurity platform for aquaculture",
      url: "https://likai.ai",
    },
  };

  return (
    <React.Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10">
        {/* Background Effects - Similar to Hero Section */}
        <div
          className="from-[#FF7F50]/3 absolute inset-0 bg-gradient-to-r to-transparent opacity-50"
          aria-hidden="true"
        ></div>{" "}
        {/* Header */}
        <header className="relative z-50 border-b border-blue-200/50 bg-white/90 px-8 py-6 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label="LikAI - Go to homepage"
            >
              <span className="text-2xl font-bold">
                <span className="text-[#FF7F50]">Lik</span>
                <span className="text-[#3498DB]">AI</span>
              </span>
            </Link>
          </div>
        </header>
        {/* Main Content */}
        <main
          className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-8"
          role="main"
        >
          <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Side - Auth Form */}
            <section
              className="relative mx-auto w-full max-w-lg space-y-8"
              aria-labelledby="signup-heading"
            >
              {/* Backdrop blur effect similar to hero */}
              <div
                className="absolute inset-0 -z-10 -m-8 rounded-3xl bg-white/40 backdrop-blur-sm"
                aria-hidden="true"
              ></div>

              {/* Title */}
              <header className="relative z-10 text-left">
                <h1
                  id="signup-heading"
                  className="mb-6 text-5xl font-bold leading-tight text-[#FF7F50]"
                >
                  Create your free account
                </h1>
                <p className="mb-8 text-xl text-gray-600">
                  100% free. No credit card needed.
                </p>
              </header>

              {/* Auth Button */}
              <div className="relative z-10 space-y-6">
                <Link href="/auth/onboarding">
                  <Button
                    className="flex h-16 w-full items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-lg font-medium text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:from-[#2980B9] hover:to-[#1F618D] hover:shadow-2xl"
                    aria-describedby="signup-benefits"
                  >
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Image
                        src="/internet-computer-icp-logo.svg"
                        alt="Internet Computer logo"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                    </div>
                    <span>Continue with Internet Identity</span>
                  </Button>
                </Link>

                <p
                  className="text-center text-sm text-gray-500"
                  id="signup-benefits"
                >
                  By signing up, you agree to our Privacy Policy and Terms of
                  Service
                </p>

                {/* Secondary CTA - Quick Assessment */}
                <div className="relative">
                  {/* Divider with text */}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-500">
                      Want to explore first?
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Assessment CTA Button */}
                  <div className="mt-4">
                    <Link href="/auth/onboarding">
                      <Button
                        variant="outline"
                        className="flex h-14 w-full items-center justify-center space-x-3 rounded-xl border-2 border-[#FF7F50] bg-white text-base font-medium text-[#FF7F50] shadow-md transition-all duration-200 hover:bg-[#FF7F50] hover:text-white hover:shadow-lg"
                        aria-label="Take a quick farm assessment without creating an account"
                      >
                        <div className="flex h-6 w-6 items-center justify-center">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        </div>
                        <span>Take a Quick Farm Assessment</span>
                      </Button>
                    </Link>

                    <p className="mt-2 text-center text-xs text-gray-400">
                      Get instant insights • No account required • 5 minutes
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Side - Dashboard Preview */}
            <aside
              className="relative hidden lg:block"
              aria-label="Dashboard preview"
            >
              {/* Decorative circles behind dashboard */}
              <div
                className="absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full bg-[#FF7F50]/10 blur-lg"
                aria-hidden="true"
              ></div>
              <div
                className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-[#3498DB]/10 blur-xl"
                aria-hidden="true"
              ></div>

              <figure className="relative z-10 rotate-1 transform rounded-2xl border border-gray-200/50 bg-white p-4 shadow-2xl transition-transform duration-300 hover:rotate-0">
                <figcaption className="sr-only">
                  Preview of LikAI dashboard showing farm metrics and monitoring
                  data
                </figcaption>{" "}
                {/* Mock Dashboard Content */}
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h2 className="text-base font-semibold text-gray-900">
                      Your Farm Dashboard
                    </h2>
                    <div
                      className="flex space-x-1"
                      aria-label="Window controls"
                    >
                      <div
                        className="h-2 w-2 rounded-full bg-red-400"
                        aria-hidden="true"
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-yellow-400"
                        aria-hidden="true"
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-green-400"
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>

                  {/* Overall Biosecurity Score */}
                  <div className="rounded-lg border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center">
                    <div className="mb-1 text-xs font-medium text-gray-600">
                      Overall Biosecurity Score
                    </div>
                    <div className="mb-1 text-2xl font-bold text-green-600">
                      86%
                    </div>
                    <div className="text-xs font-medium text-green-700">
                      Excellent • Keep up the great work!
                    </div>
                  </div>

                  {/* Health Categories */}
                  <div className="space-y-2">
                    {/* Pond & Water Care */}
                    <div className="rounded-md border border-green-200/50 bg-gradient-to-br from-green-50/80 to-green-50/40 p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">💧</span>
                          <div>
                            <div className="text-xs font-semibold text-gray-900">
                              Pond & Water Care
                            </div>
                            <div className="text-xs text-gray-600">
                              How well you prepare ponds
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-green-700">
                            Excellent
                          </div>
                          <div className="text-xs text-gray-500">100%</div>
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Farm Access Control */}
                    <div className="rounded-md border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-50/40 p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">🚪</span>
                          <div>
                            <div className="text-xs font-semibold text-gray-900">
                              Farm Access Control
                            </div>
                            <div className="text-xs text-gray-600">
                              Who can enter your farm
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-blue-700">
                            Good
                          </div>
                          <div className="text-xs text-gray-500">80%</div>
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Stock Sourcing */}
                    <div className="rounded-md border border-yellow-200/50 bg-gradient-to-br from-yellow-50/80 to-yellow-50/40 p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">🦐</span>
                          <div>
                            <div className="text-xs font-semibold text-gray-900">
                              Stock Sourcing
                            </div>
                            <div className="text-xs text-gray-600">
                              Baby shrimp quality
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-yellow-700">
                            Needs Work
                          </div>
                          <div className="text-xs text-gray-500">60%</div>
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alerts */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-gray-900">
                      Critical Alerts
                    </h3>
                    <div className="flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-1.5">
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500"
                        aria-hidden="true"
                      >
                        <span
                          className="text-xs font-bold text-white"
                          aria-hidden="true"
                        >
                          !
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-red-800">
                          Improve shrimp source quality
                        </div>
                        <div className="text-xs text-red-600">
                          Consider BFAR-certified hatchery
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-gray-50 p-1.5">
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3498DB]"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-900">
                          Water quality check completed
                        </div>
                        <time
                          className="text-xs text-gray-500"
                          dateTime="2025-07-15T14:58:00"
                        >
                          2 minutes ago
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>

              {/* Floating elements */}
              <div
                className="absolute -bottom-4 -left-4 z-20 flex h-12 w-12 -rotate-12 transform items-center justify-center rounded-lg bg-gradient-to-br from-[#3498DB] to-[#2980B9] shadow-lg"
                aria-label="AI Assistant Badge"
              >
                <span className="font-bold text-white" aria-hidden="true">
                  AI
                </span>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
