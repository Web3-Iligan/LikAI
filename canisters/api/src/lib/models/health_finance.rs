use candid::CandidType;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum DiseaseHistory {
    NONE,
    RARE,
    SEVERAL
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum Budget {
    SUFFICIENT,
    MODERATE,
    LIMITED,
    VERYLIMITED
}

impl fmt::Display for DiseaseHistory {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DiseaseHistory::NONE => write!(f, "None"),
            DiseaseHistory::RARE => write!(f, "Once or Twice"),
            DiseaseHistory::SEVERAL => write!(f, "Several"),
        }
    }
}

impl fmt::Display for Budget {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Budget::SUFFICIENT => write!(f, "Sufficient"),
            Budget::MODERATE => write!(f, "Moderate"),
            Budget::LIMITED => write!(f, "Limited"),
            Budget::VERYLIMITED => write!(f, "Very Limited"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct StockAccessControl {
    health_finance_id: String, 
    farm_id: String,
    disease_history: DiseaseHistory, 
    disease_description: String, 
    budget: Budget,
    created_at: String, 
    updated_at: String
}
