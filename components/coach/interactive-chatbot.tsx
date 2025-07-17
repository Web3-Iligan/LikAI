"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  category?: "how-to" | "troubleshooting" | "cost-benefit" | "general";
}

interface QuickAction {
  label: string;
  category: "how-to" | "troubleshooting" | "cost-benefit";
}

export function InteractiveChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your LikAI Coach. 🦐 I can help you with step-by-step guidance, troubleshooting, and cost-benefit analysis for your GAqP biosecurity plan. What would you like to know?",
      timestamp: new Date(),
      category: "general",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<string | null>(
    "🚨 pH Alert: Pond 3 trending high (8.2)"
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick action suggestions with enhanced mobile-friendly design
  const quickActions: QuickAction[] = [
    { label: "💧 Water quality tips", category: "troubleshooting" },
    { label: "🍽️ Feeding schedule", category: "how-to" },
    { label: "🛡️ Disease prevention", category: "troubleshooting" },
    { label: "💰 Cost analysis", category: "cost-benefit" },
    { label: "🚨 Emergency help", category: "troubleshooting" },
    { label: "📋 Best practices", category: "how-to" },
  ];

  // Simulate real-time alerts
  useEffect(() => {
    const alerts = [
      "🚨 pH Alert: Pond 3 trending high (8.2)",
      "⚠️ Temperature variance detected in Pond 2",
      "🌡️ Optimal feeding window approaching",
      null, // No alert
    ];

    const interval = setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setCurrentAlert(randomAlert);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let category: ChatMessage["category"] = "general";

    if (
      lowerMessage.includes("water quality") ||
      lowerMessage.includes("murky") ||
      lowerMessage.includes("💧")
    ) {
      category = "troubleshooting";
      response = `**🚨 Troubleshooting Water Quality Issues:**

**Immediate Actions:**
1. Test dissolved oxygen levels (should be >5mg/L)
2. Check pH levels (optimal 7.5-8.5)  
3. Reduce feeding by 50% for 24-48 hours
4. Increase aeration immediately

**Common Causes & Solutions:**
🌱 **Algae bloom:** Reduce feeding, add beneficial bacteria
🌊 **Suspended particles:** Install simple sand filter
🍽️ **Overfeeding:** Adjust feeding schedule
💨 **Poor circulation:** Check aerators/pumps

**When to be concerned:**
• Shrimp show stress signs (erratic swimming)
• Dissolved oxygen drops below 4ppm
• Ammonia levels rise above 0.5ppm

I'll monitor and alert you of changes.`;
    } else if (
      lowerMessage.includes("feeding") ||
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("🍽️")
    ) {
      category = "how-to";
      response = `**🍽️ Optimal Feeding Schedule:**

**Daily Feeding Times:**
• **Morning feed (6-7 AM):** 40% of daily ration
• **Afternoon feed (2-3 PM):** 35% of daily ration
• **Evening feed (6-7 PM):** 25% of daily ration

**Feed Amount Guidelines:**
• Week 1-4: 3-5% of estimated biomass
• Week 5-8: 2-4% of estimated biomass
• Week 9-12: 1.5-3% of estimated biomass

**Quality Control:**
• Check feed expiry dates weekly
• Store in cool, dry place (<25°C)
• Use sealed containers to prevent contamination
• First in, first out rotation

**Monitoring Tips:**
• Check feeding response within 30 minutes
• Remove uneaten feed after 2 hours
• Adjust portions based on consumption`;
    } else if (
      lowerMessage.includes("disease") ||
      lowerMessage.includes("prevention") ||
      lowerMessage.includes("🛡️")
    ) {
      category = "how-to";
      response = `**🛡️ Disease Prevention Protocols:**

**Daily Prevention Measures:**
• Maintain water quality parameters
• Regular pond cleaning and disinfection
• Proper feed storage and handling
• Monitor shrimp behavior daily

**Biosecurity Essentials:**
• Footbath disinfection at entry points
• Visitor registration and screening
• Equipment cleaning between ponds
• Staff hygiene protocols

**Early Warning Signs:**
• Reduced feeding activity
• Abnormal swimming patterns
• Color changes in shrimp
• Mortality increases

**Emergency Response:**
• Isolate affected areas immediately
• Contact aquaculture veterinarian
• Document all observations
• Implement treatment protocols

Regular monitoring prevents 80% of disease outbreaks.`;
    } else if (
      lowerMessage.includes("cost") ||
      lowerMessage.includes("analysis") ||
      lowerMessage.includes("💰") ||
      lowerMessage.includes("investment")
    ) {
      category = "cost-benefit";
      response = `**💰 Cost-Benefit Analysis for Aquaculture:**

**Common Investment Areas:**
• **UV Water Treatment:** ₱15,000-25,000 initial, 8-12 month ROI
• **Aeration Systems:** ₱10,000-20,000, saves 15-25% mortality
• **Water Testing Kits:** ₱2,000-5,000, prevents major losses
• **Feed Storage Systems:** ₱3,000-8,000, reduces waste by 20%

**ROI Calculation Factors:**
• Current survival rates vs. potential improvement
• Feed conversion efficiency gains
• Labor cost savings
• Premium pricing opportunities

**Quick ROI Calculator:**
• Investment cost ÷ Annual savings = Payback period
• Factor in risk reduction value

**Budget-Friendly Priorities:**
1. Water testing equipment (highest impact/cost ratio)
2. Basic aeration improvements
3. Simple biosecurity measures

Want specific ROI calculations for your farm size?`;
    } else if (
      lowerMessage.includes("emergency") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("🚨") ||
      lowerMessage.includes("urgent")
    ) {
      category = "troubleshooting";
      response = `**🚨 Emergency Response Protocol:**

**Immediate Assessment (First 15 minutes):**
• Check dissolved oxygen levels
• Count visible shrimp mortality
• Test water temperature and pH
• Look for signs of stress behavior

**Critical Actions:**
• **Mass mortality (>10%):** Stop feeding, increase aeration, call vet
• **Water quality crash:** 25% water exchange, test parameters
• **Disease outbreak:** Isolate affected ponds, document symptoms
• **Equipment failure:** Switch to backup systems, manual aeration

**Emergency Contacts:**
• Local aquaculture veterinarian
• Nearest laboratory for water testing
• Equipment supplier for urgent repairs

**Documentation:**
• Record time, symptoms, actions taken
• Take photos/videos for expert consultation
• Log water parameter readings

**24-Hour Monitoring:**
Check every 2 hours until situation stabilizes.

Need specific emergency guidance for your current situation?`;
    } else if (
      lowerMessage.includes("best practices") ||
      lowerMessage.includes("practices") ||
      lowerMessage.includes("📋") ||
      lowerMessage.includes("guide")
    ) {
      category = "how-to";
      response = `**📋 GAqP Best Practices Summary:**

**Daily Operations:**
• Monitor water quality parameters (pH, DO, temperature)
• Check shrimp behavior and appetite
• Record feeding amounts and response
• Maintain clean pond environments

**Weekly Tasks:**
• Water quality testing (ammonia, nitrite, alkalinity)
• Equipment maintenance and cleaning
• Feed inventory and storage check
• Biosecurity protocol review

**Monthly Reviews:**
• Growth rate assessment
• Feed conversion ratio calculation
• Disease prevention protocol update
• Cost tracking and analysis

**Record Keeping:**
• Daily feeding logs
• Water quality data
• Mortality records
• Treatment applications

**Key Success Factors:**
• Consistent monitoring
• Preventive approach
• Proper documentation
• Continuous learning

**Certification Benefits:**
• Premium market access
• Better loan terms
• Reduced insurance costs
• Enhanced reputation

Need detailed guidance on any specific practice?`;
    } else {
      response = `I understand you're asking about "${userMessage}".

**🦐 I can help you with:**
• **Step-by-step how-to guides** for biosecurity practices
• **Troubleshooting support** for immediate issues
• **Cost-benefit analysis** for investments
• **Best practices** for specific situations
• **Emergency response** protocols

**💡 Try asking me about:**
• "Water quality management"
• "Feeding schedule optimization"
• "Disease prevention protocols"
• "Equipment cost analysis"
• "Emergency procedures"

I'm here to provide **practical, actionable guidance** for your farm! 🦐`;
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      category,
    };
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputMessage(action.label);
    handleSendMessage();
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "how-to":
        return "bg-green-100 text-green-800";
      case "troubleshooting":
        return "bg-red-100 text-red-800";
      case "cost-benefit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">LikAI Coach</h1>
          <Badge className="bg-green-100 text-green-800">Live</Badge>
        </div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Enhanced Chat Interface */}
      <div className="relative">
        <div className="rounded-xl bg-gradient-to-br from-[#3498DB]/10 to-blue-50 p-6 shadow-lg">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#3498DB] to-[#2980B9] px-4 py-3 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/20">
                  <div className="text-lg">�</div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                </div>
                <div>
                  <div className="text-sm font-semibold">LikAI Coach</div>
                  <div className="flex items-center text-xs text-blue-100">
                    <div className="mr-1 h-2 w-2 rounded-full bg-green-400"></div>
                    Online • Aquaculture Expert
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-red-400"></div>
                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
              </div>
            </div>

            {/* Smart Alert Banner */}
            {currentAlert && (
              <div className="border-b bg-orange-50 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-xs font-medium text-orange-700">
                    {currentAlert}
                  </span>
                </div>
              </div>
            )}

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
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                          message.type === "user"
                            ? "bg-[#3498DB]"
                            : "bg-[#3498DB]"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">
                          {message.type === "user" ? "👤" : "🦐"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`max-w-xs rounded-lg px-4 py-3 ${
                            message.type === "user"
                              ? "ml-auto bg-[#3498DB] text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          {message.category && message.type === "bot" && (
                            <Badge
                              className={`text-xs ${getCategoryColor(message.category)}`}
                            >
                              {message.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3498DB]">
                    <span className="text-xs font-bold text-white">🦐</span>
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
                    className="flex min-h-[48px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md active:scale-95"
                    onClick={() => handleQuickAction(action)}
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
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Ask about biosecurity, water quality, feeding schedules..."
                  onKeyPress={e => e.key === "Enter" && handleSendMessage()}
                  className="min-h-[48px] flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#3498DB] focus:outline-none focus:ring-1 focus:ring-[#3498DB]"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="flex min-h-[48px] items-center bg-[#3498DB] px-4 py-3 text-sm hover:bg-[#2980B9]"
                >
                  <span className="mr-1">📤</span>
                  Send
                </Button>
              </div>
              {(isTyping || inputMessage.trim()) && (
                <div className="mt-2 text-xs text-gray-500">
                  {isTyping
                    ? "LikAI Coach is thinking..."
                    : "Press Enter or click Send to ask your question"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
