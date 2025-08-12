import { ClipboardList } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FarmAssessmentForm } from "@/features/assessment/farm-assessment-form";

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
