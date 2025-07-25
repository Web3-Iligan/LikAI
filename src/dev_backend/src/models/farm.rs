/* 
    The farm.rs contains the Farm struct for later use

    Note: this struct will be transferred to the Storage canister, but the models will still be used by the backend canister for type safety.
*/

use candid::CandidType;
use serde::Deserialize;



#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmStatus {
    ACTIVE,
    INACTIVE
}

impl std::fmt::Display for FarmStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            FarmStatus::ACTIVE => write!(f, "Active"),
            FarmStatus::INACTIVE => write!(f, "Inactive"),
        }
    }
}

#[derive(Clone, CandidType, Deserialize)]
pub struct Farm {
    farm_id: String,
    farmer_id: String,
    farm_name: String, 
    farm_location: String, 
    created_at: String, 
    updated_at: String, 
    status: FarmStatus
}