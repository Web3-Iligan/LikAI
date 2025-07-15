"use client";

import { useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle,
  DollarSign,
  FileText,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  RotateCcw,
  Send,
  User,
  Video,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  category?: "how-to" | "troubleshooting" | "cost-benefit" | "general";
}

export function InteractiveChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your LikAI Coach. I can help you with step-by-step guidance, troubleshooting, and cost-benefit analysis for your biosecurity plan. What would you like to know?",
      timestamp: new Date(),
      category: "general",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleNewQuestion = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content:
          "Hello! I'm your LikAI Coach. I can help you with step-by-step guidance, troubleshooting, and cost-benefit analysis for your biosecurity plan. What would you like to know?",
        timestamp: new Date(),
        category: "general",
      },
    ]);
    setInputMessage("");
    setIsTyping(false);
  };

  const quickActions = [
    {
      label: "How to set up footbath protocol?",
      category: "how-to",
      icon: Lightbulb,
    },
    {
      label: "My pond water is murky, what should I do?",
      category: "troubleshooting",
      icon: AlertCircle,
    },
    {
      label: "Cost-benefit of UV water treatment?",
      category: "cost-benefit",
      icon: DollarSign,
    },
    {
      label: "Best practices for visitor disinfection?",
      category: "how-to",
      icon: CheckCircle,
    },
    {
      label: "How to implement feed management schedule?",
      category: "how-to",
      icon: Wrench,
    },
    {
      label: "Shrimp are showing stress signs - help!",
      category: "troubleshooting",
      icon: HelpCircle,
    },
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();

    let response = "";
    let category: ChatMessage["category"] = "general";

    if (
      lowerMessage.includes("footbath") ||
      lowerMessage.includes("how to set up")
    ) {
      response = `**Setting up Footbath Protocol - Step by Step:**

**Materials Needed:**
• Shallow container (30cm deep)
• Chlorine solution (200ppm) or Iodine-based disinfectant
• Scrub brush for boots
• Fresh water for rinsing

**Setup Instructions:**
• Place footbath at farm entrance
• Fill with disinfectant solution
• Add scrub brush nearby
• Post clear instructions sign

**Daily Maintenance:**
• Change solution every 2-3 days
• Clean container weekly
• Monitor solution strength

**💰 Cost:** ₱300-500 initial setup, ₱50-100/week maintenance
**✅ Benefit:** Reduces pathogen entry by up to 80%

📹 **Visual Guides Available:**
• Setup demonstration video
• Maintenance checklist diagram

Would you like specific recommendations for your farm size or budget?`;
      category = "how-to";
    } else if (
      lowerMessage.includes("murky") ||
      lowerMessage.includes("water")
    ) {
      response = `**🚨 Troubleshooting Murky Pond Water:**

**Immediate Actions (Next 24 hours):**
• Test water parameters (pH, DO, ammonia)
• Check recent feeding or fertilizer application
• Reduce feeding by 50% temporarily
• Increase aeration if available

**Possible Causes & Solutions:**
🌱 **Algae bloom:** Reduce feeding, add beneficial bacteria
🌊 **Suspended particles:** Install simple sand filter
🍽️ **Overfeeding:** Adjust feeding schedule
💨 **Poor circulation:** Check aerators/pumps

**⚠️ When to be concerned:**
• Shrimp show stress signs (erratic swimming, clustering)
• Dissolved oxygen drops below 4ppm
• Ammonia levels rise above 0.5ppm

**💰 Cost-effective solutions:**
• Beneficial bacteria: ₱200-400
• Simple filtration: ₱500-1,000
• Water testing kit: ₱300-600

📊 **Need help with water testing procedures or equipment recommendations?**`;
      category = "troubleshooting";
    } else if (lowerMessage.includes("cost") || lowerMessage.includes("uv")) {
      response = `**💰 UV Water Treatment - Cost-Benefit Analysis:**

**Initial Investment:**
• Basic UV system (5-10 ponds): ₱15,000-25,000
• Professional installation: ₱3,000-5,000
• Annual maintenance: ₱2,000-3,000

**📈 Financial Benefits:**
• Reduces waterborne pathogens by 99%
• Decreases disease outbreaks by 60-80%
• Improves survival rates by 15-25%
• Potential loss prevention: ₱50,000-100,000/cycle

**⏱️ Return on Investment:**
• ROI timeline: 1-2 production cycles
• Break-even: Usually within 6-12 months
• Long-term savings: ₱30,000-80,000/year

**💡 Budget-Friendly Alternatives:**
• Solar disinfection: ₱2,000-5,000
• Chlorination system: ₱5,000-10,000
• Sand filtration: ₱3,000-8,000

📊 **Want specific ROI calculations based on your farm size and current losses?**`;
      category = "cost-benefit";
    } else if (
      lowerMessage.includes("visitor") ||
      lowerMessage.includes("disinfection")
    ) {
      response = `**🛡️ Visitor Disinfection Best Practices:**

**Standard Entry Protocol:**
• **Registration:** Log all visitors with contact info
• **Health check:** Basic health questionnaire
• **Protective gear:** Provide disposable coveralls/boots
• **Hand sanitization:** 70% alcohol solution
• **Footbath:** Mandatory for all footwear
• **Vehicle disinfection:** Spray wheels and undercarriage

**🔒 Enhanced Protocol (High Risk Periods):**
• 24-hour farm visit restriction
• Temperature checks
• Dedicated visitor pathways
• Equipment disinfection stations

**💰 Materials & Costs:**
• Visitor logbook: ₱100
• Disposable coveralls: ₱20-30/person
• Hand sanitizer station: ₱200-300
• Vehicle spray equipment: ₱1,000-2,000

**⚠️ Critical Rules:**
• No exceptions for "quick visits"
• Farm workers follow same protocols
• Regular protocol training for staff

📋 **Need help setting up visitor registration system or training materials?**`;
      category = "how-to";
    } else if (
      lowerMessage.includes("feed") ||
      lowerMessage.includes("feeding")
    ) {
      response = `**🍽️ Feed Management Schedule Implementation:**

**Daily Feeding Protocol:**
• **Morning feed (6-7 AM):** 40% of daily ration
• **Afternoon feed (2-3 PM):** 35% of daily ration  
• **Evening feed (6-7 PM):** 25% of daily ration

**📊 Feed Amount Calculation:**
• Week 1-4: 3-5% of estimated biomass
• Week 5-8: 2-4% of estimated biomass
• Week 9-12: 1.5-3% of estimated biomass

**⚡ Quick Assessment Methods:**
• Check tray method (2-3 hours consumption)
• Visual observation of feeding behavior
• Water quality monitoring post-feeding

**💰 Cost Optimization:**
• Bulk feed purchasing: Save 10-15%
• Proper storage: Reduce waste by 20%
• Feed conversion tracking: Improve efficiency

**📱 Monitoring Tools:**
• Feed tracking sheets
• Mobile apps for recording
• Weekly biomass estimation

Want help calculating specific feed amounts for your pond size?`;
      category = "how-to";
    } else if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("shrimp")
    ) {
      response = `**🚨 Shrimp Stress Signs - Emergency Response:**

**Immediate Visual Signs:**
• Erratic swimming patterns
• Clustering at pond edges/corners
• Reduced feeding activity
• Color changes (pale/dark)
• Lethargy or hyperactivity

**🔥 Immediate Actions (Next 2-4 hours):**
• Test water quality (DO, pH, ammonia, nitrite)
• Increase aeration if possible
• Stop feeding temporarily
• Check for dead/moribund shrimp
• Remove any dead organic matter

**📊 Critical Parameters to Check:**
• Dissolved oxygen: Should be >4 ppm
• pH: Maintain 7.5-8.5
• Ammonia: Keep <0.5 ppm
• Temperature: Avoid sudden changes

**💊 Treatment Options:**
• Probiotics for gut health: ₱150-300
• Vitamin C supplement: ₱200-400  
• Emergency aeration equipment: ₱1,000-3,000

**📞 When to call a specialist:**
• Mass mortality (>10% in 24hrs)
• No improvement after 48hrs
• Suspected disease outbreak

Need emergency contact numbers for aquaculture specialists in your area?`;
      category = "troubleshooting";
    } else {
      response = `I understand you're asking about "${userMessage}". 

**🤖 I can help you with:**

🔧 **Step-by-step how-to guides** for biosecurity practices
🚨 **Troubleshooting support** for immediate issues  
💰 **Cost-benefit analysis** for investments
📋 **Best practices** for specific situations

**💡 Try asking me:**
• "How do I implement [specific practice]?"
• "What should I do if [specific problem occurs]?"
• "What's the ROI of [specific investment]?"
• "Best practices for [specific situation]?"

**🎯 Popular topics:**
• Pond water quality management
• Disease prevention protocols
• Equipment maintenance schedules
• Feed management strategies

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

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    handleSendMessage(action.label);
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "how-to":
        return "bg-blue-100 text-blue-800";
      case "troubleshooting":
        return "bg-red-100 text-red-800";
      case "cost-benefit":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Link href="/plan">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Plan
          </Button>
        </Link>
        <Button
          onClick={handleNewQuestion}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Ask a New Question
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Interactive AI Coach
          </CardTitle>
          <CardDescription>
            Get instant guidance, troubleshooting, and cost-benefit insights
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-start bg-transparent p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
                  onClick={() => handleQuickAction(action)}
                >
                  <div className="flex w-full items-start gap-2">
                    <IconComponent
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        action.category === "how-to"
                          ? "text-blue-600"
                          : action.category === "troubleshooting"
                            ? "text-red-600"
                            : action.category === "cost-benefit"
                              ? "text-green-600"
                              : "text-gray-600"
                      }`}
                    />
                    <span className="text-left text-sm">{action.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[500px]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="h-4 w-4" />
            Chat with AI Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col p-0 pb-4">
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
                    {message.category && message.type === "bot" && (
                      <Badge
                        className={`mb-2 ${getCategoryColor(message.category)}`}
                      >
                        {message.category.replace("-", " ").toUpperCase()}
                      </Badge>
                    )}
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    <div className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
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
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask me anything about biosecurity..."
                onKeyPress={e =>
                  e.key === "Enter" && handleSendMessage(inputMessage)
                }
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
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
