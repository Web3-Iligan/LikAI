"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Lightbulb, AlertCircle, CheckCircle, DollarSign } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: "how-to" | "troubleshooting" | "cost-benefit" | "general"
}

export function InteractiveChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AquaSecure AI Coach. I can help you with step-by-step guidance, troubleshooting, and cost-benefit analysis for your biosecurity plan. What would you like to know?",
      timestamp: new Date(),
      category: "general",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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
  ]

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase()

    let response = ""
    let category: ChatMessage["category"] = "general"

    if (lowerMessage.includes("footbath") || lowerMessage.includes("how to set up")) {
      response = `**Setting up Footbath Protocol - Step by Step:**

1. **Materials Needed:**
   - Shallow container (30cm deep)
   - Chlorine solution (200ppm) or Iodine-based disinfectant
   - Scrub brush for boots
   - Fresh water for rinsing

2. **Setup Instructions:**
   - Place footbath at farm entrance
   - Fill with disinfectant solution
   - Add scrub brush nearby
   - Post clear instructions sign

3. **Daily Maintenance:**
   - Change solution every 2-3 days
   - Clean container weekly
   - Monitor solution strength

**Cost:** ₱300-500 initial setup, ₱50-100/week maintenance
**Benefit:** Reduces pathogen entry by up to 80%

Would you like more details on any specific step?`
      category = "how-to"
    } else if (lowerMessage.includes("murky") || lowerMessage.includes("water")) {
      response = `**Troubleshooting Murky Pond Water:**

**Immediate Actions:**
1. Test water parameters (pH, DO, ammonia)
2. Check if recent feeding or fertilizer application
3. Reduce feeding by 50% temporarily
4. Increase aeration if available

**Possible Causes & Solutions:**
- **Algae bloom:** Reduce feeding, add beneficial bacteria
- **Suspended particles:** Install simple sand filter
- **Overfeeding:** Adjust feeding schedule
- **Poor water circulation:** Check aerators/pumps

**When to be concerned:**
- If shrimp show stress signs
- If dissolved oxygen drops below 4ppm
- If ammonia levels rise

**Cost-effective solutions:**
- Beneficial bacteria: ₱200-400
- Simple filtration: ₱500-1,000

Need help with water testing procedures?`
      category = "troubleshooting"
    } else if (lowerMessage.includes("cost") || lowerMessage.includes("uv")) {
      response = `**UV Water Treatment - Cost-Benefit Analysis:**

**Investment Costs:**
- Basic UV system (5-10 ponds): ₱15,000-25,000
- Installation: ₱3,000-5,000
- Annual maintenance: ₱2,000-3,000

**Benefits:**
- Reduces waterborne pathogens by 99%
- Decreases disease outbreaks by 60-80%
- Improves survival rates by 15-25%

**Financial Impact:**
- Potential loss prevention: ₱50,000-100,000/cycle
- ROI timeline: 1-2 production cycles
- Break-even: Usually within 6-12 months

**Alternatives for smaller budgets:**
- Solar disinfection: ₱2,000-5,000
- Chlorination system: ₱5,000-10,000
- Sand filtration: ₱3,000-8,000

Would you like specific recommendations based on your farm size?`
      category = "cost-benefit"
    } else if (lowerMessage.includes("visitor") || lowerMessage.includes("disinfection")) {
      response = `**Visitor Disinfection Best Practices:**

**Entry Protocol:**
1. **Registration:** Log all visitors with contact info
2. **Health check:** Basic health questionnaire
3. **Clothing:** Provide disposable coveralls/boots
4. **Hand sanitization:** 70% alcohol solution
5. **Footbath:** Mandatory for all footwear
6. **Vehicle disinfection:** Spray wheels and undercarriage

**Enhanced Protocol (High Risk Periods):**
- 24-hour farm visit restriction
- Temperature checks
- Dedicated visitor pathways
- Equipment disinfection

**Materials Needed:**
- Visitor logbook: ₱100
- Disposable coveralls: ₱20-30/person
- Hand sanitizer: ₱200-300
- Vehicle spray equipment: ₱1,000-2,000

**Key Points:**
- No exceptions for "quick visits"
- Farm workers follow same protocols
- Regular protocol training for staff

Need help setting up visitor registration system?`
      category = "how-to"
    } else {
      response = `I understand you're asking about "${userMessage}". I can help you with:

🔧 **Step-by-step how-to guides** for biosecurity practices
🚨 **Troubleshooting support** for immediate issues  
💰 **Cost-benefit analysis** for investments
📋 **Best practices** for specific situations

Could you be more specific about what you'd like to know? For example:
- "How do I implement [specific practice]?"
- "What should I do if [specific problem]?"
- "What's the cost and benefit of [specific investment]?"

I'm here to provide practical, actionable guidance for your farm!`
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      category,
    }
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    handleSendMessage(action.label)
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "how-to":
        return "bg-blue-100 text-blue-800"
      case "troubleshooting":
        return "bg-red-100 text-red-800"
      case "cost-benefit":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Interactive AI Coach
          </CardTitle>
          <CardDescription>Get instant guidance, troubleshooting, and cost-benefit insights</CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left bg-transparent"
                  onClick={() => handleQuickAction(action)}
                >
                  <IconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardContent className="p-0 h-full flex flex-col">
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
                    {message.category && message.type === "bot" && (
                      <Badge className={`mb-2 ${getCategoryColor(message.category)}`}>
                        {message.category.replace("-", " ").toUpperCase()}
                      </Badge>
                    )}
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
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
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about biosecurity..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage(inputMessage)} disabled={!inputMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
