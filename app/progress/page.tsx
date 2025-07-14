import { ProgressTracker } from "@/components/shared/progress-tracker";

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

export default function ProgressPage() {
  return <ProgressTracker farmProfile={farmProfile} />;
}
