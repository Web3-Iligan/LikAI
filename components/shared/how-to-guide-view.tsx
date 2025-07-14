"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Bot, Lightbulb, Loader2, Send, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BiosecurityTask {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending";
  category: string;
  estimatedCost: string;
  timeframe: string;
  adaptationReason?: string;
  icon: any;
}

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface HowToGuideViewProps {
  task: BiosecurityTask;
  onBack: () => void;
}

export function HowToGuideView({ task, onBack }: HowToGuideViewProps) {
  const [guideContent, setGuideContent] = useState<string | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Generate the how-to guide when the component mounts
    const generateGuide = async () => {
      setLoadingGuide(true);
      try {
        const response = await fetch("/api/generate-how-to", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        });
        if (!response.ok) {
          throw new Error("Failed to generate guide");
        }
        const data = await response.json();
        setGuideContent(data.guide);
        setMessages([
          {
            id: "initial-bot",
            type: "bot",
            content: `Hello! I've generated a step-by-step guide for "${task.title}". Feel free to ask me any questions about it.`,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error generating guide:", error);
        setGuideContent(
          "Failed to generate the how-to guide. Please try again later."
        );
      } finally {
        setLoadingGuide(false);
      }
    };
    generateGuide();
  }, [task]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      const response = await fetch("/api/chat-how-to", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          guideContext: guideContent, // Provide the generated guide as context
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to stream chat response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponseContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        botResponseContent += chunk;
        // Update UI in real-time as chunks arrive
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (
            lastMessage &&
            lastMessage.type === "bot" &&
            lastMessage.id === "streaming-bot-message"
          ) {
            return prev.map(msg =>
              msg.id === "streaming-bot-message"
                ? { ...msg, content: botResponseContent }
                : msg
            );
          } else {
            return [
              ...prev,
              {
                id: "streaming-bot-message", // Temporary ID for streaming message
                type: "bot",
                content: botResponseContent,
                timestamp: new Date(),
              },
            ];
          }
        });
      }

      // Finalize the message with a permanent ID
      setMessages(prev =>
        prev.map(msg =>
          msg.id === "streaming-bot-message"
            ? { ...msg, id: Date.now().toString(), timestamp: new Date() }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          content: "Sorry, I couldn't process that. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dynamic Plan
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            How-To Guide: {task.title}
          </CardTitle>
          <CardDescription>
            AI-generated steps and interactive chat for this task.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* How-To Guide Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Guide
            </h3>
            <Card className="flex min-h-[300px] flex-col">
              <ScrollArea className="flex-1 p-4">
                {loadingGuide ? (
                  <div className="flex h-full flex-col items-center justify-center text-gray-500">
                    <Loader2 className="mb-3 h-8 w-8 animate-spin" />
                    <p>Generating how-to guide...</p>
                  </div>
                ) : guideContent ? (
                  <div
                    className="prose max-w-none leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: guideContent.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <div className="py-10 text-center text-gray-500">
                    No guide available.
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Chat with AI Coach
            </h3>
            <Card className="flex h-[400px] flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "bot" && (
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                        <div className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      {message.type === "user" && (
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="rounded-lg bg-gray-100 p-3">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
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
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Ask about this guide..."
                    onKeyPress={e =>
                      e.key === "Enter" && handleSendMessage(inputMessage)
                    }
                    className="flex-1"
                    disabled={isTyping || loadingGuide || !guideContent}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputMessage)}
                    disabled={
                      !inputMessage.trim() ||
                      isTyping ||
                      loadingGuide ||
                      !guideContent
                    }
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
  );
}
