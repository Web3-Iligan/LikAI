import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Define the schema for a single biosecurity task
const biosecurityTaskSchema = z.object({
  title: z.string().describe("Concise title of the task"),
  description: z.string().describe("Detailed description of the task"),
  priority: z.enum(["critical", "high", "medium", "low"]).describe("Priority level of the task"),
  category: z.string().describe("Category of the task (e.g., Infrastructure, Access Control, Water Management)"),
  estimatedCost: z
    .string()
    .describe("Estimated cost range for the task (e.g., '₱500-1,000', '₱0 (existing equipment)')"),
  timeframe: z.string().describe("Estimated timeframe for completion (e.g., 'Today', 'Next 7 days', 'Daily')"),
  adaptationReason: z.string().optional().describe("Reason why this task is adapted or recommended by AI"),
})

// Define the schema for the array of tasks
const biosecurityPlanSchema = z.array(biosecurityTaskSchema)

export async function POST(req: Request) {
  try {
    const formData = await req.json()

    if (!formData) {
      return new Response("Farm assessment data is required", { status: 400 })
    }

    // Fallback when no API key is set
    if (!process.env.OPENAI_API_KEY) {
      const fallbackPlan = [
        {
          title: "Demo: Inspect Pond Dykes",
          description: "Perform a basic inspection of pond dykes for any visible damage or erosion.",
          priority: "critical",
          category: "Infrastructure",
          estimatedCost: "₱0",
          timeframe: "Immediate",
          adaptationReason: "Demo mode: Basic task for all farms.",
        },
        {
          title: "Demo: Basic Water Quality Check",
          description: "Check pH and DO levels using existing test kits.",
          priority: "high",
          category: "Water Management",
          estimatedCost: "₱0",
          timeframe: "Daily",
          adaptationReason: "Demo mode: Essential for all farms.",
        },
        {
          title: "Demo: Implement Footbath",
          description: "Set up a simple footbath at farm entry using local materials.",
          priority: "medium",
          category: "Access Control",
          estimatedCost: "₱300-800",
          timeframe: "Within 3 days",
          adaptationReason: "Demo mode: Recommended for basic biosecurity.",
        },
      ]

      return new Response(JSON.stringify({ tasks: fallbackPlan }), {
        headers: { "Content-Type": "application/json" },
      })
    }

    const prompt = `Based on the following farm profile and current biosecurity practices, generate a dynamic, prioritized biosecurity action plan.
    
    Farm Profile:
    Farm Name: ${formData.farmName}
    Location: ${formData.location}
    Primary Shrimp Species: ${formData.primarySpecies}
    Farm Type: ${formData.farmType}
    Farm Size: ${formData.farmSize}
    New/Existing Farmer: ${formData.isNewFarmer}
    ${formData.existingPondYears ? `Years in use: ${formData.existingPondYears}` : ""}
    Water Source: ${formData.waterSource.join(", ")}
    Initial Biosecurity Budget: ${formData.initialBudget}
    Electricity Access: ${formData.hasElectricity}
    Top Concerns: ${formData.topConcerns.join(", ")}

    ${
      formData.isNewFarmer === "Existing Pond"
        ? `
    Current Biosecurity & Management Practices:
    Pond Drain & Sun-dry: ${formData.pondDrainSunDry}
    Remove Muck Layer: ${formData.removeMuckLayer}
    Disinfect Pond: ${formData.disinfectPond}
    Filter Incoming Water: ${formData.filterIncomingWater}
    Separate Reservoir: ${formData.separateReservoir}
    Water Monitoring Frequency: ${formData.waterMonitoringFrequency}
    PL Source: ${formData.plSource}
    Acclimate PLs: ${formData.acclimatePLs}
    Quarantine PLs: ${formData.quarantinePLs}
    Has Fencing: ${formData.hasFencing}
    Use Footbaths: ${formData.useFootbaths}
    Equipment Sharing: ${formData.equipmentSharing}
    Visitor Management: ${formData.visitorManagement}
    Waste Disposal: ${formData.wasteDisposal}
    Control Feeding: ${formData.controlFeeding}
    Health Monitoring: ${formData.healthMonitoring}
    Keep Records: ${formData.keepRecords}
    `
        : ""
    }

    Generate a list of 5-8 actionable biosecurity tasks. For each task, provide a concise title, a detailed description, a priority (critical, high, medium, low), a category, an estimated cost (e.g., '₱500-1,000' or '₱0 (existing equipment)'), a timeframe (e.g., 'Today', 'Next 7 days', 'Daily'), and an 'adaptationReason' explaining why this task is relevant based on the provided farm data. Ensure the estimated costs are realistic for the Philippines context and align with the initial budget if possible. Prioritize tasks that address the farmer's top concerns and identified gaps in current practices.
    `

    const { object: aiGeneratedPlan } = await generateObject({
      model: openai("gpt-4o"),
      schema: biosecurityPlanSchema,
      prompt: prompt,
    })

    return new Response(JSON.stringify({ tasks: aiGeneratedPlan }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating assessment plan:", error)
    return new Response("Failed to generate assessment plan", { status: 500 })
  }
}
