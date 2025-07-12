import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-600" />
          Settings
        </CardTitle>
        <CardDescription>Manage your account, farm profile, and application preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Configure your AquaSecure AI experience.</p>
        <div className="h-64 bg-muted/50 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Settings options coming soon!
        </div>
      </CardContent>
    </Card>
  )
}
