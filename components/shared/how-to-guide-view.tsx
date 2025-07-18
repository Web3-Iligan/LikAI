"use client";

import { useEffect, useRef, useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  Bot,
  CheckCircle,
  Clock,
  DollarSign,
  HelpCircle,
  Image as ImageIcon,
  Lightbulb,
  Play,
  Send,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

// Enhanced task data with How-To information
const getTaskHowToData = (taskId: string, taskCategory: string) => {
  const howToData: { [key: string]: any } = {
    "5": {
      // Set up visitor disinfection
      whyImportant:
        "Every person and vehicle entering your farm is a potential carrier of diseases like WSSV. The GAqP manual requires disinfection points as a critical biosecurity measure to kill these pathogens before they can reach your ponds. This simple step protects your entire investment.",
      steps: [
        {
          id: "step-1",
          title: "Prepare a Footbath",
          description:
            "Find or build a shallow basin and place it at the main farm entrance.",
          completed: false,
        },
        {
          id: "step-2",
          title: "Prepare a Tire Bath",
          description:
            "Designate an area at the vehicle entrance that can be filled with disinfectant solution (a shallow concrete dip is ideal).",
          completed: false,
        },
        {
          id: "step-3",
          title: "Mix Disinfectant",
          description:
            "Use a government-approved disinfectant and mix it with water according to the manufacturer's instructions.",
          completed: false,
        },
        {
          id: "step-4",
          title: "Post Clear Signs",
          description:
            "Create and install signs that clearly instruct all visitors and personnel to step in the footbath and drive through the tire bath.",
          completed: false,
        },
      ],
      smartTip:
        "For a low-cost but effective footbath, you can use a durable plastic basin with a sponge or foam mat soaked in disinfectant. For your tire bath, ensure the solution is deep enough to cover the entire width of a tire. Remember to change the disinfectant solution regularly, especially after heavy use or rain.",
      timeEstimate: "1-2 hours",
      costEstimate: "Low Cost",
      module: "Farm Access Control",
    },
    "1": {
      // Check water quality in Pond 3
      whyImportant:
        "Water quality is the foundation of healthy shrimp culture. Poor dissolved oxygen levels can lead to stress, disease susceptibility, and massive die-offs. The GAqP manual emphasizes that maintaining proper water parameters is your first line of defense against production losses.",
      steps: [
        {
          id: "step-1",
          title: "Gather Testing Equipment",
          description:
            "Get your dissolved oxygen meter, pH tester, and water sampling containers.",
          completed: false,
        },
        {
          id: "step-2",
          title: "Test Multiple Points",
          description:
            "Test water at different depths and locations in the pond - near aerators, corners, and center.",
          completed: false,
        },
        {
          id: "step-3",
          title: "Record Readings",
          description:
            "Document DO levels, pH, temperature, and time of testing in your farm logbook.",
          completed: false,
        },
        {
          id: "step-4",
          title: "Compare to Standards",
          description:
            "Check if readings meet GAqP standards (DO > 5mg/L, pH 7.5-8.5).",
          completed: false,
        },
      ],
      smartTip:
        "Test water quality during early morning (5-6 AM) when oxygen levels are typically at their lowest. This gives you the most critical reading. If morning DO levels are good, your pond is likely healthy throughout the day.",
      timeEstimate: "30 minutes",
      costEstimate: "₱0 (existing equipment)",
      module: "Pond & Water Care",
    },
    "4": {
      // Inspect pond dykes for damage
      whyImportant:
        "Damaged pond dykes can lead to water loss, contamination from external sources, and complete pond failure. With typhoon season approaching, structural integrity is crucial for maintaining your biosecurity barriers and preventing costly repairs.",
      steps: [
        {
          id: "step-1",
          title: "Visual Inspection",
          description:
            "Walk around each pond dyke looking for cracks, erosion, or soft spots.",
          completed: false,
        },
        {
          id: "step-2",
          title: "Check Water Level",
          description:
            "Look for unusual water level drops that might indicate leaks.",
          completed: false,
        },
        {
          id: "step-3",
          title: "Test Dyke Stability",
          description:
            "Gently press on suspicious areas to check for soft or unstable sections.",
          completed: false,
        },
        {
          id: "step-4",
          title: "Document and Plan Repairs",
          description:
            "Mark damaged areas and prioritize repairs based on severity.",
          completed: false,
        },
      ],
      smartTip:
        "Inspect dykes after heavy rains when damage is most visible. Small cracks can be sealed with clay or bentonite, but larger damage may require professional repair. Don't wait - small problems become expensive disasters.",
      timeEstimate: "2-3 hours",
      costEstimate: "₱200-500",
      module: "Farm Setup Basics",
    },
  };

  // Return specific data if available, otherwise return generic template
  return (
    howToData[taskId] || {
      whyImportant: `This task is important for maintaining GAqP standards in ${taskCategory}. Following proper procedures helps prevent disease outbreaks and ensures your farm operates efficiently according to industry best practices.`,
      steps: [
        {
          id: "step-1",
          title: "Prepare and Plan",
          description:
            "Gather necessary materials and plan your approach to completing this task.",
          completed: false,
        },
        {
          id: "step-2",
          title: "Execute the Task",
          description:
            "Follow GAqP guidelines to complete the required actions.",
          completed: false,
        },
        {
          id: "step-3",
          title: "Verify and Document",
          description:
            "Check your work and record completion in your farm logbook.",
          completed: false,
        },
      ],
      smartTip:
        "Always follow GAqP best practices and document your actions. When in doubt, consult with agricultural extension officers or experienced farmers in your area.",
      timeEstimate: "Variable",
      costEstimate: "As specified",
      module: taskCategory,
    }
  );
};

export function HowToGuideView({ task, onBack }: HowToGuideViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>(
    {}
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const taskData = getTaskHowToData(task.id, task.category);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize chat with welcome message
    setMessages([
      {
        id: "initial-bot",
        type: "bot",
        content: `Hello! I'm here to help you with "${task.title}". This guide will walk you through each step. Feel free to ask me any questions!`,
        timestamp: new Date(),
      },
    ]);
  }, [task]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStepCheck = (stepId: string, checked: boolean) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: checked,
    }));
  };

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

      const contextMessage = `I'm helping with the task: "${task.title}" (${task.category}). 
      
      Task context: ${task.description}
      
      Why it's important: ${taskData.whyImportant}
      
      Steps involved: ${taskData.steps.map((step: any, index: number) => `${index + 1}. ${step.title}: ${step.description}`).join("\n")}
      
      Smart tip: ${taskData.smartTip}
      
      Please provide helpful, practical advice for GAqP compliance and shrimp farming best practices.`;

      const response = await fetch("/api/chat-how-to", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: contextMessage },
            ...chatHistory,
          ],
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
                id: "streaming-bot-message",
                type: "bot",
                content: botResponseContent,
                timestamp: new Date(),
              },
            ];
          }
        });
      }

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

  const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = taskData.steps.length;
  const progressPercentage =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to My GAqP Plan
      </Button>

      {/* 1. Title and Goal */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                <task.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {task.title}
                </CardTitle>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{taskData.timeEstimate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{taskData.costEstimate}</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-white">
              {taskData.module}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Why It's Important */}
      <Card className="border-l-4 border-l-amber-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Why It's Important
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-gray-700">
            {taskData.whyImportant}
          </p>
        </CardContent>
      </Card>

      {/* 3. What to Do - Checklist */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              What to Do
            </CardTitle>
            <div className="text-sm text-gray-600">
              {completedSteps} of {totalSteps} steps completed (
              {progressPercentage}%)
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskData.steps.map((step: any) => (
              <div
                key={step.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
              >
                <Checkbox
                  id={step.id}
                  checked={checkedSteps[step.id] || false}
                  onCheckedChange={checked =>
                    handleStepCheck(step.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={step.id}
                    className={`block cursor-pointer font-medium ${
                      checkedSteps[step.id]
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </label>
                  <p
                    className={`mt-1 text-sm ${
                      checkedSteps[step.id] ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. LikAI's Smart Tip */}
      <Card className="border-l-4 border-l-blue-400 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            LikAI's Smart Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-gray-700">{taskData.smartTip}</p>
        </CardContent>
      </Card>

      {/* 5. Visual How-To Resources */}
      <Card className="border-l-4 border-l-purple-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ImageIcon className="h-5 w-5 text-purple-500" />
            Visual How-To Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex flex-1 items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Watch How-To Video (1 min)
            </Button>
            <Button
              variant="outline"
              className="flex flex-1 items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              View Photo Guide
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            💡 Visual guides help you see exactly how to implement GAqP
            standards on your farm.
          </p>
        </CardContent>
      </Card>

      {/* 6. Integrated Help - AI Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-green-500" />
            Need Help? Ask Gabay AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-64 rounded-md border p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "bot" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Bot className="h-4 w-4 text-green-600" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-green-600 text-white"
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
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Bot className="h-4 w-4 text-green-600" />
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

            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask about this task... (e.g., 'What kind of disinfectant is best for a footbath?')"
                onKeyPress={e =>
                  e.key === "Enter" && handleSendMessage(inputMessage)
                }
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
