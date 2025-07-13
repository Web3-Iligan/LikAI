import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Fish, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Users, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Award
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center">
          <div className="bg-blue-600 p-2 rounded-lg mr-2">
            <Fish className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">LikAI</span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/auth">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-20 sm:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="max-w-2xl">
                <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Biosecurity
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                  Cut farm risks,
                  <span className="text-blue-600"> not profits.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Making aquaculture risk management automated, effortless, and science-based. 
                  Protect your shrimp farm with AI-driven biosecurity solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/auth">
                    <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8">
                      Start Saving
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
                      Get a Demo
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">DA</span>
                    </div>
                    <span>Department of Agriculture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">PH</span>
                    </div>
                    <span>Philippines.gov</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Globe className="h-4 w-4" />
                    </div>
                    <span>SEAFDEC</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Dashboard Preview */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-600">dashboard.likai.com</div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      Live
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">₱34,529.20</div>
                          <div className="text-xs text-green-700">Cost Savings</div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">₱105,796.01</div>
                          <div className="text-xs text-blue-700">Revenue Protected</div>
                        </CardContent>
                      </Card>
                      <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">₱16,112.02</div>
                          <div className="text-xs text-red-700">Losses Prevented</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Chart Area Placeholder */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Risk Trend Analysis</h3>
                        <Badge variant="outline" className="text-xs">7 days</Badge>
                      </div>
                      <div className="h-32 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded relative overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 300 100">
                          <polyline
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            points="20,80 60,60 100,45 140,50 180,35 220,40 260,30"
                          />
                          {/* Data points */}
                          <circle cx="20" cy="80" r="3" fill="#EF4444" />
                          <circle cx="60" cy="60" r="3" fill="#F59E0B" />
                          <circle cx="100" cy="45" r="3" fill="#F59E0B" />
                          <circle cx="140" cy="50" r="3" fill="#F59E0B" />
                          <circle cx="180" cy="35" r="3" fill="#10B981" />
                          <circle cx="220" cy="40" r="3" fill="#10B981" />
                          <circle cx="260" cy="30" r="3" fill="#10B981" />
                        </svg>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">Recommendations</h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-blue-50 p-2 rounded text-blue-700">Weather Alert</div>
                        <div className="bg-green-50 p-2 rounded text-green-700">Optimize Feed</div>
                        <div className="bg-purple-50 p-2 rounded text-purple-700">Upgrade</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-4 top-20 bg-white rounded-lg shadow-lg border p-3 max-w-48">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-900">Risk Decreased</span>
                  </div>
                  <p className="text-xs text-gray-600">Water quality improved by 23%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Save up to <span className="text-blue-600">75%</span> on your operational costs
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              The precision of AI-driven biosecurity, the flexibility of real-time monitoring.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Risk Prevention</h3>
                  <p className="text-gray-600 mb-4">Prevent disease outbreaks before they happen with AI-powered early detection</p>
                  <div className="text-3xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-500">Risk Reduction</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Yield Optimization</h3>
                  <p className="text-gray-600 mb-4">Maximize harvest quality and quantity with data-driven insights</p>
                  <div className="text-3xl font-bold text-green-600">45%</div>
                  <div className="text-sm text-gray-500">Yield Increase</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Cost Control</h3>
                  <p className="text-gray-600 mb-4">Reduce feed waste and optimize resource allocation automatically</p>
                  <div className="text-3xl font-bold text-purple-600">60%</div>
                  <div className="text-sm text-gray-500">Cost Savings</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything you need for successful aquaculture
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive biosecurity management powered by artificial intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: "Real-time Monitoring",
                  description: "24/7 monitoring of water quality, weather patterns, and farm conditions with instant alerts"
                },
                {
                  icon: Shield,
                  title: "Disease Prevention",
                  description: "AI-powered early detection system prevents outbreaks before they impact your harvest"
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Analytics",
                  description: "Forecast potential risks and optimize feeding schedules for maximum yield"
                },
                {
                  icon: Users,
                  title: "Expert Guidance",
                  description: "Access to aquaculture experts and personalized recommendations for your farm"
                },
                {
                  icon: Zap,
                  title: "Automated Alerts",
                  description: "Instant notifications for critical events, weather changes, and system anomalies"
                },
                {
                  icon: Award,
                  title: "Compliance Support",
                  description: "Stay compliant with industry standards and regulatory requirements automatically"
                }
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trusted by aquaculture professionals
              </h2>
              <p className="text-lg text-gray-600">See what our customers say about LikAI</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Maria Santos",
                  role: "Farm Owner, Bataan",
                  content: "LikAI helped us prevent a major disease outbreak. The early warning system saved our entire harvest worth ₱500,000.",
                  rating: 5
                },
                {
                  name: "Jose Dela Cruz",
                  role: "Aquaculture Manager",
                  content: "Feed optimization recommendations reduced our costs by 40% while improving shrimp quality. Outstanding results!",
                  rating: 5
                },
                {
                  name: "Anna Reyes",
                  role: "Cooperative Leader",
                  content: "The predictive analytics feature helps our 20+ member farms stay ahead of weather risks. Game changer!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to protect your aquaculture investment?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful farmers using LikAI to optimize their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-lg mr-2">
                  <Fish className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LikAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered biosecurity solutions for sustainable aquaculture.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">FB</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">TW</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">LI</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Community</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 LikAI. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Made with ❤️ for Philippine aquaculture</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
