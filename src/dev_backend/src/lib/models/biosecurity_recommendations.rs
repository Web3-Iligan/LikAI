use candid::CandidType;
use serde::Deserialize;
use std::fmt;

use crate::lib::models::biosecurity_assessment::BioSecurityAssessmentStatus;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum BiosecurityCategory {
    FARMSETUP,
    PONDWATER,
    STOCKSOURCING,
    FARNACCESS,
    DISEASEREADINESS,
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum BiosecurityPriority {
    CRITICAL,
    HIGH,
    MEDIUM,
    LOW
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum BiosecurityRecommendationStatus {
    COMPLETED, 
    INPROGRESS,
    PENDING
}

impl fmt::Display for BiosecurityCategory {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BiosecurityCategory::FARMSETUP => write!(f, "Farm Setup"),
            BiosecurityCategory::PONDWATER => write!(f, "Pond Water"),
            BiosecurityCategory::STOCKSOURCING => write!(f, "Stock Sourcing"),
            BiosecurityCategory::FARNACCESS => write!(f, "Farm Access"),
            BiosecurityCategory::DISEASEREADINESS => write!(f, "Disease Readiness"),
        }
    }
}

impl fmt::Display for BiosecurityPriority {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BiosecurityPriority::CRITICAL => write!(f, "Critical"),
            BiosecurityPriority::HIGH => write!(f, "High"),
            BiosecurityPriority::MEDIUM => write!(f, "Medium"),
            BiosecurityPriority::LOW => write!(f, "Low"),
        }
    }
}

impl fmt::Display for BiosecurityRecommendationStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BiosecurityRecommendationStatus::COMPLETED => write!(f, "Completed"),
            BiosecurityRecommendationStatus::INPROGRESS => write!(f, "In Progress"),
            BiosecurityRecommendationStatus::PENDING => write!(f, "Pending")
        }
    }
}

#[derive(Clone, CandidType, Deserialize)]
pub struct BioSecurityRecommendations {
    recommendations_id: String, 
    assessment_id: String, 
    category: BiosecurityCategory,
    priority: BiosecurityPriority,
    title: String, 
    description: String, 
    estimated_cost: String, 
    timeframe: String, 
    status: BioSecurityAssessmentStatus,
    created_at: String, 
}


