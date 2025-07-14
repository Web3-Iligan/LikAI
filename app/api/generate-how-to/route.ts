import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    if (!task) {
      return new Response("Task details are required", { status: 400 });
    }

    // Fallback when no API key is set
    if (!process.env.OPENAI_API_KEY) {
      const fallbackGuide = `
        <p><strong>Auto-generated demo guide for:</strong> ${task.title}</p>
        <p class="mb-2"><strong>Description:</strong> ${task.description}</p>
        <h4 class="text-lg font-semibold mt-4 mb-2">Sample Steps:</h4>
        <ol class="list-decimal list-inside space-y-1">
          <li>Identify the specific area or equipment for ${task.title.toLowerCase()}.</li>
          <li>Gather all necessary tools and materials as per ${task.category.toLowerCase()} guidelines.</li>
          <li>Follow standard safety procedures for ${task.category.toLowerCase()} tasks.</li>
          <li>Perform the inspection/action carefully, documenting any findings.</li>
          <li>Report completion and any issues to your supervisor.</li>
        </ol>
        <p class="mt-4 text-sm text-gray-600 italic">
          (Set OPENAI_API_KEY to get full AI-generated how-to guides.)
        </p>
      `;
      return new Response(JSON.stringify({ guide: fallbackGuide }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `Generate a detailed, step-by-step how-to guide for the following aquaculture task. Focus on practical, actionable steps, including materials, procedures, and tips.
    
    Task Title: ${task.title}
    Description: ${task.description}
    Category: ${task.category}
    Estimated Cost: ${task.estimatedCost}
    Timeframe: ${task.timeframe}
    
    Provide the guide in a clear, numbered list format. Include sections for "Materials Needed", "Step-by-Step Procedure", and "Tips for Success". Use HTML formatting for readability.`;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    });

    return new Response(JSON.stringify({ guide: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating how-to guide:", error);
    return new Response("Failed to generate how-to guide", { status: 500 });
  }
}
