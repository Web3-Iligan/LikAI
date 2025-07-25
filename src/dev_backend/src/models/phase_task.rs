use candid::{CandidType, Deserialize};


#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum PhaseTaskPriority {
    CRITICAL,
    HIGH,
    MEDIUM,
    LOW
}

impl std::fmt::Display for PhaseTaskPriority {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PhaseTaskPriority::CRITICAL => write!(f, "Critical"),
            PhaseTaskPriority::HIGH => write!(f, "High"),
            PhaseTaskPriority::MEDIUM => write!(f, "Medium"),
            PhaseTaskPriority::LOW => write!(f, "Low"),
        }
    }
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum PhaseTaskStatus {
    PENDING, 
    INPROGRESS,
    COMPLETED
}

impl std::fmt::Display for PhaseTaskStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PhaseTaskStatus::COMPLETED => write!(f, "Completed"),
            PhaseTaskStatus::INPROGRESS => write!(f, "In-Progress"),
            PhaseTaskStatus::PENDING => write!(f, "Pending"),
        }
    }
}

// the PhaseTask struct
// will be used by the AI canister for later use. 
#[derive(Clone, CandidType, Deserialize)]
pub struct PhaseTask {
    task_id: String,
    phase_id: String,
    recommendation_id: String, 
    title: String,
    description: String,
    category: String,
    priority: PhaseTaskPriority,
    status: PhaseTaskStatus,
    estimated_cost: String,
    adaption_reason: String, 
    created_at: String, 
    updated_at: String
}