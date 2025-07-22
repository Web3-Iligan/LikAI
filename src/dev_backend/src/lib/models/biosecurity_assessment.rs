use candid::CandidType;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum BioSecurityAssessmentStatus {
    COMPLETED,
    INPROGRESS,
    PENDING
}

impl fmt::Display for BioSecurityAssessmentStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BioSecurityAssessmentStatus::COMPLETED => write!(f, "Completed"),
            BioSecurityAssessmentStatus::INPROGRESS => write!(f, "In Progress"),
            BioSecurityAssessmentStatus::PENDING => write!(f, "Pending"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct BiosecurityAssessment {
    assessment_id: String, 
    farm_id: String, 
    farm_setup_score: i8,
    pond_water_care_score: i8,
    stock_sourcing_score: i8,
    farm_access_score: i8,
    disease_readiness_score: i8,
    overall_score: i8,
    created_at: String, 
    status: BioSecurityAssessmentStatus
}
