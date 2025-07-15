"use client";

import { useMemo, useState } from "react";

import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps = [
  { id: 0, title: "Basic Profile", description: "Farm details and species" },
  {
    id: 1,
    title: "Setup & Resources",
    description: "Infrastructure and budget",
  },
  { id: 2, title: "Concerns", description: "Top challenges and priorities" },
  {
    id: 3,
    title: "Pond Preparation",
    description: "Site preparation practices",
  },
  {
    id: 4,
    title: "Water Management",
    description: "Water source and treatment",
  },
  { id: 5, title: "Stock Sourcing", description: "Post-larvae procurement" },
  { id: 6, title: "Access & Sanitation", description: "Biosecurity measures" },
  { id: 7, title: "Waste & Health", description: "Management protocols" },
];

// Grouped steps for progress indicator display
const progressGroups = [
  {
    id: 0,
    title: "Farm Setup",
    description: "Basic information and resources",
    stepIndexes: [0, 1], // Basic Profile, Setup & Resources
  },
  {
    id: 1,
    title: "Planning",
    description: "Concerns and preparation",
    stepIndexes: [2, 3], // Concerns, Pond Preparation
  },
  {
    id: 2,
    title: "Management",
    description: "Water and stock sourcing",
    stepIndexes: [4, 5], // Water Management, Stock Sourcing
  },
  {
    id: 3,
    title: "Biosecurity",
    description: "Access control and sanitation",
    stepIndexes: [6], // Access & Sanitation
  },
  {
    id: 4,
    title: "Operations",
    description: "Waste management and health monitoring",
    stepIndexes: [7], // Waste & Health
  },
];

interface FormData {
  // Basic Profile
  farmName: string;
  location: string;
  primarySpecies: string;
  farmType: string;
  farmSize: string;

  // Setup & Resources
  isNewFarmer: string;
  existingPondYears: string;
  waterSource: string[];
  initialBudget: string;
  hasElectricity: string;

  // Concerns
  topConcerns: string[];

  // Pond Preparation
  pondDrainSunDry: string;
  removeMuckLayer: string;
  disinfectPond: string;

  // Water Management
  filterIncomingWater: string;
  separateReservoir: string;
  waterMonitoringFrequency: string;

  // Stock Sourcing
  plSource: string;
  acclimatePLs: string;
  quarantinePLs: string;

  // Access & Sanitation
  hasFencing: string;
  useFootbaths: string;
  equipmentSharing: string;
  visitorManagement: string;

  // Waste & Health
  wasteDisposal: string;
  controlFeeding: string;
  healthMonitoring: string;
  keepRecords: string;
}

