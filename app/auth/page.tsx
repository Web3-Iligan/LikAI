"use client"

import Link from "next/link"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle authentication here (e.g., API call, NextAuth.js)
    // For this demo, we'll just redirect to the dashboard.
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your AquaSecure AI account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </form>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            (For demo purposes, clicking Login will proceed to the dashboard.)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
