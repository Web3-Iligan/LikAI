import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          Farm Analytics
        </CardTitle>
        <CardDescription>Detailed performance and trend analysis for your farm.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Analytics data will be displayed here.</p>
        <div className="h-64 bg-muted/50 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Charts and graphs coming soon!
        </div>
      </CardContent>
    </Card>
  )
}