export function FarmAssessmentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    farmName: "",
    location: "",
    primarySpecies: "",
    farmType: "",
    farmSize: "",
    isNewFarmer: "",
    existingPondYears: "",
    waterSource: [],
    initialBudget: "",
    hasElectricity: "",
    topConcerns: [],
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
  });

  const isExistingPond = formData.isNewFarmer === "Existing Pond";

  // Helper functions for progress groups
  const getCurrentProgressGroup = (stepIndex: number): number => {
    return progressGroups.findIndex(group =>
      group.stepIndexes.includes(stepIndex)
    );
  };

  const isProgressGroupCompleted = (groupIndex: number): boolean => {
    const group = progressGroups[groupIndex];
    return group.stepIndexes.every(stepIndex => {
      switch (stepIndex) {
        case 0: // Basic Profile
          return !!(
            formData.farmName &&
            formData.location &&
            formData.primarySpecies &&
            formData.farmType &&
            formData.farmSize
          );
        case 1: // Setup & Resources
          return !!(
            formData.isNewFarmer &&
            formData.waterSource.length > 0 &&
            formData.initialBudget &&
            formData.hasElectricity
          );
        case 2: // Concerns
          return formData.topConcerns.length > 0;
        case 3: // Pond Preparation
          if (formData.isNewFarmer === "New Setup") return true;
          return !!(
            formData.pondDrainSunDry &&
            formData.removeMuckLayer &&
            formData.disinfectPond
          );
        case 4: // Water Management
          return !!(
            formData.filterIncomingWater &&
            formData.separateReservoir &&
            formData.waterMonitoringFrequency
          );
        case 5: // Stock Sourcing
          return !!(
            formData.plSource &&
            formData.acclimatePLs &&
            formData.quarantinePLs
          );
        case 6: // Access & Sanitation
          return !!(
            formData.hasFencing &&
            formData.useFootbaths &&
            formData.equipmentSharing &&
            formData.visitorManagement
          );
        case 7: // Waste & Health
          return !!(
            formData.wasteDisposal &&
            formData.controlFeeding &&
            formData.healthMonitoring &&
            formData.keepRecords
          );
        default:
          return false;
      }
    });
  };

  // Memoize step completion status to prevent infinite re-renders
  const stepCompletionStatus = useMemo(() => {
    return steps.map((_, stepIndex) => {
      switch (stepIndex) {
        case 0: // Basic Profile
          return !!(
            formData.farmName &&
            formData.location &&
            formData.primarySpecies &&
            formData.farmType &&
            formData.farmSize
          );
        case 1: // Setup & Resources
          return !!(
            formData.isNewFarmer &&
            formData.waterSource.length > 0 &&
            formData.initialBudget &&
            formData.hasElectricity
          );
        case 2: // Concerns
          return formData.topConcerns.length > 0;
        case 3: // Pond Preparation
          if (formData.isNewFarmer === "New Setup") return true;
          return !!(
            formData.pondDrainSunDry &&
            formData.removeMuckLayer &&
            formData.disinfectPond
          );
        case 4: // Water Management
          return !!(
            formData.filterIncomingWater &&
            formData.separateReservoir &&
            formData.waterMonitoringFrequency
          );
        case 5: // Stock Sourcing
          return !!(
            formData.plSource &&
            formData.acclimatePLs &&
            formData.quarantinePLs
          );
        case 6: // Access & Sanitation
          return !!(
            formData.hasFencing &&
            formData.useFootbaths &&
            formData.equipmentSharing &&
            formData.visitorManagement
          );
        case 7: // Waste & Health
          return !!(
            formData.wasteDisposal &&
            formData.controlFeeding &&
            formData.healthMonitoring &&
            formData.keepRecords
          );
        default:
          return false;
      }
    });
  }, [formData]);

  // Memoize progress group completion status
  const progressGroupCompletionStatus = useMemo(() => {
    return progressGroups.map((_, groupIndex) =>
      isProgressGroupCompleted(groupIndex)
    );
  }, [formData]);

  const currentProgressGroup = getCurrentProgressGroup(currentStep);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      const checkboxValue = (e.target as HTMLInputElement).value;

      if (id === "waterSource" || id === "topConcerns") {
        setFormData(prev => ({
          ...prev,
          [id]: checked
            ? [...(prev[id as keyof FormData] as string[]), checkboxValue]
            : (prev[id as keyof FormData] as string[]).filter(
                item => item !== checkboxValue
              ),
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Basic Profile
        return !!(
          formData.farmName &&
          formData.location &&
          formData.primarySpecies &&
          formData.farmType &&
          formData.farmSize
        );
      case 1: // Setup & Resources
        return !!(
          formData.isNewFarmer &&
          formData.waterSource.length > 0 &&
          formData.initialBudget &&
          formData.hasElectricity
        );
      case 2: // Concerns
        return formData.topConcerns.length > 0;
      case 3: // Pond Preparation
        if (formData.isNewFarmer === "New Setup") return true;
        return !!(
          formData.pondDrainSunDry &&
          formData.removeMuckLayer &&
          formData.disinfectPond
        );
      case 4: // Water Management
        return !!(
          formData.filterIncomingWater &&
          formData.separateReservoir &&
          formData.waterMonitoringFrequency
        );
      case 5: // Stock Sourcing
        return !!(
          formData.plSource &&
          formData.acclimatePLs &&
          formData.quarantinePLs
        );
      case 6: // Access & Sanitation
        return !!(
          formData.hasFencing &&
          formData.useFootbaths &&
          formData.equipmentSharing &&
          formData.visitorManagement
        );
      case 7: // Waste & Health
        return !!(
          formData.wasteDisposal &&
          formData.controlFeeding &&
          formData.healthMonitoring &&
          formData.keepRecords
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to completed steps, current step, or next step if current is completed
    if (
      stepIndex <= currentStep ||
      (stepIndex === currentStep + 1 && stepCompletionStatus[currentStep])
    ) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/generate-assessment-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit assessment");

      router.push("/plan");
    } catch (error) {
      console.error("Error submitting assessment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function renderStepContent() {
    switch (currentStep) {
      case 0: // Basic Profile
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <Label htmlFor="location">
                  Location (City/Province, Region)
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Tagum City, Davao del Norte"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primarySpecies">Primary Shrimp Species</Label>
                <Select
                  value={formData.primarySpecies}
                  onValueChange={val =>
                    handleSelectChange("primarySpecies", val)
                  }
                  required
                >
                  <SelectTrigger id="primarySpecies">
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vannamei">
                      Pacific White Shrimp (L. vannamei)
                    </SelectItem>
                    <SelectItem value="monodon">
                      Giant Tiger Prawn (P. monodon)
                    </SelectItem>
                    <SelectItem value="indicus">
                      Indian White Prawn (F. indicus)
                    </SelectItem>
                    <SelectItem value="other">Other species</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmType">Farm Type</Label>
                <Select
                  value={formData.farmType}
                  onValueChange={val => handleSelectChange("farmType", val)}
                  required
                >
                  <SelectTrigger id="farmType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extensive">
                      Extensive (low density)
                    </SelectItem>
                    <SelectItem value="semi-intensive">
                      Semi-intensive (medium density)
                    </SelectItem>
                    <SelectItem value="intensive">
                      Intensive (high density)
                    </SelectItem>
                    <SelectItem value="super-intensive">
                      Super-intensive (very high density)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSize">
                Approximate Farm Size (in hectares)
              </Label>
              <Input
                id="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                required
              />
            </div>
          </div>
        );

      case 1: // Setup & Resources
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>
                Are you setting up a new farm or working with existing ponds?
              </Label>
              <RadioGroup
                value={formData.isNewFarmer}
                onValueChange={val => handleRadioChange("isNewFarmer", val)}
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
                <Label htmlFor="existingPondYears">
                  How many years have you been operating?
                </Label>
                <Select
                  value={formData.existingPondYears}
                  onValueChange={val =>
                    handleSelectChange("existingPondYears", val)
                  }
                >
                  <SelectTrigger id="existingPondYears">
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">More than 5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <Label>Water Source (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Groundwater/Artesian Well",
                  "River",
                  "Creek",
                  "Sea Water",
                  "Municipal Water Supply",
                ].map(source => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id="waterSource"
                      value={source}
                      checked={formData.waterSource.includes(source)}
                      onCheckedChange={checked => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            waterSource: [...prev.waterSource, source],
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            waterSource: prev.waterSource.filter(
                              item => item !== source
                            ),
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="waterSource">{source}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="initialBudget">
                  Initial Budget Range (PHP)
                </Label>
                <Select
                  value={formData.initialBudget}
                  onValueChange={val =>
                    handleSelectChange("initialBudget", val)
                  }
                  required
                >
                  <SelectTrigger id="initialBudget">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50k">Less than ₱50,000</SelectItem>
                    <SelectItem value="50k-100k">₱50,000 - ₱100,000</SelectItem>
                    <SelectItem value="100k-500k">
                      ₱100,000 - ₱500,000
                    </SelectItem>
                    <SelectItem value="500k+">More than ₱500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Do you have reliable electricity access?</Label>
                <RadioGroup
                  value={formData.hasElectricity}
                  onValueChange={val =>
                    handleRadioChange("hasElectricity", val)
                  }
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
                    <RadioGroupItem value="Limited" id="electricity-limited" />
                    <Label htmlFor="electricity-limited">
                      Limited/Intermittent
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2: // Concerns
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>
                What are your top concerns about shrimp farming? (Select all
                that apply)
              </Label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  "Disease outbreaks",
                  "High feed costs",
                  "Limited capital",
                  "Lack of technical knowledge",
                  "Market access",
                  "Water quality issues",
                  "Seed stock quality",
                  "Environmental compliance",
                  "Weather/climate risks",
                  "Equipment failures",
                ].map(concern => (
                  <div key={concern} className="flex items-center space-x-2">
                    <Checkbox
                      id="topConcerns"
                      value={concern}
                      checked={formData.topConcerns.includes(concern)}
                      onCheckedChange={checked => {
                        if (checked) {
                          setFormData(prev => ({
                            ...prev,
                            topConcerns: [...prev.topConcerns, concern],
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            topConcerns: prev.topConcerns.filter(
                              item => item !== concern
                            ),
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="topConcerns">{concern}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Pond Preparation
        return (
          <div className="space-y-6">
            {formData.isNewFarmer === "New Setup" ? (
              <div className="py-12 text-center">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  New Setup Detected
                </h3>
                <p className="text-gray-600">
                  Since you're setting up a new farm, pond preparation steps
                  will be included in your customized plan.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <Label>
                    Do you drain and sun-dry your ponds between crops?
                  </Label>
                  <RadioGroup
                    value={formData.pondDrainSunDry}
                    onValueChange={val =>
                      handleRadioChange("pondDrainSunDry", val)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Always" id="drain-always" />
                      <Label htmlFor="drain-always">Always</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sometimes" id="drain-sometimes" />
                      <Label htmlFor="drain-sometimes">Sometimes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Never" id="drain-never" />
                      <Label htmlFor="drain-never">Never</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>
                    Do you remove the organic muck layer from pond bottom?
                  </Label>
                  <RadioGroup
                    value={formData.removeMuckLayer}
                    onValueChange={val =>
                      handleRadioChange("removeMuckLayer", val)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Always" id="muck-always" />
                      <Label htmlFor="muck-always">Always</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sometimes" id="muck-sometimes" />
                      <Label htmlFor="muck-sometimes">Sometimes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Never" id="muck-never" />
                      <Label htmlFor="muck-never">Never</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Do you disinfect ponds before stocking?</Label>
                  <RadioGroup
                    value={formData.disinfectPond}
                    onValueChange={val =>
                      handleRadioChange("disinfectPond", val)
                    }
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Always" id="disinfect-always" />
                      <Label htmlFor="disinfect-always">Always</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Sometimes"
                        id="disinfect-sometimes"
                      />
                      <Label htmlFor="disinfect-sometimes">Sometimes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Never" id="disinfect-never" />
                      <Label htmlFor="disinfect-never">Never</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
          </div>
        );

      case 4: // Water Management
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Do you filter incoming water?</Label>
              <RadioGroup
                value={formData.filterIncomingWater}
                onValueChange={val =>
                  handleRadioChange("filterIncomingWater", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, always" id="filter-yes" />
                  <Label htmlFor="filter-yes">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sometimes" id="filter-sometimes" />
                  <Label htmlFor="filter-sometimes">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="filter-no" />
                  <Label htmlFor="filter-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>
                Do you have a separate water reservoir/settling pond?
              </Label>
              <RadioGroup
                value={formData.separateReservoir}
                onValueChange={val =>
                  handleRadioChange("separateReservoir", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="reservoir-yes" />
                  <Label htmlFor="reservoir-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="reservoir-no" />
                  <Label htmlFor="reservoir-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Planning to build"
                    id="reservoir-planning"
                  />
                  <Label htmlFor="reservoir-planning">Planning to build</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>How often do you monitor water quality?</Label>
              <RadioGroup
                value={formData.waterMonitoringFrequency}
                onValueChange={val =>
                  handleRadioChange("waterMonitoringFrequency", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Daily" id="monitor-daily" />
                  <Label htmlFor="monitor-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Weekly" id="monitor-weekly" />
                  <Label htmlFor="monitor-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Monthly" id="monitor-monthly" />
                  <Label htmlFor="monitor-monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Rarely" id="monitor-rarely" />
                  <Label htmlFor="monitor-rarely">Rarely</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 5: // Stock Sourcing
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Where do you source your post-larvae (PLs)?</Label>
              <RadioGroup
                value={formData.plSource}
                onValueChange={val => handleRadioChange("plSource", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Certified hatchery"
                    id="pl-certified"
                  />
                  <Label htmlFor="pl-certified">Certified hatchery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Local hatchery" id="pl-local" />
                  <Label htmlFor="pl-local">Local hatchery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Wild catch" id="pl-wild" />
                  <Label htmlFor="pl-wild">Wild catch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mixed sources" id="pl-mixed" />
                  <Label htmlFor="pl-mixed">Mixed sources</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Do you properly acclimate PLs before stocking?</Label>
              <RadioGroup
                value={formData.acclimatePLs}
                onValueChange={val => handleRadioChange("acclimatePLs", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, always" id="acclimate-yes" />
                  <Label htmlFor="acclimate-yes">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sometimes" id="acclimate-sometimes" />
                  <Label htmlFor="acclimate-sometimes">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="acclimate-no" />
                  <Label htmlFor="acclimate-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Do you quarantine new PLs?</Label>
              <RadioGroup
                value={formData.quarantinePLs}
                onValueChange={val => handleRadioChange("quarantinePLs", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, always" id="quarantine-yes" />
                  <Label htmlFor="quarantine-yes">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sometimes" id="quarantine-sometimes" />
                  <Label htmlFor="quarantine-sometimes">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="quarantine-no" />
                  <Label htmlFor="quarantine-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 6: // Access & Sanitation
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Do you have proper fencing around your farm?</Label>
              <RadioGroup
                value={formData.hasFencing}
                onValueChange={val => handleRadioChange("hasFencing", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Complete fencing"
                    id="fence-complete"
                  />
                  <Label htmlFor="fence-complete">Complete fencing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Partial fencing" id="fence-partial" />
                  <Label htmlFor="fence-partial">Partial fencing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No fencing" id="fence-none" />
                  <Label htmlFor="fence-none">No fencing</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Do you use disinfectant footbaths?</Label>
              <RadioGroup
                value={formData.useFootbaths}
                onValueChange={val => handleRadioChange("useFootbaths", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes, always" id="footbath-yes" />
                  <Label htmlFor="footbath-yes">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sometimes" id="footbath-sometimes" />
                  <Label htmlFor="footbath-sometimes">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="footbath-no" />
                  <Label htmlFor="footbath-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>How do you handle equipment sharing with neighbors?</Label>
              <RadioGroup
                value={formData.equipmentSharing}
                onValueChange={val =>
                  handleRadioChange("equipmentSharing", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Never share" id="share-never" />
                  <Label htmlFor="share-never">Never share equipment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Disinfect before use"
                    id="share-disinfect"
                  />
                  <Label htmlFor="share-disinfect">Disinfect before use</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Share without cleaning"
                    id="share-no-clean"
                  />
                  <Label htmlFor="share-no-clean">
                    Share without special cleaning
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>How do you manage visitors to your farm?</Label>
              <RadioGroup
                value={formData.visitorManagement}
                onValueChange={val =>
                  handleRadioChange("visitorManagement", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="No visitors allowed"
                    id="visitor-none"
                  />
                  <Label htmlFor="visitor-none">No visitors allowed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Restricted access with protocols"
                    id="visitor-restricted"
                  />
                  <Label htmlFor="visitor-restricted">
                    Restricted access with protocols
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Open access" id="visitor-open" />
                  <Label htmlFor="visitor-open">Open access</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 7: // Waste & Health
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>How do you dispose of dead shrimp and farm waste?</Label>
              <RadioGroup
                value={formData.wasteDisposal}
                onValueChange={val => handleRadioChange("wasteDisposal", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Proper composting/burial"
                    id="waste-proper"
                  />
                  <Label htmlFor="waste-proper">Proper composting/burial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Burn or bury on-site"
                    id="waste-burn"
                  />
                  <Label htmlFor="waste-burn">Burn or bury on-site</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Throw in water body"
                    id="waste-water"
                  />
                  <Label htmlFor="waste-water">Throw in water body</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>How do you control feeding practices?</Label>
              <RadioGroup
                value={formData.controlFeeding}
                onValueChange={val => handleRadioChange("controlFeeding", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Scheduled feeding with monitoring"
                    id="feed-scheduled"
                  />
                  <Label htmlFor="feed-scheduled">
                    Scheduled feeding with monitoring
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Regular feeding schedule"
                    id="feed-regular"
                  />
                  <Label htmlFor="feed-regular">Regular feeding schedule</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Feed as available"
                    id="feed-available"
                  />
                  <Label htmlFor="feed-available">Feed as available</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>How often do you monitor shrimp health?</Label>
              <RadioGroup
                value={formData.healthMonitoring}
                onValueChange={val =>
                  handleRadioChange("healthMonitoring", val)
                }
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Daily visual checks"
                    id="health-daily"
                  />
                  <Label htmlFor="health-daily">Daily visual checks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Weekly checks" id="health-weekly" />
                  <Label htmlFor="health-weekly">Weekly checks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Only when problems occur"
                    id="health-problems"
                  />
                  <Label htmlFor="health-problems">
                    Only when problems occur
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>
                Do you keep farm records (stocking, feeding, mortality, etc.)?
              </Label>
              <RadioGroup
                value={formData.keepRecords}
                onValueChange={val => handleRadioChange("keepRecords", val)}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Detailed records"
                    id="records-detailed"
                  />
                  <Label htmlFor="records-detailed">Detailed records</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Basic records" id="records-basic" />
                  <Label htmlFor="records-basic">Basic records</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No records" id="records-none" />
                  <Label htmlFor="records-none">No records</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return <div>Step not implemented</div>;
    }
  }

  return (
    <div className="space-y-8">
      {/* Step Progress Indicator */}
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Assessment Progress
          </h2>
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Progress Groups with Labels */}
        <div className="relative mb-8">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-5 z-0 h-1 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{
                width: `${(currentProgressGroup / (progressGroups.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Progress Group Circles and Labels */}
          <div className="relative z-10 flex items-start justify-between">
            {progressGroups.map((group, index) => (
              <div
                key={group.id}
                className="flex max-w-[120px] flex-col items-center"
              >
                {/* Progress Circle */}
                <div
                  className={`relative z-20 mb-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
                    index === currentProgressGroup
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-200"
                      : index < currentProgressGroup ||
                          progressGroupCompletionStatus[index]
                        ? "bg-green-600 text-white shadow-md"
                        : "border-2 border-gray-300 bg-white text-gray-400 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    // Navigate to first step of the clicked group
                    const firstStepOfGroup = group.stepIndexes[0];
                    handleStepClick(firstStepOfGroup);
                  }}
                >
                  {index < currentProgressGroup ||
                  progressGroupCompletionStatus[index] ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Group Label */}
                <div className="text-center">
                  <div
                    className={`mb-1 text-xs font-medium transition-colors duration-300 ${
                      index === currentProgressGroup
                        ? "text-blue-600"
                        : index < currentProgressGroup ||
                            progressGroupCompletionStatus[index]
                          ? "text-green-600"
                          : "text-gray-400"
                    }`}
                  >
                    {group.title}
                  </div>
                  <div
                    className={`text-xs leading-tight transition-colors duration-300 ${
                      index === currentProgressGroup
                        ? "text-gray-600"
                        : index < currentProgressGroup ||
                            progressGroupCompletionStatus[index]
                          ? "text-gray-500"
                          : "text-gray-300"
                    }`}
                  >
                    {group.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {steps[currentStep].title}
              </h3>
              {stepCompletionStatus[currentStep] && (
                <span className="flex items-center text-sm font-medium text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Complete
                </span>
              )}
            </div>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">{renderStepContent()}</div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !validateCurrentStep()}
                className="bg-black text-white hover:bg-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  "Submit Assessment"
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className="bg-black text-white hover:bg-gray-800"
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
