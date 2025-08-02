import { NextResponse } from "next/server";

export interface OnboardingFormData {
  farmName: string;
  farmLocation: string;

  shrimpSpecies: string;
  shrimpSpeciesOther?: string;
  farmingSystem: string;
  farmSize?: string;
  farmSizeUnit?: string;

  waterSources: string[];
  waterSourceOther?: string;
  pondDrying: string;

  shrimpSource: string;
  shrimpSourceOther?: string;
  farmAccess: string;

  diseaseHistory: string;
  diseaseDescription?: string;
  budget: string;
}

interface APIResponse {
  success: boolean;
  message: string;
  data?: {
    farmId?: string;
    assessmentId?: string;
    submissionId?: string;
    timestamp?: string;
    redirectUrl?: string;
    status?: string;
  };
  errors?: string[];
}

interface DatabaseStructure {
  farm: {
    farm_id: string;
    farm_name: string;
    farm_location: string;
    created_at: string;
    status: string;
  };
  farm_specifications: {
    shrimp_species: string;
    shrimp_species_other?: string;
    farming_system: string;
    farm_size?: string;
    farm_size_unit?: string;
  };
  water_management: {
    water_sources: string;
    water_source_other?: string;
    pond_drying: string;
  };
  stock_access_control: {
    shrimp_source: string;
    shrimp_source_other?: string;
    farm_access: string;
  };
  health_financial_data: {
    disease_history: string;
    disease_description?: string;
    budget: string;
  };
  biosecurity_assessment: {
    farm_setup_score: number;
    pond_water_care_score: number;
    stock_sourcing_score: number;
    farm_access_score: number;
    disease_readiness_score: number;
    overall_score: number;
    assessment_date: string;
    status: string;
  };
}

/**
 * Calculate biosecurity scores based on the form data
 * Simplified version of the scoring algorithm from the onboarding component
 */
function calculateBiosecurityScores(data: OnboardingFormData): {
  farmSetup: number;
  pondWaterCare: number;
  stockSourcing: number;
  farmAccess: number;
  diseaseReadiness: number;
  overall: number;
} {
  let scores = {
    farmSetup: 0,
    pondWaterCare: 0,
    stockSourcing: 0,
    farmAccess: 0,
    diseaseReadiness: 0,
    overall: 0,
  };

  // Farm Setup Basics calculation
  if (["vannamei", "monodon"].includes(data.shrimpSpecies)) {
    scores.farmSetup += 50;
  }
  if (["intensive", "semi-intensive"].includes(data.farmingSystem)) {
    scores.farmSetup += 50;
  }

  // Pond & Water Care calculation
  if (data.waterSources.some(source => ["well", "sea"].includes(source))) {
    scores.pondWaterCare += 40;
  }
  if (data.pondDrying === "always") {
    scores.pondWaterCare += 60;
  } else if (data.pondDrying === "sometimes") {
    scores.pondWaterCare += 30;
  }

  // Stock Sourcing calculation
  if (data.shrimpSource === "bfar-hatchery") {
    scores.stockSourcing = 100;
  } else if (data.shrimpSource === "own-hatchery") {
    scores.stockSourcing = 80;
  } else if (data.shrimpSource === "local-hatchery") {
    scores.stockSourcing = 60;
  } else {
    scores.stockSourcing = 30;
  }

  // Farm Access Control calculation
  if (data.farmAccess === "yes") {
    scores.farmAccess = 100;
  } else if (data.farmAccess === "partial") {
    scores.farmAccess = 60;
  } else {
    scores.farmAccess = 20;
  }

  // Disease Readiness calculation
  if (data.diseaseHistory === "no") {
    scores.diseaseReadiness += 40;
  } else if (data.diseaseHistory === "once-twice") {
    scores.diseaseReadiness += 20;
  }

  if (data.budget === "sufficient") {
    scores.diseaseReadiness += 60;
  } else if (data.budget === "moderate") {
    scores.diseaseReadiness += 40;
  } else if (data.budget === "limited") {
    scores.diseaseReadiness += 20;
  } else {
    scores.diseaseReadiness += 10;
  }

  //Calculation for all those stuff
  scores.overall = Math.round(
    (scores.farmSetup +
      scores.pondWaterCare +
      scores.stockSourcing +
      scores.farmAccess +
      scores.diseaseReadiness) /
      5
  );

  return scores;
}

export async function POST(request: Request) {
  try {
    const formData: OnboardingFormData = await request.json();

    // Validate the form data before processing
    // const { isValid, errors } = validateFormData(formData);

    // if (!isValid) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Validation failed",
    //       errors,
    //     },
    //     { status: 400 }
    //   );
    // }

    const scores = calculateBiosecurityScores(formData);
    const farmId = `FARM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const assessmentId = `ASSESS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const dbData: DatabaseStructure = {
      farm: {
        farm_id: farmId,
        farm_name: formData.farmName,
        farm_location: formData.farmLocation,
        created_at: new Date().toISOString(),
        status: "active",
      },
      farm_specifications: {
        shrimp_species: formData.shrimpSpecies,
        shrimp_species_other: formData.shrimpSpeciesOther,
        farming_system: formData.farmingSystem,
        farm_size: formData.farmSize,
        farm_size_unit: formData.farmSizeUnit || "hectares",
      },
      water_management: {
        water_sources: formData.waterSources.join(","),
        water_source_other: formData.waterSourceOther,
        pond_drying: formData.pondDrying,
      },
      stock_access_control: {
        shrimp_source: formData.shrimpSource,
        shrimp_source_other: formData.shrimpSourceOther,
        farm_access: formData.farmAccess,
      },
      health_financial_data: {
        disease_history: formData.diseaseHistory,
        disease_description: formData.diseaseDescription,
        budget: formData.budget,
      },
      biosecurity_assessment: {
        farm_setup_score: scores.farmSetup,
        pond_water_care_score: scores.pondWaterCare,
        stock_sourcing_score: scores.stockSourcing,
        farm_access_score: scores.farmAccess,
        disease_readiness_score: scores.diseaseReadiness,
        overall_score: scores.overall,
        assessment_date: new Date().toISOString(),
        status: "completed",
      },
    };

    // TODO: Save to db here, not sure how

    const response: APIResponse = {
      success: true,
      message: "Farm assessment submitted successfully",
      data: {
        farmId,
        assessmentId,
        submissionId: `SUB-${Date.now()}`,
        timestamp: new Date().toISOString(),
        redirectUrl: "/dashboard",
        status: "assessment_completed",
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error processing farm assessment:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process farm assessment",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
