"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation" // Import useRouter
import { Loader2 } from "lucide-react" // Import Loader2 for loading state

export function FarmAssessmentForm() {
  const { toast } = useToast()
  const router = useRouter() // Initialize useRouter
  const [isSubmitting, setIsSubmitting] = useState(false) // New state for submission loading

  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    primarySpecies: "",
    farmType: "",
    farmSize: "",
    isNewFarmer: "", // "New Setup" or "Existing Pond"
    existingPondYears: "", // Conditional
    waterSource: [] as string[],
    initialBudget: "",
    hasElectricity: "",
    topConcerns: [] as string[],

    // Section 2: Current Biosecurity & Management Practices (Conditional)
    pondDrainSunDry: "",
    removeMuckLayer: "",
    disinfectPond: "",
    filterIncomingWater: "",
    separateReservoir: "",
    waterMonitoringFrequency: "",
    plSource: "",
    acclimatePLs: "",
    quarantinePLs: "",
    hasFencing: "",
    useFootbaths: "",
    equipmentSharing: "",
    visitorManagement: "",
    wasteDisposal: "",
    controlFeeding: "",
    healthMonitoring: "",
    keepRecords: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [id]: checked
          ? [...(prev[id as keyof typeof prev] as string[]), value]
          : (prev[id as keyof typeof prev] as string[]).filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true) // Set loading state

    try {
      const response = await fetch("/api/generate-assessment-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate action plan")
      }

      const data = await response.json()
      localStorage.setItem("aiGeneratedPlan", JSON.stringify(data.tasks)) // Store generated tasks

      toast({
        title: "Assessment Submitted!",
        description: "Your personalized action plan is ready.",
        variant: "default",
      })

      router.push("/plan") // Redirect to Dynamic Plan page
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast({
        title: "Submission Failed",
        description: "Could not generate action plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false) // Reset loading state
    }
  }

  const isExistingPond = formData.isNewFarmer === "Existing Pond"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Farm Profile */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Section 1: Farm Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="farmName">Farm Name</Label>
            <Input
              id="farmName"
              value={formData.farmName}
              onChange={handleInputChange}
              placeholder="e.g., Sunrise Aqua Farm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location (City/Province, Region)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Tagum City, Davao del Norte, Davao Region"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primarySpecies">Primary Shrimp Species</Label>
            <Select
              value={formData.primarySpecies}
              onValueChange={(val) => handleSelectChange("primarySpecies", val)}
              required
            >
              <SelectTrigger id="primarySpecies">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Penaeus vannamei">Penaeus vannamei</SelectItem>
                <SelectItem value="Penaeus monodon">Penaeus monodon</SelectItem>
                <SelectItem value="Macrobrachium rosenbergii">Macrobrachium rosenbergii</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmType">Farm Type</Label>
            <Select value={formData.farmType} onValueChange={(val) => handleSelectChange("farmType", val)} required>
              <SelectTrigger id="farmType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Intensive">Intensive</SelectItem>
                <SelectItem value="Semi-intensive">Semi-intensive</SelectItem>
                <SelectItem value="Extensive">Extensive</SelectItem>
                <SelectItem value="Natural/Tidal Pond">Natural/Tidal Pond</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmSize">Approximate Farm Size (in hectares or square meters)</Label>
            <Input
              id="farmSize"
              type="number"
              value={formData.farmSize}
              onChange={handleInputChange}
              placeholder="e.g., 5 (hectares)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Are you a new farmer starting from scratch, or do you have an existing pond?</Label>
            <RadioGroup
              value={formData.isNewFarmer}
              onValueChange={(val) => handleRadioChange("isNewFarmer", val)}
              className="flex space-x-4"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="New Setup" id="new-setup" />
                <Label htmlFor="new-setup">New Setup</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Existing Pond" id="existing-pond" />
                <Label htmlFor="existing-pond">Existing Pond</Label>
              </div>
            </RadioGroup>
          </div>
          {isExistingPond && (
            <div className="space-y-2">
              <Label htmlFor="existingPondYears">If existing, how long has it been used for shrimp farming?</Label>
              <Select
                value={formData.existingPondYears}
                onValueChange={(val) => handleSelectChange("existingPondYears", val)}
                required={isExistingPond}
              >
                <SelectTrigger id="existingPondYears">
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1 year">&lt;1 year</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value=">5 years">&gt;5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label>What is your main water source?</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSource"
                  value="River"
                  checked={formData.waterSource.includes("River")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "waterSource", value: "River", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="waterSource-river">River</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSource"
                  value="Sea/Ocean"
                  checked={formData.waterSource.includes("Sea/Ocean")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "waterSource", value: "Sea/Ocean", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="waterSource-sea">Sea/Ocean</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSource"
                  value="Deep Well"
                  checked={formData.waterSource.includes("Deep Well")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "waterSource", value: "Deep Well", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="waterSource-well">Deep Well</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSource"
                  value="Rainwater"
                  checked={formData.waterSource.includes("Rainwater")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "waterSource", value: "Rainwater", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="waterSource-rain">Rainwater</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waterSource"
                  value="Other"
                  checked={formData.waterSource.includes("Other")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "waterSource", value: "Other", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="waterSource-other">Other</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialBudget">
              What is your estimated initial budget for biosecurity setup (excluding pond construction/lining)?
            </Label>
            <Select
              value={formData.initialBudget}
              onValueChange={(val) => handleSelectChange("initialBudget", val)}
              required
            >
              <SelectTrigger id="initialBudget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Very Limited (<₱5,000)">Very Limited (&lt;₱5,000)</SelectItem>
                <SelectItem value="Limited (₱5,000-₱20,000)">Limited (₱5,000-₱20,000)</SelectItem>
                <SelectItem value="Moderate (₱20,000-₱50,000)">Moderate (₱20,000-₱50,000)</SelectItem>
                <SelectItem value="Substantial (>₱50,000)">Substantial (&gt;₱50,000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Do you have reliable access to electricity on your farm?</Label>
            <RadioGroup
              value={formData.hasElectricity}
              onValueChange={(val) => handleRadioChange("hasElectricity", val)}
              className="flex space-x-4"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="electricity-yes" />
                <Label htmlFor="electricity-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="electricity-no" />
                <Label htmlFor="electricity-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Generator Only" id="electricity-generator" />
                <Label htmlFor="electricity-generator">Generator Only</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>What are your top 3 biggest concerns about starting/running a shrimp farm?</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Disease outbreaks"
                  checked={formData.topConcerns.includes("Disease outbreaks")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Disease outbreaks",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-disease">Disease outbreaks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="High feed cost"
                  checked={formData.topConcerns.includes("High feed cost")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "High feed cost",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-feed">High feed cost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Limited capital"
                  checked={formData.topConcerns.includes("Limited capital")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Limited capital",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-capital">Limited capital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Lack of technical knowledge"
                  checked={formData.topConcerns.includes("Lack of technical knowledge")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Lack of technical knowledge",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-knowledge">Lack of technical knowledge</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Market access"
                  checked={formData.topConcerns.includes("Market access")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Market access",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-market">Market access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Permit issues"
                  checked={formData.topConcerns.includes("Permit issues")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Permit issues",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-permit">Permit issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Natural disasters"
                  checked={formData.topConcerns.includes("Natural disasters")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        id: "topConcerns",
                        value: "Natural disasters",
                        type: "checkbox",
                        checked: !!checked,
                      } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-disasters">Natural disasters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="topConcerns"
                  value="Other"
                  checked={formData.topConcerns.includes("Other")}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { id: "topConcerns", value: "Other", type: "checkbox", checked: !!checked } as any,
                    })
                  }
                />
                <Label htmlFor="concerns-other">Other</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExistingPond && (
        <>
          <Separator />
          {/* Section 2: Current Biosecurity & Management Practices */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Section 2: Current Biosecurity & Management Practices</h3>

            {/* Pond Preparation */}
            <div className="space-y-2">
              <Label>Pond Preparation:</Label>
              <div className="space-y-2 ml-4">
                <Label>Between cycles, do you completely drain and sun-dry your ponds until the bottom cracks?</Label>
                <RadioGroup
                  value={formData.pondDrainSunDry}
                  onValueChange={(val) => handleRadioChange("pondDrainSunDry", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="pondDrainSunDry-yes" />
                    <Label htmlFor="pondDrainSunDry-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="pondDrainSunDry-no" />
                    <Label htmlFor="pondDrainSunDry-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Partially" id="pondDrainSunDry-partially" />
                    <Label htmlFor="pondDrainSunDry-partially">Partially</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>Do you remove the muck layer (black sludge) from the pond bottom?</Label>
                <RadioGroup
                  value={formData.removeMuckLayer}
                  onValueChange={(val) => handleRadioChange("removeMuckLayer", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="removeMuckLayer-yes" />
                    <Label htmlFor="removeMuckLayer-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="removeMuckLayer-no" />
                    <Label htmlFor="removeMuckLayer-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>Do you disinfect the pond bottom or water before stocking?</Label>
                <RadioGroup
                  value={formData.disinfectPond}
                  onValueChange={(val) => handleRadioChange("disinfectPond", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="disinfectPond-yes" />
                    <Label htmlFor="disinfectPond-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="disinfectPond-no" />
                    <Label htmlFor="disinfectPond-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sometimes" id="disinfectPond-sometimes" />
                    <Label htmlFor="disinfectPond-sometimes">Sometimes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Water Management */}
            <div className="space-y-2">
              <Label>Water Management:</Label>
              <div className="space-y-2 ml-4">
                <Label>Do you filter incoming water (e.g., through fine mesh, sand filter, sedimentation pond)?</Label>
                <RadioGroup
                  value={formData.filterIncomingWater}
                  onValueChange={(val) => handleRadioChange("filterIncomingWater", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="filterIncomingWater-yes" />
                    <Label htmlFor="filterIncomingWater-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="filterIncomingWater-no" />
                    <Label htmlFor="filterIncomingWater-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Partially" id="filterIncomingWater-partially" />
                    <Label htmlFor="filterIncomingWater-partially">Partially</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>
                  Do you have a separate reservoir or treatment area for incoming water before it enters the grow-out
                  pond?
                </Label>
                <RadioGroup
                  value={formData.separateReservoir}
                  onValueChange={(val) => handleRadioChange("separateReservoir", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="separateReservoir-yes" />
                    <Label htmlFor="separateReservoir-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="separateReservoir-no" />
                    <Label htmlFor="separateReservoir-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label htmlFor="waterMonitoringFrequency">
                  How often do you monitor basic water quality parameters (pH, salinity, temperature, DO)?
                </Label>
                <Select
                  value={formData.waterMonitoringFrequency}
                  onValueChange={(val) => handleSelectChange("waterMonitoringFrequency", val)}
                  required={isExistingPond}
                >
                  <SelectTrigger id="waterMonitoringFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Rarely/Never">Rarely/Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stock Sourcing & Handling */}
            <div className="space-y-2">
              <Label>Stock Sourcing & Handling:</Label>
              <div className="space-y-2 ml-4">
                <Label htmlFor="plSource">Where do you typically source your post-larvae (PLs) from?</Label>
                <Select
                  value={formData.plSource}
                  onValueChange={(val) => handleSelectChange("plSource", val)}
                  required={isExistingPond}
                >
                  <SelectTrigger id="plSource">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BFAR-accredited hatchery">BFAR-accredited hatchery</SelectItem>
                    <SelectItem value="Non-accredited local hatchery">Non-accredited local hatchery</SelectItem>
                    <SelectItem value="Wild-caught">Wild-caught</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ml-4">
                <Label>
                  Do you acclimate new PLs (gradually adjust them to pond water) before releasing them into the grow-out
                  pond?
                </Label>
                <RadioGroup
                  value={formData.acclimatePLs}
                  onValueChange={(val) => handleRadioChange("acclimatePLs", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="acclimatePLs-yes" />
                    <Label htmlFor="acclimatePLs-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="acclimatePLs-no" />
                    <Label htmlFor="acclimatePLs-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Partially" id="acclimatePLs-partially" />
                    <Label htmlFor="acclimatePLs-partially">Partially</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>
                  Do you quarantine new PL batches in a separate tank/area before introducing them to the main pond?
                </Label>
                <RadioGroup
                  value={formData.quarantinePLs}
                  onValueChange={(val) => handleRadioChange("quarantinePLs", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="quarantinePLs-yes" />
                    <Label htmlFor="quarantinePLs-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="quarantinePLs-no" />
                    <Label htmlFor="quarantinePLs-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Farm Access & Sanitation */}
            <div className="space-y-2">
              <Label>Farm Access & Sanitation:</Label>
              <div className="space-y-2 ml-4">
                <Label>
                  Do you have fencing around your ponds/farm to prevent entry of animals (e.g., birds, crabs, wild
                  fish)?
                </Label>
                <RadioGroup
                  value={formData.hasFencing}
                  onValueChange={(val) => handleRadioChange("hasFencing", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="hasFencing-yes" />
                    <Label htmlFor="hasFencing-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="hasFencing-no" />
                    <Label htmlFor="hasFencing-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Partial" id="hasFencing-partial" />
                    <Label htmlFor="hasFencing-partial">Partial</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>Do you use footbaths or vehicle tire baths at farm entry points or between pond areas?</Label>
                <RadioGroup
                  value={formData.useFootbaths}
                  onValueChange={(val) => handleRadioChange("useFootbaths", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="useFootbaths-yes" />
                    <Label htmlFor="useFootbaths-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="useFootbaths-no" />
                    <Label htmlFor="useFootbaths-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sometimes" id="useFootbaths-sometimes" />
                    <Label htmlFor="useFootbaths-sometimes">Sometimes</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label>
                  Do you have dedicated equipment (nets, buckets, tools) for each pond, or do you share equipment
                  between ponds without disinfection?
                </Label>
                <RadioGroup
                  value={formData.equipmentSharing}
                  onValueChange={(val) => handleRadioChange("equipmentSharing", val)}
                  className="flex flex-col space-y-2"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dedicated per pond" id="equipmentSharing-dedicated" />
                    <Label htmlFor="equipmentSharing-dedicated">Dedicated per pond</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Shared with disinfection" id="equipmentSharing-shared-disinfect" />
                    <Label htmlFor="equipmentSharing-shared-disinfect">Shared with disinfection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Shared without disinfection" id="equipmentSharing-shared-no-disinfect" />
                    <Label htmlFor="equipmentSharing-shared-no-disinfect">Shared without disinfection</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 ml-4">
                <Label htmlFor="visitorManagement">How do you manage visitors to your farm?</Label>
                <Select
                  value={formData.visitorManagement}
                  onValueChange={(val) => handleSelectChange("visitorManagement", val)}
                  required={isExistingPond}
                >
                  <SelectTrigger id="visitorManagement">
                    <SelectValue placeholder="Select management style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Strictly restricted">Strictly restricted</SelectItem>
                    <SelectItem value="Limited access">Limited access</SelectItem>
                    <SelectItem value="Unrestricted access">Unrestricted access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Waste & Mortality Management */}
            <div className="space-y-2">
              <Label>Waste & Mortality Management:</Label>
              <div className="space-y-2 ml-4">
                <Label htmlFor="wasteDisposal">How do you dispose of dead shrimp or waste from the ponds?</Label>
                <Select
                  value={formData.wasteDisposal}
                  onValueChange={(val) => handleSelectChange("wasteDisposal", val)}
                  required={isExistingPond}
                >
                  <SelectTrigger id="wasteDisposal">
                    <SelectValue placeholder="Select disposal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Buried on-site">Buried on-site</SelectItem>
                    <SelectItem value="Disposed off-site securely">Disposed off-site securely</SelectItem>
                    <SelectItem value="Discarded in water nearby">Discarded in water nearby</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ml-4">
                <Label>Do you control feeding amounts to avoid overfeeding and excess waste?</Label>
                <RadioGroup
                  value={formData.controlFeeding}
                  onValueChange={(val) => handleRadioChange("controlFeeding", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="controlFeeding-yes" />
                    <Label htmlFor="controlFeeding-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="controlFeeding-no" />
                    <Label htmlFor="controlFeeding-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sometimes" id="controlFeeding-sometimes" />
                    <Label htmlFor="controlFeeding-sometimes">Sometimes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Health Monitoring */}
            <div className="space-y-2">
              <Label>Health Monitoring:</Label>
              <div className="space-y-2 ml-4">
                <Label htmlFor="healthMonitoring">How do you currently monitor shrimp health?</Label>
                <Select
                  value={formData.healthMonitoring}
                  onValueChange={(val) => handleSelectChange("healthMonitoring", val)}
                  required={isExistingPond}
                >
                  <SelectTrigger id="healthMonitoring">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visual observation only">Visual observation only</SelectItem>
                    <SelectItem value="Basic test kits for symptoms">Basic test kits for symptoms</SelectItem>
                    <SelectItem value="Lab testing if issues arise">Lab testing if issues arise</SelectItem>
                    <SelectItem value="Never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 ml-4">
                <Label>Do you keep records of feeding, water quality, and shrimp mortality?</Label>
                <RadioGroup
                  value={formData.keepRecords}
                  onValueChange={(val) => handleRadioChange("keepRecords", val)}
                  className="flex space-x-4"
                  required={isExistingPond}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="keepRecords-yes" />
                    <Label htmlFor="keepRecords-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="keepRecords-no" />
                    <Label htmlFor="keepRecords-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Partially" id="keepRecords-partially" />
                    <Label htmlFor="keepRecords-partially">Partially</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...
          </>
        ) : (
          "Submit Assessment"
        )}
      </Button>
    </form>
  )
}
