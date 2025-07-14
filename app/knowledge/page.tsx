"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, Search, Filter, Tag, FileText, Lightbulb, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Article {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  content: string // Detailed content for the article
}

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null) // New state for selected article

  const articles: Article[] = [
    {
      id: "1",
      title: "Understanding Water Quality Parameters",
      description: "A comprehensive guide to pH, DO, ammonia, and nitrite in aquaculture ponds.",
      category: "Water Management",
      tags: ["water quality", "monitoring", "pH", "DO", "ammonia"],
      content: `
<h3 class="text-xl font-semibold mb-4">Key Water Quality Parameters</h3>
<p class="mb-6">Maintaining optimal water quality is crucial for the health and productivity of your aquaculture farm. Here are the essential parameters to monitor:</p>

<h4 class="text-lg font-semibold mb-3 text-blue-700">pH (Potential of Hydrogen)</h4>
<p class="mb-2"><strong>What it is:</strong> A measure of how acidic or alkaline the water is. The scale ranges from 0 to 14, with 7 being neutral.</p>
<p class="mb-2"><strong>Optimal Range:</strong> 7.0 - 8.5 for most aquaculture species.</p>
<p class="mb-6"><strong>Why it's important:</strong> Extreme pH levels can stress aquatic animals, reduce growth, and even lead to mortality. It also affects the toxicity of other compounds like ammonia.</p>

<h4 class="text-lg font-semibold mb-3 text-blue-700">DO (Dissolved Oxygen)</h4>
<p class="mb-2"><strong>What it is:</strong> The amount of oxygen dissolved in the water, available for aquatic organisms to breathe.</p>
<p class="mb-2"><strong>Optimal Range:</strong> Above 4 mg/L (ppm) for most species. Below 2 mg/L is critical.</p>
<p class="mb-6"><strong>Why it's important:</strong> Low DO is a common cause of stress and mortality. Aeration systems are often used to maintain adequate levels, especially during hot weather or high stocking densities.</p>

<h4 class="text-lg font-semibold mb-3 text-blue-700">Ammonia (NH3/NH4+)</h4>
<p class="mb-2"><strong>What it is:</strong> A toxic compound produced from the decomposition of organic matter (feed, waste, dead organisms).</p>
<p class="mb-2"><strong>Optimal Range:</strong> Total ammonia nitrogen (TAN) should be less than 0.1 mg/L (ppm).</p>
<p class="mb-6"><strong>Why it's important:</strong> Un-ionized ammonia (NH3) is highly toxic to aquatic animals, damaging gills and reducing oxygen uptake. Its toxicity increases with higher pH and temperature.</p>

<h4 class="text-lg font-semibold mb-3 text-blue-700">Nitrite (NO2-)</h4>
<p class="mb-2"><strong>What it is:</strong> An intermediate product in the nitrogen cycle, converted from ammonia by bacteria.</p>
<p class="mb-2"><strong>Optimal Range:</strong> Less than 0.1 mg/L (ppm).</p>
<p class="mb-6"><strong>Why it's important:</strong> Nitrite can interfere with oxygen transport in the blood of aquatic animals, leading to "brown blood disease" in some species. High levels indicate an imbalance in the nitrogen cycle.</p>

<h3 class="text-xl font-semibold mb-3">Monitoring Tips:</h3>
<ul class="list-disc list-inside space-y-2 mb-4">
  <li>Test water parameters daily, especially during critical growth phases or environmental changes.</li>
  <li>Use reliable test kits or digital meters for accurate readings.</li>
  <li>Keep detailed records of your readings to identify trends and potential issues early.</li>
  <li>Adjust feeding rates and aeration based on water quality results.</li>
</ul>
<p class="text-sm text-gray-600 italic">For more detailed guidance, consult your LikAI Coach or refer to the "Water Management" section in your Dynamic Plan.</p>
`,
    },
    {
      id: "2",
      title: "Essential Biosecurity Protocols for Shrimp Farms",
      description: "Key practices to prevent disease introduction and spread on your farm.",
      category: "Biosecurity",
      tags: ["disease prevention", "farm management", "protocols"],
      content: `
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2"><Shield class="h-5 w-5 text-green-600" /> Core Biosecurity Principles</h3>
        <p class="mb-4">Effective biosecurity is the cornerstone of sustainable aquaculture. It involves a set of practices designed to prevent the introduction and spread of pathogens.</p>

        <h4 class="text-lg font-semibold mb-2">1. Access Control</h4>
        <p class="mb-2">Strictly control who and what enters and leaves your farm. This includes personnel, vehicles, equipment, and new stock.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Implement footbaths and vehicle disinfection stations at all entry points.</li>
          <li>Maintain a visitor log and provide disposable protective gear.</li>
          <li>Designate clean and dirty zones within the farm.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">2. Water Management</h4>
        <p class="mb-2">Ensure the quality and safety of water used in your ponds.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Filter or treat incoming water (e.g., chlorination, UV treatment).</li>
          <li>Regularly monitor water parameters and maintain optimal levels.</li>
          <li>Prevent cross-contamination between ponds.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">3. Stock Management</h4>
        <p class="mb-2">Manage your aquatic animals to minimize disease risks.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Source healthy, certified disease-free post-larvae (PLs).</li>
          <li>Quarantine new stock before introduction to main ponds.</li>
          <li>Avoid overstocking.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">4. Waste Management</h4>
        <p class="mb-2">Properly dispose of dead animals, uneaten feed, and other waste.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Remove dead animals promptly and dispose of them safely (e.g., burial, composting).</li>
          <li>Manage feed waste to prevent accumulation and decomposition.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">5. Equipment & Personnel Hygiene</h4>
        <p class="mb-2">Regularly clean and disinfect all equipment and ensure staff follow hygiene protocols.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Disinfect nets, tools, and vehicles between uses and between ponds.</li>
          <li>Provide handwashing stations and enforce personal hygiene.</li>
          <li>Conduct regular biosecurity training for all farm personnel.</li>
        </ul>
        <p class="text-sm text-gray-600 italic">For tailored recommendations, check your Dynamic Plan or consult the AI Coach.</p>
      `,
    },
    {
      id: "3",
      title: "Cost-Effective Feed Management Strategies",
      description: "Optimize feeding practices to reduce costs and improve FCR.",
      category: "Farm Operations",
      tags: ["feed", "cost saving", "FCR"],
      content: `
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2"><DollarSign class="h-5 w-5 text-green-600" /> Smart Feeding for Profitability</h3>
        <p class="mb-4">Feed is often the largest operational cost in aquaculture. Optimizing its use can significantly impact your farm's profitability.</p>

        <h4 class="text-lg font-semibold mb-2">1. Choose the Right Feed</h4>
        <p class="mb-2">Select high-quality feed appropriate for the species, age, and growth stage of your shrimp. Consider protein content, pellet size, and digestibility.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Consult feed suppliers for recommendations.</li>
          <li>Compare FCR (Feed Conversion Ratio) data from different feeds.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">2. Calibrate Feeding Rates</h4>
        <p class="mb-2">Avoid overfeeding, which wastes feed and degrades water quality. Underfeeding can stunt growth.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Adjust feeding rates based on biomass, water temperature, and dissolved oxygen levels.</li>
          <li>Use feeding trays to monitor consumption and adjust accordingly.</li>
          <li>Consider automated feeders for precise delivery.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">3. Proper Storage</h4>
        <p class="mb-2">Store feed in a cool, dry, and well-ventilated area to prevent spoilage and nutrient loss.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Protect from rodents, insects, and moisture.</li>
          <li>Use FIFO (First-In, First-Out) method to ensure freshness.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">4. Monitor FCR</h4>
        <p class="mb-2">Regularly calculate your Feed Conversion Ratio (FCR) to assess feeding efficiency.</p>
        <p class="mb-4"><strong>FCR = Total Feed Consumed / Total Biomass Gain</strong></p>
        <p class="text-sm text-gray-600 italic">A lower FCR indicates better feed utilization. Aim for an FCR of 1.2-1.5 for shrimp.</p>
      `,
    },
    {
      id: "4",
      title: "Recognizing Early Signs of Disease in Shrimp",
      description: "Visual and behavioral indicators of common shrimp diseases.",
      category: "Animal Health",
      tags: ["disease detection", "shrimp health", "symptoms"],
      content: `
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2"><span class="inline-block w-5 h-5 text-red-600">🔍</span> Early Disease Detection</h3>
        <p class="mb-4">Early detection of disease symptoms is critical for timely intervention and minimizing losses. Regularly observe your shrimp for these signs:</p>

        <h4 class="text-lg font-semibold mb-2">1. Behavioral Changes</h4>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li><strong>Reduced Feeding:</strong> Shrimp are not consuming feed as usual, or feed remains in trays.</li>
          <li><strong>Lethargy:</strong> Shrimp are sluggish, inactive, or gather at the pond edges.</li>
          <li><strong>Erratic Swimming:</strong> Uncoordinated movements, spiraling, or swimming near the surface.</li>
          <li><strong>Burrowing:</strong> Excessive burrowing into the pond bottom.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">2. Physical Signs</h4>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li><strong>White Spot Syndrome Virus (WSSV):</strong> White spots on the carapace and body, reddish discoloration.</li>
          <li><strong>Early Mortality Syndrome (EMS) / AHPND:</strong> Empty gut, pale hepatopancreas, soft shell, dark spots on gills.</li>
          <li><strong>Vibriosis:</strong> Reddish discoloration, lesions, necrosis, and sometimes luminescence.</li>
          <li><strong>Black Gill Disease:</strong> Darkening of gills due to melanin deposition.</li>
          <li><strong>Muscle Necrosis:</strong> Opaque white muscle, often in the tail.</li>
          <li><strong>Fouling:</strong> Presence of external parasites or algae on the body surface.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">3. Water Quality Indicators</h4>
        <p class="mb-2">While not direct disease symptoms, poor water quality often precedes or exacerbates disease outbreaks.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Sudden changes in pH, DO, or ammonia levels.</li>
          <li>Unusual odors or discoloration of water.</li>
        </ul>
        <p class="text-sm text-gray-600 italic">If you observe any of these signs, isolate affected shrimp, conduct water quality tests, and consult a veterinarian or your AI Coach immediately.</p>
      `,
    },
    {
      id: "5",
      title: "Implementing a Visitor Disinfection Station",
      description: "Step-by-step guide to setting up an effective footbath and vehicle disinfection point.",
      category: "Biosecurity",
      tags: ["access control", "disinfection", "footbath"],
      content: `
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2"><Shield class="h-5 w-5 text-blue-600" /> Setting Up Your Disinfection Station</h3>
        <p class="mb-4">A well-maintained disinfection station is crucial for preventing the entry of pathogens into your farm. Here's how to set one up:</p>

        <h4 class="text-lg font-semibold mb-2">1. Location Selection</h4>
        <p class="mb-2">Place the station at all entry and exit points of the farm, especially where vehicles and personnel frequently pass.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Ensure it's easily accessible but cannot be bypassed.</li>
          <li>Choose a shaded area to prevent rapid evaporation of disinfectants.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">2. Footbath Setup</h4>
        <p class="mb-2">For personnel, a footbath is essential.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Use a shallow, sturdy container (e.g., plastic tray, concrete basin) large enough for both feet.</li>
          <li>Fill with an appropriate disinfectant solution (e.g., 2-4% Virkon S, 1% iodine solution).</li>
          <li>Include a brush for scrubbing footwear.</li>
          <li>Place a clear sign with instructions for use.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">3. Vehicle Disinfection</h4>
        <p class="mb-2">Vehicles can carry pathogens from other farms or areas.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Set up a spray system or a drive-through dip for vehicle tires and undercarriages.</li>
          <li>Use a broad-spectrum disinfectant.</li>
          <li>Ensure all parts of the tires and wheel wells are thoroughly wetted.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">4. Maintenance & Monitoring</h4>
        <p class="mb-2">Regular maintenance ensures the effectiveness of your disinfection station.</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Change disinfectant solutions daily or as recommended by the manufacturer (e.g., when visibly dirty).</li>
          <li>Clean the containers regularly.</li>
          <li>Monitor the concentration of the disinfectant using test strips if available.</li>
          <li>Ensure all personnel and visitors comply with the protocol.</li>
        </ul>
        <p class="text-sm text-gray-600 italic">Properly implemented disinfection stations significantly reduce the risk of disease introduction. For specific disinfectant recommendations, consult your local agricultural extension or AI Coach.</p>
      `,
    },
    {
      id: "6",
      title: "Emergency Response Plan for Typhoon Season",
      description: "Prepare your farm for extreme weather events to minimize damage and losses.",
      category: "Risk Management",
      tags: ["weather", "emergency", "typhoon", "disaster preparedness"],
      content: `
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2"><AlertTriangle class="h-5 w-5 text-orange-600" /> Preparing for Extreme Weather</h3>
        <p class="mb-4">Typhoons and heavy rains pose significant threats to aquaculture farms. A robust emergency response plan can mitigate potential damage and losses.</p>

        <h4 class="text-lg font-semibold mb-2">1. Pre-Typhoon Preparations</h4>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li><strong>Pond Dykes:</strong> Inspect and reinforce all pond dykes. Ensure they are strong enough to withstand heavy rainfall and potential flooding.</li>
          <li><strong>Drainage Systems:</strong> Clear all drainage canals and ensure they are free of obstructions to allow efficient water runoff.</li>
          <li><strong>Equipment:</strong> Secure or move all movable equipment (aerators, pumps, feed bags) to higher ground or secure storage.</li>
          <li><strong>Feed Storage:</strong> Ensure feed storage areas are waterproof and elevated to prevent water damage.</li>
          <li><strong>Power Backup:</strong> Test generators and ensure sufficient fuel supply for aeration and pumping.</li>
          <li><strong>Harvesting:</strong> Consider partial or full harvest if shrimp are near market size and a severe typhoon is imminent.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">2. During the Typhoon</h4>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li><strong>Monitor Water Levels:</strong> Continuously monitor pond water levels and manage overflow if necessary.</li>
          <li><strong>Aeration:</strong> Maintain aeration, especially if power outages occur, using backup generators.</li>
          <li><strong>Safety First:</strong> Prioritize the safety of personnel. Do not take unnecessary risks.</li>
        </ul>

        <h4 class="text-lg font-semibold mb-2">3. Post-Typhoon Actions</h4>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li><strong>Damage Assessment:</strong> Immediately assess damage to ponds, dykes, and equipment.</li>
          <li><strong>Water Quality:</strong> Conduct thorough water quality tests (pH, DO, ammonia) as soon as possible, as heavy rains can drastically alter parameters.</li>
          <li><strong>Disease Monitoring:</strong> Be vigilant for signs of disease, as stressed animals are more susceptible.</li>
          <li><strong>Repair & Recovery:</strong> Begin repairs to infrastructure and restore normal operations.</li>
        </ul>
        <p class="text-sm text-gray-600 italic">Having a well-rehearsed emergency plan can significantly reduce the impact of natural disasters on your farm. Regularly review and update your plan.</p>
      `,
    },
  ]

  const categories = ["All", ...new Set(articles.map((article) => article.category))]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Knowledge Base
          </CardTitle>
          <CardDescription>Access detailed guides, best practices, and aquaculture resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedArticle ? (
            // Detailed Article View
            <div className="space-y-4">
              <Button variant="outline" onClick={() => setSelectedArticle(null)} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Articles
              </Button>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                  <CardDescription>{selectedArticle.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {selectedArticle.category}
                    </Badge>
                    {selectedArticle.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Render HTML content directly */}
                  <div
                    className="prose max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Article List View
            <>
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search articles, guides, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4"
                />
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Categories:</span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-1"
                  >
                    {category === "All" ? <Lightbulb className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                    {category}
                  </Button>
                ))}
              </div>

              {/* Article List */}
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-4">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedArticle(article)} // Make card clickable
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            {article.title}
                          </CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" /> {article.category}
                            </Badge>
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-10">No articles found matching your criteria.</div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
