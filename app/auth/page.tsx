"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AuthPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FF7F50]/5 via-white to-[#3498DB]/10">
      {/* Background Effects - Similar to Hero Section */}
      <div className="from-[#FF7F50]/3 absolute inset-0 bg-gradient-to-r to-transparent opacity-50"></div>
      {/* Header */}
      <header className="relative z-50 border-b border-blue-200/50 bg-white/90 px-8 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold">
              <span className="text-[#FF7F50]">Lik</span>
              <span className="text-[#3498DB]">AI</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-8">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Auth Form */}
          <div className="relative mx-auto w-full max-w-lg space-y-8">
            {/* Backdrop blur effect similar to hero */}
            <div className="absolute inset-0 -z-10 -m-8 rounded-3xl bg-white/40 backdrop-blur-sm"></div>

            {/* Title */}
            <div className="relative z-10 text-left">
              <h1 className="mb-6 text-5xl font-bold leading-tight text-[#FF7F50]">
                Create your free account
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                100% free. No credit card needed.
              </p>
            </div>

            {/* Auth Button */}
            <div className="relative z-10 space-y-6">
              <Link href="/dashboard">
                <Button className="flex h-16 w-full items-center justify-center space-x-4 rounded-xl bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-lg font-medium text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:from-[#2980B9] hover:to-[#1F618D] hover:shadow-2xl">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Image
                      src="/internet-computer-icp-logo.svg"
                      alt="Internet Computer"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                  <span>Continue with Internet Identity</span>
                </Button>
              </Link>

              <p className="text-center text-sm text-gray-500">
                By signing up, you agree to our{" "}
                <span className="text-[#3498DB]">Privacy Policy</span> and{" "}
                <span className="text-[#3498DB]">Terms of Service</span>
              </p>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="relative hidden lg:block">
            {/* Decorative circles behind dashboard */}
            <div className="absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full bg-[#FF7F50]/10 blur-lg"></div>
            <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-[#3498DB]/10 blur-xl"></div>

            <div className="relative z-10 rotate-1 transform rounded-2xl border border-gray-200/50 bg-white p-6 shadow-2xl transition-transform duration-300 hover:rotate-0">
              {/* Mock Dashboard Content */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Farm Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border border-green-200/50 bg-gradient-to-br from-green-100/80 to-green-50/60 p-4">
                    <div className="mb-2 text-sm text-gray-600">
                      Cost Savings
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ₱45,000
                    </div>
                    <div className="mt-1 text-xs text-gray-500">This cycle</div>
                  </div>
                  <div className="rounded-lg border border-[#FF7F50]/20 bg-gradient-to-br from-[#FF7F50]/10 to-[#FF7F50]/5 p-4">
                    <div className="mb-2 text-sm text-gray-600">
                      Farm Health
                    </div>
                    <div className="text-2xl font-bold text-[#FF7F50]">94%</div>
                    <div className="mt-1 text-xs text-gray-500">Optimal</div>
                  </div>
                  <div className="rounded-lg border border-orange-200/50 bg-gradient-to-br from-orange-100/80 to-orange-50/60 p-4">
                    <div className="mb-2 text-sm text-gray-600">
                      Overall Risk Score
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      68/100
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      +5 from yesterday
                    </div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex h-40 items-center justify-center rounded-lg bg-gray-50 p-6">
                  <div className="flex h-full w-full items-end justify-center space-x-2 rounded-lg bg-gradient-to-r from-[#3498DB]/20 via-[#FF7F50]/20 to-[#3498DB]/20">
                    {[40, 65, 30, 80, 45, 90, 55, 75].map((height, i) => (
                      <div
                        key={i}
                        className="rounded-t bg-gradient-to-t from-[#3498DB] to-[#FF7F50]"
                        style={{ height: `${height}%`, width: "12px" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Activity List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3498DB]">
                      <Image
                        src="/Likai-logo.svg"
                        alt="LikAI"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Water quality check completed
                      </div>
                      <div className="text-xs text-gray-500">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7F50]">
                      <span className="text-xs font-bold text-white">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Alert: Temperature variance detected
                      </div>
                      <div className="text-xs text-gray-500">
                        15 minutes ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-4 -left-4 z-20 flex h-12 w-12 -rotate-12 transform items-center justify-center rounded-lg bg-gradient-to-br from-[#3498DB] to-[#2980B9] shadow-lg">
              <span className="font-bold text-white">AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
