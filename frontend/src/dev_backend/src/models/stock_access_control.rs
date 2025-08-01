use candid::CandidType;
use serde::Deserialize;
use std::fmt;

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ShrimpSource {
    BFAR,
    LOCAL, 
    WILDCAUGHT,
    SELF,
    OTHER(String)
}

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum FarmAcess {
    YES, 
    PARTIAL, 
    NO
}

impl fmt::Display for ShrimpSource {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ShrimpSource::BFAR => write!(f, "BFAR Hatchery"),
            ShrimpSource::LOCAL => write!(f, "Local Hatchery"),
            ShrimpSource::WILDCAUGHT => write!(f, "Wild Caught"),
            ShrimpSource::SELF => write!(f, "Own Hatchery"),
            ShrimpSource::OTHER(name) => write!(f, "{}", name)
        }
    }
}

impl fmt::Display for FarmAcess {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FarmAcess::YES => write!(f, "Yes"),
            FarmAcess::PARTIAL => write!(f, "Partial"),
            FarmAcess::NO => write!(f, "No"),
        }
    }
}

// the health struct
// will be used by the AI canister for later use. 
#[derive(Clone, CandidType, Deserialize)]
pub struct StockAccessControl {
    stock_access_id: String, 
    farm_id: String, 
    shrimp_source: ShrimpSource, 
    farm_access: FarmAcess,
    created_at: String, 
    updated_at: String
}