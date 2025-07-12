"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, MessageCircle, Send, Bot, User, Loader2 } from "lucide-react"

interface RiskFactor {
  id: string
  name: string
  description: string
  recommendations: string[]
  // Add other properties if needed for context
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface DetailedActionPlanProps {
  riskFactor: RiskFactor
  onBack: () => void
}

export function DetailedActionPlan({ riskFactor, onBack }: DetailedActionPlanProps) {
  const [planContent, setPlanContent] = useState<string | null>(null)
  const [loadingPlan, setLoadingPlan] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Generate the detailed plan when the component mounts
    const generatePlan = async () => {
      setLoadingPlan(true)
      try {
        const response = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riskFactor }),
        })
        if (!response.ok) {
          throw new Error("Failed to generate plan")
        }
        const data = await response.json()
        setPlanContent(data.plan)
        setMessages([
          {
            id: "initial-bot",
            type: "bot",
            content: `Hello! I've generated a detailed action plan for "${riskFactor.name}". Feel free to ask me any questions about it.`,
            timestamp: new Date(),
          },
        ])
      } catch (error) {
        console.error("Error generating plan:", error)
        setPlanContent("Failed to generate the detailed action plan. Please try again later.")
      } finally {
        setLoadingPlan(false)
      }
    }
    generatePlan()
  }, [riskFactor])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      const response = await fetch("/api/chat-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          planContext: planContent, // Provide the generated plan as context
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error("Failed to stream chat response")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let botResponseContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        botResponseContent += chunk
        // Optionally update UI in real-time as chunks arrive
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage && lastMessage.type === "bot" && lastMessage.id === "streaming-bot-message") {
            return prev.map((msg) =>
              msg.id === "streaming-bot-message" ? { ...msg, content: botResponseContent } : msg,
            )
          } else {
            return [
              ...prev,
              {
                id: "streaming-bot-message", // Temporary ID for streaming message
                type: "bot",
                content: botResponseContent,
                timestamp: new Date(),
              },
            ]
          }
        })
      }

      // Finalize the message with a permanent ID
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "streaming-bot-message" ? { ...msg, id: Date.now().toString(), timestamp: new Date() } : msg,
        ),
      )
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          content: "Sorry, I couldn't process that. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
        <ArrowLeft className="h-4 w-4" /> Back to Risk Assessment
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Detailed Action Plan: {riskFactor.name}
          </CardTitle>
          <CardDescription>AI-generated steps and interactive chat for this risk factor.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Plan Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Plan</h3>
            <Card className="min-h-[300px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {loadingPlan ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Loader2 className="h-8 w-8 animate-spin mb-3" />
                    <p>Generating detailed plan...</p>
                  </div>
                ) : planContent ? (
                  <div
                    className="prose max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: planContent.replace(/\n/g, "<br/>") }}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-10">No plan available.</div>
                )}
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Chat with AI Coach</h3>
            <Card className="h-[400px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>

                      {message.type === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about this plan..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                    className="flex-1"
                    disabled={isTyping || loadingPlan || !planContent}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isTyping || loadingPlan || !planContent}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
