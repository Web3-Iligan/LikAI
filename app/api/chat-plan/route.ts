import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages, planContext } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return new Response("Messages are required", { status: 400 })
  }

  // ---------- NEW: fallback ----------
  if (!process.env.OPENAI_API_KEY) {
    const reply = {
      id: Date.now().toString(),
      type: "bot",
      content:
        "Demo mode: AI chat is disabled because OPENAI_API_KEY is not set. " +
        "Please configure the key to enable live answers.",
    }
    return new Response(JSON.stringify(reply), {
      headers: { "Content-Type": "application/json" },
    })
  }
  // ---------- END fallback ----------

  const systemPrompt = `You are an AquaSecure AI assistant specialized in providing detailed guidance on aquaculture biosecurity action plans. Your goal is to help the user understand and implement their specific action plan.
    
    Here is the current action plan context:
    ${planContext}
    
    Answer questions directly related to the action plan, provide clarifications, suggest alternative approaches, or offer additional tips. Keep your responses concise and actionable. If a question is outside the scope of the provided plan or general aquaculture biosecurity, gently redirect the user to focus on the plan.`

  const result = await streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages: messages,
  })

  return result.to
}
