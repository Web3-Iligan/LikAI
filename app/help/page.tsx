import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          Help & Support
        </CardTitle>
        <CardDescription>Find answers to your questions or contact our support team.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">We're here to help you succeed!</p>
        <div className="h-64 bg-muted/50 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Support resources coming soon!
        </div>
      </CardContent>
    </Card>
  )
}
