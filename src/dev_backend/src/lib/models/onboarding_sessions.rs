use candid::{CandidType, Deserialize};


#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum SessionStatus {
    INPROGRESS,
    COMPLETED,
    ABANDONED
}

impl std::fmt::Display for SessionStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SessionStatus::INPROGRESS => write!(f, "In Progress"),
            SessionStatus::COMPLETED => write!(f, "Completed"),
            SessionStatus::ABANDONED => write!(f, "Abandoned"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct OnboardingSession {
    session_id: String,
    farmer_id: String,
    current_step: i8, 
    form_data: String, // json::parse().unwrap()
    started_at: String,
    completed_at: String,
    last_activity: SessionStatus,
}

