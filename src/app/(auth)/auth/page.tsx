/**
 * Authentication/Sign-up Page
 *
 * This page serves as the main entry point for user authentication and registration.
 * Features:
 * - Internet Identity (ICP) authentication
 * - Secondary CTA for quick assessment without signup
 * - Interactive dashboard preview showcasing app capabilities
 * - Farmer-friendly UI with clear visual hierarchy
 *
 * Layout: Two-column design with auth form on left, dashboard preview on right
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { AuthClient } from "@dfinity/auth-client";

export default function AuthPage() {
  // SEO and structured data for better search engine visibility
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
  const router = useRouter()

  const handleLogin = async () => {
    const authClient = AuthClient.create()
    
    ;(await authClient).login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        // Redirect to dashboard after successful login
        console.log("Login successful, redirecting to dashboard");
        await router.push("/dashboard");
      }
    })
  }

  return (
    <React.Fragment>
      {/* SEO: Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Container: Full screen with gradient background */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10">
        {/* Background Effects: Subtle gradient overlay for visual depth */}
        <div
          className="from-[#FF7F50]/3 absolute inset-0 bg-gradient-to-r to-transparent opacity-50"
          aria-hidden="true"
        ></div>

        {/* Header: Simple navigation with logo */}
        <header className="relative z-50 border-b border-blue-200/50 bg-white/90 px-8 py-6 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Logo: Links back to homepage */}
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

        {/* Main Content: Two-column layout for desktop, single column for mobile */}
        <main
          className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-8"
          role="main"
        >
          <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Authentication Form */}
            <section
              className="relative mx-auto w-full max-w-lg space-y-8"
              aria-labelledby="signup-heading"
            >
              {/* Backdrop: Subtle blur effect for form container */}
              <div
                className="absolute inset-0 -z-10 -m-8 rounded-3xl bg-white/40 backdrop-blur-sm"
                aria-hidden="true"
              ></div>

              {/* Page Title and Subtitle */}
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

              {/* Authentication Actions */}
              <div className="relative z-10 space-y-6">
                {/* Primary CTA: Internet Identity Login */}
                <Link href="#">
                  <Button
                    className="flex h-16 w-full items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-lg font-medium text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:from-[#2980B9] hover:to-[#1F618D] hover:shadow-2xl"
                    aria-describedby="signup-benefits"
                    onClick={() => handleLogin()}
                  >
                    {/* ICP Logo */}
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

                {/* Privacy/Terms Notice: Non-clickable text */}
                <p
                  className="text-center text-sm text-gray-500"
                  id="signup-benefits"
                >
                  By signing up, you agree to our Privacy Policy and Terms of
                  Service
                </p>

                {/* Secondary CTA Section: Quick Assessment Option */}
                <div className="relative">
                  {/* Visual Divider with explanatory text */}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-500">
                      Want to explore first?
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Quick Assessment Button */}
                  <div className="mt-4">
                    <Link href="/onboarding">
                      <Button
                        variant="outline"
                        className="flex h-14 w-full items-center justify-center space-x-3 rounded-xl border-2 border-[#FF7F50] bg-white text-base font-medium text-[#FF7F50] shadow-md transition-all duration-200 hover:bg-[#FF7F50] hover:text-white hover:shadow-lg"
                        aria-label="Take a quick farm assessment without creating an account"
                      >
                        {/* Magnifying Glass Icon: Represents assessment/analysis */}
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
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                        <span>Take a Quick Farm Assessment</span>
                      </Button>
                    </Link>

                    {/* Assessment Benefits: Quick value proposition */}
                    <p className="mt-2 text-center text-xs text-gray-400">
                      Get instant insights • No account required • 5 minutes
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Dashboard Preview (Desktop Only) */}
            <aside
              className="relative hidden lg:block"
              aria-label="Dashboard preview"
            >
              {/* Decorative Background Elements */}
              <div
                className="absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full bg-[#FF7F50]/10 blur-lg"
                aria-hidden="true"
              ></div>
              <div
                className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-[#3498DB]/10 blur-xl"
                aria-hidden="true"
              ></div>

              {/* Dashboard Preview Card: Showcases app functionality */}
              <figure className="relative z-10 rotate-1 transform rounded-2xl border border-gray-200/50 bg-white p-4 shadow-2xl transition-transform duration-300 hover:rotate-0">
                <figcaption className="sr-only">
                  Preview of LikAI dashboard showing farm metrics and monitoring
                  data
                </figcaption>

                {/* Mock Dashboard Content: Uses realistic but static data */}
                <div className="space-y-3">
                  {/* Dashboard Header: Mimics browser window */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h2 className="text-base font-semibold text-gray-900">
                      Your Farm Dashboard
                    </h2>
                    {/* Browser-style window controls */}
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

                  {/* Overall Biosecurity Score: Main KPI display */}
                  <div className="rounded-lg border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center">
                    <div className="mb-1 text-xs font-medium text-gray-600">
                      Overall Biosecurity Score
                    </div>
                    <div className="mb-1 text-2xl font-bold text-green-600">
                      85%
                    </div>
                    <div className="text-xs font-medium text-green-700">
                      Good • On track for success!
                    </div>
                  </div>

                  {/* Health Categories: Key assessment areas with progress bars */}
                  <div className="space-y-2">
                    {/* Category 1: Pond & Water Care */}
                    <div className="rounded-md border border-green-200/50 bg-gradient-to-br from-green-50/80 to-green-50/40 p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {/* Category Icon */}
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
                        {/* Score Display */}
                        <div className="text-right">
                          <div className="text-xs font-medium text-green-700">
                            Good
                          </div>
                          <div className="text-xs text-gray-500">92%</div>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Category 2: Farm Access Control */}
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
                            Fair
                          </div>
                          <div className="text-xs text-gray-500">78%</div>
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Category 3: Stock Sourcing */}
                    <div className="rounded-md border border-yellow-200/50 bg-gradient-to-br from-yellow-50/80 to-yellow-50/40 p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {/* Category Icon */}
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
                        {/* Score Display */}
                        <div className="text-right">
                          <div className="text-xs font-medium text-yellow-700">
                            Needs Work
                          </div>
                          <div className="text-xs text-gray-500">60%</div>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alerts Section: Highlights important issues and updates */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-gray-900">
                      Critical Alerts
                    </h3>

                    {/* Critical Alert: Needs attention */}
                    <div className="flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-1.5">
                      {/* Warning Triangle Icon: Enhanced visual emphasis */}
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
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

                    {/* Completed Task: Shows positive activity */}
                    <div className="flex items-center space-x-2 rounded-md bg-gray-50 p-1.5">
                      {/* Checkmark Icon: Indicates completion */}
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
                        {/* Timestamp: Shows recent activity */}
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

              {/* Floating AI Badge: Emphasizes AI-powered features */}
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
