import { AlertCircle, MessageCircle, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface QuickAction {
  label: string;
  question: string;
}

export function InteractiveChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your LikAI Coach, powered by AI and trained on GAqP (Good Aquaculture Practices) manuals. 🦐\n\nI can help you with:\n• Water quality management\n• Feeding schedules and practices\n• Disease prevention protocols\n• Pond preparation techniques\n• Biosecurity best practices\n• GAqP certification guidance\n\nWhat would you like to know about your shrimp farm?",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>(Date.now().toString());

  // Rate limiting settings
  const MAX_QUESTIONS_PER_SESSION = 20;
  const MAX_QUESTIONS_PER_MINUTE = 3;
  const [recentQuestions, setRecentQuestions] = useState<number[]>([]);

  // Quick action suggestions - farm-related only
  const quickActions: QuickAction[] = [
    {
      label: "💧 Water Quality Tips",
      question:
        "What are the optimal water quality parameters for shrimp farming?",
    },
    {
      label: "🍽️ Feeding Best Practices",
      question: "What is the recommended feeding schedule for shrimp?",
    },
    {
      label: "🛡️ Disease Prevention",
      question: "How can I prevent disease outbreaks in my shrimp farm?",
    },
    {
      label: "🏗️ Pond Preparation",
      question:
        "What are the steps for proper pond preparation before stocking?",
    },
    {
      label: "📋 GAqP Certification",
      question: "What are the requirements for GAqP certification?",
    },
    {
      label: "🦐 Stock Management",
      question: "What is the recommended stocking density for shrimp?",
    },
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check rate limiting
  const checkRateLimit = (): { allowed: boolean; message?: string } => {
    // Check session limit
    if (questionCount >= MAX_QUESTIONS_PER_SESSION) {
      return {
        allowed: false,
        message: `You've reached the limit of ${MAX_QUESTIONS_PER_SESSION} questions per session. Please refresh the page to start a new session or contact support for extended access.`,
      };
    }

    // Check per-minute limit
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentQuestionCount = recentQuestions.filter(
      (time) => time > oneMinuteAgo
    ).length;

    if (recentQuestionCount >= MAX_QUESTIONS_PER_MINUTE) {
      return {
        allowed: false,
        message: `Please wait a moment. You can ask up to ${MAX_QUESTIONS_PER_MINUTE} questions per minute to ensure fair usage for all farmers.`,
      };
    }

    return { allowed: true };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check rate limit
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setRateLimitWarning(rateLimitCheck.message || "Rate limit exceeded");
      return;
    }

    // Clear any previous warnings
    setRateLimitWarning(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Update rate limiting counters
    setQuestionCount((prev) => prev + 1);
    setRecentQuestions((prev) => [...prev, Date.now()]);

    try {
      // Call backend AI API
      const AI_API_URL =
        (window as any).ENV?.AI_API_URL || "http://localhost:8000";

      const response = await fetch(`${AI_API_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputMessage,
          session_id: sessionId.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const botResponse: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error querying AI:", error);

      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content:
          "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment. If the problem persists, please contact support.",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputMessage(action.question);
    // Auto-send the question
    setTimeout(() => {
      const sendBtn = document.querySelector(
        "[data-send-button]"
      ) as HTMLButtonElement;
      if (sendBtn) sendBtn.click();
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-[#3498DB]" />
          <h1 className="text-2xl font-bold text-gray-900">LikAI Coach</h1>
          <Badge className="bg-green-100 text-green-800">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>
        </div>
        <div className="text-sm text-gray-600">
          {questionCount}/{MAX_QUESTIONS_PER_SESSION} questions used
        </div>
      </div>

      {/* Rate Limit Warning */}
      {rateLimitWarning && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{rateLimitWarning}</AlertDescription>
        </Alert>
      )}

      {/* Chat Interface */}
      <div className="relative">
        <div className="rounded-xl bg-gradient-to-br from-[#3498DB]/10 to-blue-50 p-6 shadow-lg">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-4 py-3 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/20">
                  <div className="text-lg">🦐</div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                </div>
                <div>
                  <div className="text-sm font-semibold">LikAI Coach</div>
                  <div className="flex items-center text-xs text-blue-100">
                    <div className="mr-1 h-2 w-2 rounded-full bg-green-400"></div>
                    Online • GAqP Expert
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="border-b bg-blue-50 px-4 py-2">
              <div className="flex items-center space-x-2 text-xs text-blue-700">
                <AlertCircle className="h-3 w-3" />
                <span>
                  Responses are generated using AI trained on official GAqP
                  manuals. Always verify critical decisions with aquaculture
                  experts.
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[32rem] space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => {
                const showTimestamp =
                  index === 0 ||
                  (messages[index - 1] &&
                    Math.abs(
                      message.timestamp.getTime() -
                        messages[index - 1].timestamp.getTime()
                    ) > 300000); // 5 minutes

                return (
                  <div key={message.id}>
                    {showTimestamp && (
                      <div className="mb-2 text-center text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                    <div
                      className={`flex items-start space-x-3 ${
                        message.type === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          message.type === "user"
                            ? "bg-[#FF7F50]"
                            : message.isError
                            ? "bg-red-500"
                            : "bg-[#3498DB]"
                        }`}
                      >
                        <span className="text-sm font-bold text-white">
                          {message.type === "user" ? "👤" : "🦐"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`max-w-xl rounded-lg px-4 py-3 ${
                            message.type === "user"
                              ? "ml-auto bg-[#FF7F50] text-white"
                              : message.isError
                              ? "bg-red-50 text-red-900"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3498DB]">
                    <span className="text-sm font-bold text-white">🦐</span>
                  </div>
                  <div className="flex-1">
                    <div className="max-w-xs rounded-lg bg-gray-100 px-4 py-3">
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
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="border-t bg-gray-50 px-4 py-3">
              <div className="mb-3 text-xs font-medium text-gray-600">
                Quick questions:
              </div>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex min-h-[48px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-[#3498DB] hover:bg-blue-50 hover:shadow-md active:scale-95"
                    onClick={() => handleQuickAction(action)}
                    disabled={
                      isTyping || questionCount >= MAX_QUESTIONS_PER_SESSION
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
              <div className="flex items-end space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about water quality, feeding, biosecurity, GAqP practices..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && !isTyping && handleSendMessage()
                  }
                  disabled={
                    isTyping || questionCount >= MAX_QUESTIONS_PER_SESSION
                  }
                  className="min-h-[48px] flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#3498DB] focus:outline-none focus:ring-1 focus:ring-[#3498DB] disabled:bg-gray-100"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={
                    !inputMessage.trim() ||
                    isTyping ||
                    questionCount >= MAX_QUESTIONS_PER_SESSION
                  }
                  data-send-button
                  className="flex min-h-[48px] items-center bg-[#FF7F50] px-4 py-3 text-sm hover:bg-[#E6723C] disabled:bg-gray-300"
                >
                  <Send className="mr-1 h-4 w-4" />
                  Send
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {isTyping
                  ? "LikAI Coach is thinking..."
                  : inputMessage.trim()
                  ? "Press Enter or click Send to ask your question"
                  : "Only questions related to shrimp farming will be answered"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
