import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { riskFactor } = await req.json()

    if (!riskFactor) {
      return new Response("Risk factor details are required", { status: 400 })
    }

    // ---------- NEW: fallback when no key ----------
    if (!process.env.OPENAI_API_KEY) {
      const fallbackSteps = riskFactor.recommendations
        .map((step: string, idx: number) => `${idx + 1}. ${step}`)
        .join("<br/>")

      const fallbackPlan = `
      <p><strong>Auto-generated demo plan for:</strong> ${riskFactor.name}</p>
      <ol class="list-decimal list-inside space-y-1 mt-2">${fallbackSteps}</ol>
      <p class="mt-4 text-sm text-gray-600 italic">
        (Set OPENAI_API_KEY to get full AI-generated plans.)
      </p>`

      return new Response(JSON.stringify({ plan: fallbackPlan }), {
        headers: { "Content-Type": "application/json" },
      })
    }
    // ---------- END fallback ----------

    const prompt = `Generate a detailed, step-by-step action plan for the following aquaculture risk factor. Focus on practical, actionable steps.
    
    Risk Factor Name: ${riskFactor.name}
    Description: ${riskFactor.description}
    AI Recommendations: ${riskFactor.recommendations.join(", ")}
    
    Provide the plan in a clear, numbered list format. Include estimated timeframes and potential resources needed for each step. Also, include a concluding remark encouraging the user.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    return new Response(JSON.stringify({ plan: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating plan:", error)
    return new Response("Failed to generate plan", { status: 500 })
  }
}
