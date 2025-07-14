import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FarmAssessmentForm } from "@/components/assessment/farm-assessment-form";
import { ClipboardList } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />
            Farm Biosecurity Assessment
          </CardTitle>
          <CardDescription>
            Please answer the questions below to help us generate a tailored
            biosecurity action plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FarmAssessmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
