import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fish, Shield, Zap, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-3xl text-center shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Fish className="h-9 w-9 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-gray-900">AquaSecure AI</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Dynamic Biosecurity Coaching for Aquaculture Excellence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-md text-gray-700 max-w-xl mx-auto">
            Empower your shrimp farm with AI-driven insights, personalized action plans, and real-time risk assessments.
            AquaSecure AI helps you optimize operations, prevent disease, and maximize profitability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Smart Biosecurity</h3>
              <p className="text-sm text-gray-600">AI-adapted plans for your unique farm.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Zap className="h-8 w-8 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">Dynamic Coaching</h3>
              <p className="text-sm text-gray-600">Instant guidance and troubleshooting.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-gray-800">Performance Analytics</h3>
              <p className="text-sm text-gray-600">Track progress and optimize resources.</p>
            </div>
          </div>

          <Link href="/auth" passHref>
            <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
