/* 
    The farm_phase.rs contains the FarmPhase struct for later use

    Note: this struct will be transferred to the Storage canister, but the models will still be used by the backend canister for type safety.
*/

use candid::{CandidType, Deserialize};

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmPhaseStatus {
    NOTSTARTED,
    INPROGRESS, 
    COMPLETED
}

impl std::fmt::Display for FarmPhaseStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            FarmPhaseStatus::NOTSTARTED => write!(f, "Active"),
            FarmPhaseStatus::INPROGRESS => write!(f, "Inactive"),
            FarmPhaseStatus::COMPLETED => write!(f, "Pending"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct FarmPhase {
    phase_id: String,
    farm_id: String,
    phase_number: i8,
    phase_name: String,
    phase_description: String,
    phase_color: String,
    status: FarmPhaseStatus,
    progress: i8,
    started_at: String,
    completed_at: String,

}