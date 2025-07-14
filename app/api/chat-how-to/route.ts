import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages, guideContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages are required", { status: 400 });
    }

    // Fallback when no API key is set
    if (!process.env.OPENAI_API_KEY) {
      const reply = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Demo mode: AI chat is disabled because OPENAI_API_KEY is not set. " +
          "Please configure the key to enable live answers.",
      };
      return new Response(JSON.stringify(reply), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a LikAI assistant specialized in providing detailed guidance on aquaculture how-to guides. Your goal is to help the user understand and implement their specific how-to guide.
    
    Here is the current how-to guide context:
    ${guideContext}
    
    Answer questions directly related to the how-to guide, provide clarifications, suggest alternative approaches, or offer additional tips. Keep your responses concise and actionable. If a question is outside the scope of the provided guide or general aquaculture practices, gently redirect the user to focus on the guide.`;

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages,
    });

    return result.toDataStreamResponse(); // Ensure this returns a stream
  } catch (error) {
    console.error("Error streaming chat for how-to guide:", error);
    return new Response("Failed to stream chat for how-to guide", {
      status: 500,
    });
  }
}
