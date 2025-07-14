"use client";

import { CalendarDays, CheckCircle, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Changed Calendar to CalendarDays

interface ProgressTrackerProps {
  farmProfile: {
    completedTasks: number;
    totalTasks: number;
    currentCycle?: number;
  };
}

export function ProgressTracker({ farmProfile }: ProgressTrackerProps) {
  const { completedTasks, totalTasks, currentCycle } = farmProfile;
  const percentage = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  const remaining = totalTasks - completedTasks;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-blue-600" />
          Plan Progress Overview
        </CardTitle>
        <CardDescription>
          Track completion of your dynamic biosecurity & GAqP action plan tasks
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm text-gray-600">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
              {completedTasks}
              <CheckCircle className="h-5 w-5" />
            </p>
            <p className="text-sm text-green-700">Tasks Completed</p>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">{remaining}</p>
            <p className="text-sm text-yellow-700">Tasks Remaining</p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-600">
              {currentCycle ?? "-"}
              <CalendarDays className="h-5 w-5" />{" "}
              {/* Changed icon to CalendarDays */}
            </p>
            <p className="text-sm text-blue-700">Current Production Cycle</p>
          </div>
        </div>

        {/* Badge summary */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">
            {completedTasks}/{totalTasks} tasks done
          </Badge>
          <Badge variant={percentage >= 75 ? "default" : "secondary"}>
            {percentage >= 75 ? "Great progress!" : "Keep going!"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
