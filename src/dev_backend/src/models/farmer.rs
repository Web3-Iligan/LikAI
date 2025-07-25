use candid::{CandidType, Deserialize};


#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmerStatus {
    ACTIVE,
    INACTIVE, 
    PENDING
}

impl std::fmt::Display for FarmerStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            FarmerStatus::ACTIVE => write!(f, "Active"),
            FarmerStatus::INACTIVE => write!(f, "Inactive"),
            FarmerStatus::PENDING => write!(f, "Pending"),
        }
    }
}


#[derive(Clone, CandidType, Deserialize)]
pub struct Farmer {
    farmer_id: String,
    name: String,
    email: String, 
    phone: String,
    created_at: String,
    updated_at: String,
    status: FarmerStatus,
}