import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

export default function CalendarPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-orange-600" />
          Farm Calendar
        </CardTitle>
        <CardDescription>Manage your biosecurity schedule, tasks, and events.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Your farm calendar will be displayed here.</p>
        <div className="h-64 bg-muted/50 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Calendar view coming soon!
        </div>
      </CardContent>
    </Card>
  )
}
