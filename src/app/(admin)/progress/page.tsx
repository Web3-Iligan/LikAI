<<<<<<< HEAD:app/plan/page.tsx
import { BiosecurityPlan } from "@/components/plan/biosecurity-plan";
import { Suspense } from "react";

=======
import { ProgressTracker } from "@/features/shared/progress-tracker";
>>>>>>> main:src/app/(admin)/progress/page.tsx

// Dummy farm profile for demonstration
const farmProfile = {
  name: "Sunrise Shrimp Farm",
  type: "Intensive Shrimp Culture",
  species: "Litopenaeus vannamei",
  size: "5 hectares",
  location: "Bataan, Philippines",
  currentCycle: 3,
  riskLevel: "medium" as const,
  completedTasks: 12,
  totalTasks: 18,
};

<<<<<<< HEAD:app/plan/page.tsx
export default function PlanPage() {
  return <Suspense>
    <BiosecurityPlan farmProfile={farmProfile} />;
  </Suspense>
=======
export default function ProgressPage() {
  return <ProgressTracker farmProfile={farmProfile} />;
>>>>>>> main:src/app/(admin)/progress/page.tsx
}
